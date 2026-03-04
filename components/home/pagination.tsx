"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE_OPTIONS = [8, 16, 24, 32];

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  total: number;
}

export function Pagination({
  totalPages,
  currentPage,
  pageSize,
  total,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (newPage: number, newLimit?: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    if (newLimit !== undefined) {
      params.set("limit", newLimit.toString());
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePageSizeChange = (value: string) => {
    navigate(1, Number(value));
  };

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex items-center justify-between px-2 mt-12">
      {/* Contador de resultados */}
      <div className="flex-1 text-sm text-muted-foreground">
        Mostrando {start}–{end} de {total} productos
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Selector de tamaño de página */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium whitespace-nowrap">Por página</p>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Indicador de página */}
        <div className="flex w-[110px] items-center justify-center text-sm font-medium">
          Página {currentPage} de {totalPages}
        </div>

        {/* Botones de navegación */}
        <div className="flex items-center space-x-2">
          {/* Primera página */}
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => navigate(1)}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Primera página</span>
            <ChevronsLeft />
          </Button>

          {/* Página anterior */}
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => navigate(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Página anterior</span>
            <ChevronLeft />
          </Button>

          {/* Página siguiente */}
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => navigate(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Página siguiente</span>
            <ChevronRight />
          </Button>

          {/* Última página */}
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => navigate(totalPages)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Última página</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
