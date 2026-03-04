import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/lib/queries";
import { ProductDetail } from "@/components/product/product-detail";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: `${product.name} - PC Finder`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.categoryId,
    product.id
  );

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
