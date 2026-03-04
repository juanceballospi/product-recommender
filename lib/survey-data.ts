export type Option = {
  value: string;
  label: string;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

export const surveyQuestions: Question[] = [
  // BLOQUE 1: Rendimiento
  {
    id: "q1",
    text: "¿Cómo describirías tu día a día frente al computador?",
    options: [
      { value: "A", label: "Tareas básicas (Navegar, Office, YouTube)" },
      { value: "B", label: "Trabajo intenso (Muchas pestañas, programación, BD)" },
      { value: "C", label: "Diseño y creatividad (Photoshop, edición de video)" },
      { value: "D", label: "Juegos pesados o modelado 3D complejo" },
    ],
  },
  {
    id: "q2",
    text: "Sé honesto, ¿cuántas aplicaciones o pestañas tienes abiertas al mismo tiempo?",
    options: [
      { value: "A", label: "Soy ordenado, 1 a 3 a la vez" },
      { value: "B", label: "Bastantes, a veces pierdo la cuenta" },
      { value: "C", label: "Es un caos, uso varias pantallas y el PC pide piedad" },
    ],
  },
  {
    id: "q3",
    text: "Si vas a jugar, ¿qué tipo de títulos prefieres?",
    options: [
      { value: "A", label: "No juego nada / Solo busco minas" },
      { value: "B", label: "Juegos ligeros o competitivos (LoL, Valorant, Sims)" },
      { value: "C", label: "Títulos Triple A de última generación en gráficos Ultra" },
    ],
  },
  // BLOQUE 2: Movilidad
  {
    id: "q4",
    text: "¿Dónde vas a usar este equipo la mayor parte del tiempo?",
    options: [
      { value: "A", label: "Siempre fijo en el mismo escritorio" },
      { value: "B", label: "Por toda la casa y a veces a la oficina" },
      { value: "C", label: "Soy nómada digital, viajo todo el tiempo" },
    ],
  },
  {
    id: "q5",
    text: "¿Qué tan lejos sueles estar de un enchufe?",
    options: [
      { value: "A", label: "Siempre conectado a la corriente" },
      { value: "B", label: "Un par de horas en reuniones o en el sofá" },
      { value: "C", label: "Necesito que la batería aguante todo el día" },
    ],
  },
  {
    id: "q6",
    text: "¿Planeas conectarle monitores externos?",
    options: [
      { value: "A", label: "Sí, tengo un setup armado de múltiples pantallas" },
      { value: "B", label: "Tal vez uno de vez en cuando" },
      { value: "C", label: "No, usaré solo la pantalla del equipo" },
    ],
  },
  // BLOQUE 3: Archivos y Vida Útil
  {
    id: "q7",
    text: "¿Qué tipo de archivos guardas más en tu equipo?",
    options: [
      { value: "A", label: "Casi todo son textos o PDFs" },
      { value: "B", label: "Muchas fotos y algunos videos" },
      { value: "C", label: "Videos en 4K, juegos muy pesados, proyectos enormes" },
    ],
  },
  {
    id: "q8",
    text: "¿Eres fan de guardar todo en la nube (Drive/iCloud)?",
    options: [
      { value: "A", label: "Sí, no guardo casi nada localmente" },
      { value: "B", label: "Uso la nube para respaldos, pero quiero mis cosas a mano" },
      { value: "C", label: "No confío en la nube, todo debe estar en mi disco" },
    ],
  },
  {
    id: "q9",
    text: "En 3 años, si el PC se pone lento, ¿qué prefieres hacer?",
    options: [
      { value: "A", label: "Comprar uno completamente nuevo" },
      { value: "B", label: "Cambiarle algunas piezas para darle más vida (RAM, Disco)" },
    ],
  },
  // BLOQUE 4: Preferencias y Presupuesto
  {
    id: "q10",
    text: "¿Qué tan importante es el diseño y los materiales?",
    options: [
      { value: "A", label: "Me da igual cómo se vea mientras sea rápido y barato" },
      { value: "B", label: "Que se vea moderno, pero no pago extra por lujo" },
      { value: "C", label: "Quiero acabados premium, aluminio o luces espectaculares" },
    ],
  },
  {
    id: "q11",
    text: "Hablemos de presupuesto, ¿qué buscas?",
    options: [
      { value: "A", label: "Lo más económico que cumpla su función" },
      { value: "B", label: "El mejor equilibrio calidad/precio" },
      { value: "C", label: "Alta gama, el presupuesto no es un problema" },
    ],
  },
  {
    id: "q12",
    text: "Si el computador de tus sueños cuesta un 15% más de lo que pensabas gastar...",
    options: [
      { value: "A", label: "Imposible, mi límite es estrictamente cerrado" },
      { value: "B", label: "Lo consideraría seriamente" },
      { value: "C", label: "Lo compro sin dudarlo" },
    ],
  },
];