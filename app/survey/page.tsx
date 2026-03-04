import { Card } from "@/components/ui/card";
import { SurveyWizard } from "@/components/survey/wizard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SurveyPage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Volver al catalogo
          </Link>
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Descubre tu PC Ideal
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Responde estas preguntas y nuestro algoritmo encontrara tu match
            perfecto.
          </p>
        </div>

        <Card className="shadow-lg py-0 overflow-hidden">
          <SurveyWizard />
        </Card>
      </div>
    </div>
  );
}
