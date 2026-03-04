"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Category } from "../../app/generated/prisma/browser"; // Ajusta a tu ruta generada

interface ProductsProps {
  categories: Category[];
}

export function Categories({ categories }: ProductsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Leemos la categoría actual de la URL ("all" o undefined → sin filtro)
  const currentCategory = searchParams.get("category") ?? "all";

  const handleFilter = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", categoryId);
    // Al cambiar de categoría, reiniciamos a la página 1
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="pt-8 pb-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="text-3xl font-bold text-black text-center md:text-left">
          Catálogo
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant={currentCategory === "all" ? "default" : "outline"}
            className="rounded-full transition-all duration-300 ease-in-out"
            onClick={() => handleFilter("all")}
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={currentCategory === category.id ? "default" : "outline"}
              className="rounded-full transition-all duration-300 ease-in-out"
              onClick={() => handleFilter(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
