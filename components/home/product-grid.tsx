import Image from "next/image";
import { Product, Category } from "../../app/generated/prisma/client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

// Tipo extendido que incluye la relación de la categoría
type ProductWithCategory = Product & { category: Category };

export function ProductGrid({ products }: { products: ProductWithCategory[] }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <p className="text-lg">No encontramos productos en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="flex flex-col justify-between overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 py-0 gap-0"
        >
          <CardHeader className="p-0">
            <div className="relative w-full aspect-video bg-muted overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            {/* Contenedor de la imagen con relación de aspecto */}
          </CardHeader>
          <CardContent className="flex flex-col grow pt-2 pb-6">
            <Badge variant="secondary" className="mb-2">
              {product.category.name}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>
            <span className="font-bold text-xl pt-4">
              ${product.price.toLocaleString("es-CO")}
            </span>
          </CardContent>
          {/* <CardFooter className="p-4 pt-0 flex justify-between items-center">
          </CardFooter> */}
        </Card>
      ))}
    </div>
  );
}
