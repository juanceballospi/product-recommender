import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Tag,
  ArrowRight,
  Cpu,
  HardDrive,
  Monitor,
  Battery,
  Wrench,
  Sparkles,
  Wallet,
} from "lucide-react";

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  Portabilidad: <Monitor className="size-3.5" />,
  Autonomia: <Battery className="size-3.5" />,
  "Autonomía": <Battery className="size-3.5" />,
  "Potencia CPU": <Cpu className="size-3.5" />,
  "Potencia GPU": <Cpu className="size-3.5" />,
  Almacenamiento: <HardDrive className="size-3.5" />,
  Actualizabilidad: <Wrench className="size-3.5" />,
  "Estética": <Sparkles className="size-3.5" />,
  Presupuesto: <Wallet className="size-3.5" />,
};

function MatchScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-xs font-mono font-semibold text-muted-foreground tabular-nums w-5 text-right">
        {score}
      </span>
    </div>
  );
}

export function SurveyResults({
  match,
  others,
}: {
  match: any;
  others: any[];
}) {
  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-muted-foreground text-lg">
          No se encontro un Match.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          <Trophy className="size-4" />
          Resultado del Analisis
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground text-balance">
          Hemos encontrado tu PC ideal
        </h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Basado en tus respuestas, este es el equipo que mejor se adapta a tu
          perfil de uso.
        </p>
      </div>

      {/* Match Principal */}
      <Card className="overflow-hidden border-2 border-primary/20 shadow-xl mb-12 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative min-h-[320px] lg:min-h-[420px] bg-muted">
            <Image
              src={match.imageUrl}
              alt={match.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1.5 text-xs shadow-lg">
                Top Match
              </Badge>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between p-6 lg:p-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <Tag className="size-3" />
                  {match.category.name}
                </Badge>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 text-balance">
                {match.name}
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                {match.description}
              </p>

              {/* Feature Scores */}
              {match.productFeatures && match.productFeatures.length > 0 && (
                <div className="flex flex-col gap-2.5 mb-6">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Perfil del equipo
                  </span>
                  <div className="grid gap-2">
                    {match.productFeatures.map(
                      (pf: any) => (
                        <div
                          key={pf.featureId}
                          className="flex items-center gap-2"
                        >
                          <div className="flex items-center gap-1.5 w-28 shrink-0">
                            <span className="text-muted-foreground">
                              {FEATURE_ICONS[pf.feature.name] ?? (
                                <Tag className="size-3.5" />
                              )}
                            </span>
                            <span className="text-xs font-medium text-foreground">
                              {pf.feature.name}
                            </span>
                          </div>
                          <MatchScoreBar score={pf.score} />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-2xl font-bold text-foreground">
                ${match.price.toLocaleString("es-CO")}
              </span>
              <Button asChild size="sm" className="gap-1.5">
                <Link href={`/product/${match.id}`}>
                  Ver detalle
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Other options */}
      {others.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Otras alternativas
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tambien podrian ser una excelente opcion para ti
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {others.map((product: any) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="flex flex-col overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 py-0 gap-0 h-full">
                  <div className="relative w-full aspect-video bg-muted overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <CardContent className="flex flex-col grow pt-3 pb-4">
                    <Badge variant="secondary" className="mb-2 w-fit text-xs">
                      {product.category.name}
                    </Badge>
                    <h4 className="font-semibold text-sm line-clamp-1 text-foreground">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {product.description}
                    </p>
                    <span className="font-bold text-base pt-3 text-foreground mt-auto">
                      ${product.price.toLocaleString("es-CO")}
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
