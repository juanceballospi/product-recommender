import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('Iniciando el seeding de la base de datos...')

  // 1. Limpieza estricta de la base de datos
  // Como no tienes "onDelete: Cascade" en tu esquema, el orden de borrado es OBLIGATORIO
  // para evitar errores de restricción de llave foránea (Foreign Key Constraints).
  // Primero borramos las tablas dependientes (hijos) y luego los padres.
  await prisma.productFeature.deleteMany()
  await prisma.product.deleteMany()
  await prisma.feature.deleteMany()
  await prisma.category.deleteMany()

  // 2. Crear las Categorías
  const laptops = await prisma.category.create({
    data: { name: 'Laptops', description: 'Equipos portátiles para trabajar en cualquier lugar.' }
  })
  const desktops = await prisma.category.create({
    data: { name: 'Desktops', description: 'Torres de escritorio con máxima potencia y actualizabilidad.' }
  })
  const aio = await prisma.category.create({
    data: { name: 'All-in-One', description: 'Todo en uno. Pantalla y computador integrados.' }
  })

  // 3. Crear los Features (Las 8 Dimensiones del Vector)
  const featureNames = [
    'Portabilidad', // 0
    'Autonomía',    // 1
    'Potencia CPU', // 2
    'Potencia GPU', // 3
    'Almacenamiento',// 4
    'Actualizabilidad',// 5
    'Estética',     // 6
    'Presupuesto'   // 7
  ]

  const features = await Promise.all(
    featureNames.map(name => prisma.feature.create({ data: { name, description: `Dimensión de ${name}` } }))
  )

  // 4. Definición de los 20 Productos + Sus Vectores [Port, Auto, CPU, GPU, Alm, Act, Est, Pre]
  const productsData = [
    // --- LAPTOPS ---
    { name: 'MacBook Air M2', cat: laptops.id, price: 1099, vector: [10, 10, 6, 4, 4, 1, 9, 6], img: 'https://placehold.co/600x400/png?text=MacBook+Air' },
    { name: 'MacBook Pro 16" M3 Max', cat: laptops.id, price: 3499, vector: [7, 8, 10, 9, 8, 1, 10, 10], img: 'https://placehold.co/600x400/png?text=MacBook+Pro+16' },
    { name: 'Dell XPS 15', cat: laptops.id, price: 1899, vector: [8, 7, 8, 6, 6, 3, 9, 8], img: 'https://placehold.co/600x400/png?text=Dell+XPS+15' },
    { name: 'Lenovo ThinkPad X1 Carbon', cat: laptops.id, price: 1699, vector: [9, 8, 7, 3, 5, 2, 7, 7], img: 'https://placehold.co/600x400/png?text=ThinkPad+X1' },
    { name: 'ASUS ROG Zephyrus G14', cat: laptops.id, price: 1599, vector: [8, 6, 9, 9, 7, 4, 8, 8], img: 'https://placehold.co/600x400/png?text=ASUS+ROG+G14' },
    { name: 'Acer Nitro 5', cat: laptops.id, price: 899, vector: [5, 4, 7, 7, 5, 5, 4, 4], img: 'https://placehold.co/600x400/png?text=Acer+Nitro+5' },
    { name: 'HP Pavilion 15', cat: laptops.id, price: 699, vector: [6, 5, 5, 3, 5, 3, 5, 3], img: 'https://placehold.co/600x400/png?text=HP+Pavilion' },
    { name: 'Chromebook Lenovo IdeaPad 3', cat: laptops.id, price: 250, vector: [9, 9, 2, 1, 1, 1, 3, 1], img: 'https://placehold.co/600x400/png?text=Chromebook' },

    // --- DESKTOPS ---
    { name: 'Alienware Aurora R16', cat: desktops.id, price: 2299, vector: [1, 1, 10, 10, 9, 9, 8, 9], img: 'https://placehold.co/600x400/png?text=Alienware+R16' },
    { name: 'HP OMEN 45L', cat: desktops.id, price: 1999, vector: [1, 1, 9, 9, 8, 10, 8, 8], img: 'https://placehold.co/600x400/png?text=HP+OMEN' },
    { name: 'Lenovo IdeaCentre 3', cat: desktops.id, price: 499, vector: [1, 1, 4, 2, 4, 7, 4, 3], img: 'https://placehold.co/600x400/png?text=IdeaCentre+3' },
    { name: 'Dell Inspiron Desktop', cat: desktops.id, price: 650, vector: [1, 1, 5, 3, 5, 8, 4, 4], img: 'https://placehold.co/600x400/png?text=Inspiron+Desktop' },
    { name: 'Apple Mac Studio', cat: desktops.id, price: 1999, vector: [3, 1, 10, 9, 8, 1, 10, 9], img: 'https://placehold.co/600x400/png?text=Mac+Studio' },
    { name: 'Mac mini M2', cat: desktops.id, price: 599, vector: [4, 1, 7, 5, 5, 1, 9, 5], img: 'https://placehold.co/600x400/png?text=Mac+mini' },
    { name: 'Custom PC Master Race - RTX 4090', cat: desktops.id, price: 4500, vector: [1, 1, 10, 10, 10, 10, 9, 10], img: 'https://placehold.co/600x400/png?text=Custom+PC' },

    // --- ALL-IN-ONE (AIO) ---
    { name: 'Apple iMac 24" M3', cat: aio.id, price: 1299, vector: [2, 1, 7, 5, 5, 1, 10, 7], img: 'https://placehold.co/600x400/png?text=iMac+24' },
    { name: 'HP Envy 34" All-in-One', cat: aio.id, price: 1799, vector: [1, 1, 8, 6, 8, 2, 9, 8], img: 'https://placehold.co/600x400/png?text=HP+Envy+34' },
    { name: 'Lenovo Yoga AIO 7', cat: aio.id, price: 1499, vector: [2, 1, 7, 5, 6, 2, 8, 7], img: 'https://placehold.co/600x400/png?text=Yoga+AIO' },
    { name: 'Dell Inspiron 24 AIO', cat: aio.id, price: 750, vector: [2, 1, 4, 2, 5, 2, 5, 4], img: 'https://placehold.co/600x400/png?text=Inspiron+AIO' },
    { name: 'Microsoft Surface Studio 2+', cat: aio.id, price: 4299, vector: [2, 1, 7, 6, 6, 1, 10, 10], img: 'https://placehold.co/600x400/png?text=Surface+Studio' }
  ]

  // 5. Insertar Productos y Relacionar sus Vectores
  for (const prod of productsData) {
    await prisma.product.create({
      data: {
        name: prod.name,
        description: `Excelente equipo de la categoría. Perfecto para su rango de precio de $${prod.price}.`,
        price: prod.price,
        imageUrl: prod.img, // Se mapea correctamente al campo imageUrl de tu modelo Product
        categoryId: prod.cat, // Se mapea correctamente a la FK categoryId
        
        // La propiedad de relación se llama productFeatures según tu esquema
        productFeatures: {
          create: prod.vector.map((score, index) => ({
            featureId: features[index].id,
            score: score
          }))
        }
      }
    })
  }

  console.log('¡Seeding completado con éxito! 20 productos creados con sus respectivos vectores espaciales.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })