"use server";

import prisma from "./prisma";

// Tipos de retorno para nuestro motor
export type RecommendationResult = {
  match: any; // El producto ganador
  others: any[]; // Los 5 siguientes
};

export async function getRecommendations(answers: Record<string, string>): Promise<RecommendationResult> {
  // --- PASO 1: CONSTRUIR EL VECTOR DEL USUARIO ---
  
  // 1. CPU (Promedio de Q1 y Q2)
  const cpu1 = answers.q1 === 'A' ? 2 : answers.q1 === 'B' ? 8 : answers.q1 === 'C' ? 7 : 9;
  const cpu2 = answers.q2 === 'A' ? 3 : answers.q2 === 'B' ? 6 : 10;
  const cpu = Math.round((cpu1 + cpu2) / 2);

  // 2. GPU (Promedio de Q1 y Q3)
  const gpu1 = answers.q1 === 'A' ? 2 : answers.q1 === 'B' ? 3 : answers.q1 === 'C' ? 7 : 10;
  const gpu3 = answers.q3 === 'A' ? 1 : answers.q3 === 'B' ? 5 : 10;
  const gpu = Math.round((gpu1 + gpu3) / 2);

  // 3. Portabilidad (Promedio de Q4 y Q6)
  const port4 = answers.q4 === 'A' ? 1 : answers.q4 === 'B' ? 6 : 10;
  const port6 = answers.q6 === 'A' ? 3 : answers.q6 === 'B' ? 6 : 9;
  const port = Math.round((port4 + port6) / 2);

  // 4. Autonomía (Directo de Q5)
  const auto = answers.q5 === 'A' ? 1 : answers.q5 === 'B' ? 5 : 10;

  // 5. Almacenamiento (Promedio de Q7 y Q8)
  const alm7 = answers.q7 === 'A' ? 2 : answers.q7 === 'B' ? 5 : 10;
  const alm8 = answers.q8 === 'A' ? 2 : answers.q8 === 'B' ? 6 : 9;
  const alm = Math.round((alm7 + alm8) / 2);

  // 6. Actualizabilidad (Q9 con modificador de Q6)
  let act = answers.q9 === 'A' ? 1 : 10;
  if (answers.q6 === 'A') act = Math.min(10, act + 1);

  // 7. Estética (Directo de Q10)
  const est = answers.q10 === 'A' ? 2 : answers.q10 === 'B' ? 6 : 10;

  // 8. Presupuesto (Q11 con modificador de Q12)
  let presBase = answers.q11 === 'A' ? 2 : answers.q11 === 'B' ? 6 : 10;
  const presMod = answers.q12 === 'A' ? -2 : answers.q12 === 'B' ? 1 : 3;
  let pres = Math.max(1, Math.min(10, presBase + presMod)); // Nos aseguramos que no pase de 10 ni baje de 1

  // Vector final del usuario (Mismo orden que en la base de datos)
  const userVector = [port, auto, cpu, gpu, alm, act, est, pres];

  // --- PASO 2: OBTENER LOS PRODUCTOS Y SUS VECTORES ---
  
  const allProducts = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
      productFeatures: {
        include: { feature: true },
      },
    },
  });

  // Mapa de índices para asegurarnos de que el vector del producto se arme en el orden correcto
  // sin importar cómo lo devuelva la base de datos.
  const featureOrderMap: Record<string, number> = {
    'Portabilidad': 0, 'Autonomía': 1, 'Potencia CPU': 2, 'Potencia GPU': 3,
    'Almacenamiento': 4, 'Actualizabilidad': 5, 'Estética': 6, 'Presupuesto': 7
  };

  // --- PASO 3: CALCULAR DISTANCIA EUCLIDIANA Y ORDENAR ---
  
  const scoredProducts = allProducts.map((product) => {
    // 1. Armar el vector del producto asegurando el orden correcto
    const productVector = new Array(8).fill(0);
    product.productFeatures.forEach((pf) => {
      const index = featureOrderMap[pf.feature.name];
      if (index !== undefined) {
        productVector[index] = pf.score;
      }
    });

    // 2. Calcular la Distancia Euclidiana contra el userVector
    const sumOfSquares = userVector.reduce((acc, userVal, index) => {
      const productVal = productVector[index];
      const difference = userVal - productVal;
      return acc + (difference * difference);
    }, 0);
    const distance = Math.sqrt(sumOfSquares);

    // 3. Retornamos el producto inyectándole la distancia calculada
    return { ...product, distance };
  });

  // Ordenamos de menor a mayor distancia (el más cercano a 0 es el mejor match)
  scoredProducts.sort((a, b) => a.distance - b.distance);

  // --- PASO 4: ESTRUCTURAR LA RESPUESTA ---
  
  return {
    match: scoredProducts[0] || null,
    others: scoredProducts.slice(1, 5), // Tomamos los siguientes 5
  };
}