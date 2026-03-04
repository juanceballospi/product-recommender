"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { surveyQuestions } from "@/lib/survey-data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

interface SurveyWizardProps {
  onClose?: () => void;
}

export function SurveyWizard({ onClose }: SurveyWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = surveyQuestions[currentStep];
  const progress = ((currentStep + 1) / surveyQuestions.length) * 100;
  const hasAnsweredCurrent = !!answers[question.id];
  const isLastStep = currentStep === surveyQuestions.length - 1;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const params = new URLSearchParams(answers);
    onClose?.();
    router.push(`/results?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-5 px-6 py-5">
      {/* Progress Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground font-mono">
            {String(currentStep + 1).padStart(2, "0")} / {String(surveyQuestions.length).padStart(2, "0")}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {Math.round(progress)}% completado
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Question */}
      <h3 className="text-lg font-bold leading-snug text-foreground">
        {question.text}
      </h3>

      {/* Options as selectable cards */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((option, idx) => {
          const isSelected = answers[question.id] === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "relative flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border text-left transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border bg-card hover:border-muted-foreground/30 hover:bg-accent/50"
              )}
            >
              {/* Index letter indicator */}
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isSelected ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  String.fromCharCode(65 + idx)
                )}
              </span>
              <span
                className={cn(
                  "text-sm font-medium leading-snug transition-colors",
                  isSelected ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          disabled={currentStep === 0 || isSubmitting}
          className="gap-1.5"
        >
          <ArrowLeft className="size-4" />
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={!hasAnsweredCurrent || isSubmitting}
          size="sm"
          className="gap-1.5 min-w-[140px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Calculando...
            </>
          ) : isLastStep ? (
            <>
              <Sparkles className="size-4" />
              Ver Resultados
            </>
          ) : (
            <>
              Siguiente
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
