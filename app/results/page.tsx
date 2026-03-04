import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <p className="text-muted-foreground text-lg">
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
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Volver al catalogo
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/survey">
              <RotateCcw className="size-3.5" />
              Repetir test
            </Link>
          </Button>
        </div>
        <SurveyResults match={match} others={others} />
      </div>
    </div>
  );
}
