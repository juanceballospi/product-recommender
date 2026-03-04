# PC Recommender — Recomendador de Computadores

Una aplicación web que ayuda a los usuarios a encontrar el computador perfecto (Laptop, Desktop o All-in-One) mediante un test de preguntas y un motor de recomendación basado en distancia euclidiana vectorial.

## ✨ Características

- **Catálogo de productos** con filtrado por categoría y paginación dinámica
- **Test de recomendación** de 12 preguntas organizado como wizard interactivo en un Dialog
- **Motor vectorial**: convierte las respuestas del usuario en un vector de 8 dimensiones y lo compara contra el vector de características de cada producto usando distancia euclidiana
- **Página de resultados** con el mejor match y 5 alternativas
- **Skeleton loading** animado mientras cargan los productos
- **Diseño responsive** con soporte para modo oscuro

## 🛠️ Stack Tecnológico

| Capa               | Tecnología                                                            |
| ------------------ | --------------------------------------------------------------------- |
| Framework          | [Next.js 16](https://nextjs.org) (App Router, Turbopack)              |
| Lenguaje           | TypeScript                                                            |
| Base de datos      | PostgreSQL (Prisma Postgres)                                          |
| ORM                | [Prisma 7](https://prisma.io) con adaptador `@prisma/adapter-pg`      |
| UI Components      | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://radix-ui.com) |
| Estilos            | Tailwind CSS v4                                                       |
| Fuentes            | Urbanist + Geist Mono (Google Fonts)                                  |
| Gestor de paquetes | pnpm                                                                  |

## 🗂️ Estructura del Proyecto

```
product-recommender/
├── app/
│   ├── page.tsx              # Home — catálogo con filtros y paginación
│   ├── results/page.tsx      # Página de resultados del test
│   └── survey/page.tsx       # Ruta alternativa para el test en pantalla completa
├── components/
│   ├── home/
│   │   ├── hero.tsx          # Banner principal + Dialog del test
│   │   ├── categories.tsx    # Filtros de categoría
│   │   ├── product-grid.tsx  # Cuadrícula de tarjetas de productos
│   │   ├── product-grid-skeleton.tsx  # Skeleton de carga
│   │   ├── product-list.tsx  # Server Component con fetch + Suspense
│   │   └── pagination.tsx    # Paginación con selector de items por página
│   └── survey/
│       ├── wizard.tsx        # Wizard interactivo del test (12 preguntas)
│       └── results.tsx       # Visualización del match y alternativas
├── lib/
│   ├── actions.ts            # Server Action: motor de recomendación vectorial
│   ├── queries.ts            # Queries de Prisma (categorías, productos)
│   ├── prisma.ts             # Cliente Prisma (singleton)
│   └── survey-data.ts        # Preguntas y opciones del test
└── prisma/
    ├── schema.prisma         # Modelos: Category, Product, Feature, ProductFeature
    └── seed.ts               # 20 productos + 8 features vectorizados
```

## 🧠 Cómo Funciona el Motor de Recomendación

Cada producto tiene un **vector de 8 dimensiones** almacenado en la tabla `ProductFeature`:

```
[Portabilidad, Autonomía, Potencia CPU, Potencia GPU, Almacenamiento, Actualizabilidad, Estética, Presupuesto]
```

Las respuestas del usuario se transforman en un vector equivalente y se calcula la **distancia euclidiana** entre el vector del usuario y cada producto. El producto con la menor distancia es el mejor match.

## 🚀 Primeros Pasos

### Prerrequisitos

- Node.js 18+
- pnpm
- Una base de datos PostgreSQL (se puede usar [Prisma Postgres](https://www.prisma.io/postgres))

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd product-recommender

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar tu DATABASE_URL
```

### Configuración de la Base de Datos

```bash
# Generar el cliente de Prisma
pnpx prisma generate

# Ejecutar migraciones
pnpx prisma migrate deploy

# Poblar la base de datos con productos de ejemplo (20 productos)
pnpx prisma db seed
```

### Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Scripts Disponibles

| Script       | Descripción                                    |
| ------------ | ---------------------------------------------- |
| `pnpm dev`   | Inicia el servidor de desarrollo con Turbopack |
| `pnpm build` | Genera el build de producción                  |
| `pnpm start` | Inicia el servidor de producción               |
| `pnpm lint`  | Ejecuta ESLint                                 |

## 🗄️ Modelos de Base de Datos

```prisma
Category       # Laptops, Desktops, All-in-One
Product        # Nombre, precio, imagen, categoría
Feature        # Las 8 dimensiones del vector
ProductFeature # Relación Product ↔ Feature con su score (1–10)
```

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).
