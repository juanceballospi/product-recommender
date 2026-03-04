// lib/queries.ts
import { ProductOrderByWithRelationInput, ProductWhereInput } from "@/app/generated/prisma/models";
import prisma from "./prisma";

// 1. Tipos para los parámetros de búsqueda
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  sortBy?: "price_asc" | "price_desc" | "newest";
}

// 2. Query para obtener todas las categorías
export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

// 3. Query principal para obtener productos con filtros y paginación
export async function getProducts(params: ProductQueryParams) {
  const { page = 1, limit = 10, categoryId, sortBy = "newest" } = params;
  const skip = (page - 1) * limit;

  // Construir el objeto "where" dinámicamente
  const where: ProductWhereInput = {};
  if (categoryId) {
    where.categoryId = categoryId;
  }

  // Construir el ordenamiento
  let orderBy: ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sortBy === "price_asc") orderBy = { price: "asc" };
  if (sortBy === "price_desc") orderBy = { price: "desc" };

  // Ejecutar la búsqueda de productos y el conteo total en paralelo para mayor rendimiento
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        category: true, // Útil para mostrar la etiqueta de categoría en la tarjeta del producto
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

// 4. Query para obtener un producto por ID con sus features y categoría
export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      productFeatures: {
        include: { feature: true },
        orderBy: { feature: { name: "asc" } },
      },
    },
  });
}

// 5. Query para obtener productos relacionados (misma categoría, excluyendo el actual)
export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  limit = 4
) {
  return await prisma.product.findMany({
    where: {
      categoryId,
      id: { not: excludeId },
      isActive: true,
    },
    include: { category: true },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}
