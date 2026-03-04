import { Suspense } from "react";
import { Hero } from "@/components/home/hero";
import { Categories } from "@/components/home/categories";
import { ProductList } from "@/components/home/product-list";
import { ProductGridSkeleton } from "@/components/home/product-grid-skeleton";
import { getCategories } from "@/lib/queries";

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const categoryParam =
    typeof searchParams.category === "string" ? searchParams.category : "all";
  // "all" significa sin filtro; cualquier otro valor es un ID real de categoría
  const categoryId = categoryParam !== "all" ? categoryParam : undefined;
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? parseInt(searchParams.limit) : 8;

  // Solo categories se fetcha aquí; el resto lo hace ProductList dentro de Suspense
  const categories = await getCategories();

  return (
    <>
      <Hero />
      <div className="container mx-auto pb-16">
        {/* Filtros de categoría */}
        <Categories categories={categories} />

        {/* Suspense muestra el skeleton mientras ProductList resuelve sus datos */}
        <Suspense
          key={`${categoryParam}-${page}-${limit}`}
          fallback={<ProductGridSkeleton count={limit} />}
        >
          <ProductList categoryId={categoryId} page={page} limit={limit} />
        </Suspense>
      </div>
    </>
  );
}
