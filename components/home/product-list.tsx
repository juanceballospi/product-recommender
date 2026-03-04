import { getProducts } from "@/lib/queries";
import { ProductGrid } from "./product-grid";
import { Pagination } from "./pagination";

interface ProductListProps {
  categoryId?: string;
  page: number;
  limit: number;
}

/**
 * Server Component que hace el fetch de datos y renderiza
 * ProductGrid + Pagination. Se usa dentro de un <Suspense>
 * en page.tsx para mostrar un skeleton mientras carga.
 */
export async function ProductList({
  categoryId,
  page,
  limit,
}: ProductListProps) {
  const { products, totalPages, total } = await getProducts({
    categoryId,
    page,
    limit,
  });

  return (
    <>
      <ProductGrid products={products} />
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        pageSize={limit}
        total={total}
      />
    </>
  );
}
