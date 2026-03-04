import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProductGrid } from "@/components/home/product-grid"; // Reutilizamos tu grid anterior

export function SurveyResults({ match, others }: { match: any; others: any[] }) {
  if (!match) return <div>No se encontró un Match.</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <h2 className="text-3xl font-extrabold text-center mb-8">¡Hemos encontrado tu PC Ideal!</h2>
      
      {/* EL MATCH PRINCIPAL */}
      <Link href={`/product/${match.id}`}>
        <Card className="flex flex-col md:flex-row overflow-hidden border-primary border-2 shadow-xl mb-12 hover:shadow-2xl transition-shadow duration-300">
        <div className="md:w-1/2 relative min-h-[300px] bg-muted">
          <Image 
            src={match.imageUrl} 
            alt={match.name} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <Badge className="w-fit mb-4 bg-primary text-primary-foreground text-sm px-3 py-1">
            Top Match (100% Compatibilidad)
          </Badge>
          <h3 className="text-3xl font-bold mb-2">{match.name}</h3>
          <Badge variant="outline" className="w-fit mb-4">{match.category.name}</Badge>
          <p className="text-muted-foreground mb-6 text-lg">{match.description}</p>
          <div className="text-2xl font-black text-primary">
            ${match.price.toLocaleString("es-CO")}
          </div>
        </div>
        </Card>
      </Link>      {/* OTRAS OPCIONES (THE OTHERS) */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Otras excelentes alternativas para ti</h3>
        {/* Reutilizamos el grid que ya construiste, pasándole 'others' */}
        <ProductGrid products={others} /> 
      </div>
    </div>
  );
}
