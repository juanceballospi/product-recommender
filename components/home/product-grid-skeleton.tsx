import { Card, CardContent, CardHeader } from "@/components/ui/card";

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-muted ${className ?? ""}`} />
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card
          key={i}
          className="flex flex-col justify-between overflow-hidden py-0 gap-0"
        >
          <CardHeader className="p-0">
            {/* Imagen */}
            <SkeletonBox className="w-full aspect-video rounded-none" />
          </CardHeader>
          <CardContent className="flex flex-col grow pt-2 pb-6">
            {/* Badge de categoría */}
            <SkeletonBox className="h-5 w-20 mb-3 rounded-full" />
            {/* Título del producto */}
            <SkeletonBox className="h-6 w-4/5 mb-2" />
            {/* Descripción: 2 líneas */}
            <SkeletonBox className="h-4 w-full mb-1" />
            <SkeletonBox className="h-4 w-2/3" />
            {/* Precio */}
            <SkeletonBox className="h-7 w-24 mt-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
