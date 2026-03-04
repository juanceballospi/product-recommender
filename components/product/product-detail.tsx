import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Tag, Cpu, HardDrive, Monitor, Battery, Wrench, Sparkles, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product, Category, ProductFeature, Feature } from "@/app/generated/prisma/client";

type ProductWithDetails = Product & {
  category: Category;
  productFeatures: (ProductFeature & { feature: Feature })[];
};

type ProductWithCategory = Product & { category: Category };

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  Portabilidad: <Monitor className="size-4" />,
  "Autonomia": <Battery className="size-4" />,
  "Autonomía": <Battery className="size-4" />,
  "Potencia CPU": <Cpu className="size-4" />,
  "Potencia GPU": <Cpu className="size-4" />,
  Almacenamiento: <HardDrive className="size-4" />,
  Actualizabilidad: <Wrench className="size-4" />,
  "Estética": <Sparkles className="size-4" />,
  Presupuesto: <Wallet className="size-4" />,
};

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-sm font-mono font-semibold text-foreground tabular-nums w-6 text-right">
        {score}
      </span>
    </div>
  );
}

export function ProductDetail({
  product,
  relatedProducts,
}: {
  product: ProductWithDetails;
  relatedProducts: ProductWithCategory[];
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back link */}
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 size-4" />
          Volver al catalogo
        </Link>
      </Button>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-muted border">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="size-3" />
              {product.category.name}
            </Badge>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-balance text-foreground">
            {product.name}
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="text-3xl font-bold text-foreground mt-2">
            ${product.price.toLocaleString("es-CO")}
          </div>

          {/* Features / Specs */}
          {product.productFeatures.length > 0 && (
            <Card className="mt-4">
              <CardContent className="pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Especificaciones
                </h3>
                <div className="grid gap-4">
                  {product.productFeatures.map((pf) => (
                    <div key={pf.featureId} className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-36 shrink-0">
                        <span className="text-muted-foreground">
                          {FEATURE_ICONS[pf.feature.name] ?? (
                            <Tag className="size-4" />
                          )}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {pf.feature.name}
                        </span>
                      </div>
                      <ScoreBar score={pf.score} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <Link key={rp.id} href={`/product/${rp.id}`}>
                <Card className="flex flex-col overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 py-0 gap-0 h-full">
                  <div className="relative w-full aspect-video bg-muted overflow-hidden">
                    <Image
                      src={rp.imageUrl}
                      alt={rp.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <CardContent className="flex flex-col grow pt-3 pb-4">
                    <Badge variant="secondary" className="mb-2 w-fit">
                      {rp.category.name}
                    </Badge>
                    <h3 className="font-semibold text-base line-clamp-1 text-foreground">
                      {rp.name}
                    </h3>
                    <span className="font-bold text-lg pt-2 text-foreground">
                      ${rp.price.toLocaleString("es-CO")}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
