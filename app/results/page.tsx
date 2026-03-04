import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getRecommendations } from "@/lib/actions";
import { SurveyResults } from "@/components/survey/results";
import { Button } from "@/components/ui/button";

export default async function ResultsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  // Reconstruir el objeto de respuestas desde los query params
  const answers: Record<string, string> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      answers[key] = value;
    }
  }

  const hasAnswers = Object.keys(answers).length > 0;

  if (!hasAnswers) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-muted-foreground">
          No encontramos respuestas para calcular.
        </p>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    );
  }

  const { match, others } = await getRecommendations(answers);

  return (
    <div className="container mx-auto py-4 pb-16">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 size-4" />
          Volver al catálogo
        </Link>
      </Button>
      <SurveyResults match={match} others={others} />
    </div>
  );
}
