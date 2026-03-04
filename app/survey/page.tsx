import { Card } from "@/components/ui/card";
import { SurveyWizard } from "@/components/survey/wizard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SurveyPage() {
  return (
    <div className="pt-6 pb-16">
      <div className="container mx-auto w-full">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Volver al catálogo
          </Link>
        </Button>
      </div>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Descubre tu PC Ideal</h1>
        <p className="text-muted-foreground mt-2">
          Responde estas preguntas y nuestro algoritmo encontrará tu match
          perfecto.
        </p>
      </div>
      <SurveyWizard />
    </div>
  );
}
