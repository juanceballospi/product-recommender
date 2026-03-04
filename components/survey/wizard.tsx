"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { surveyQuestions } from "@/lib/survey-data";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

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
    <>
      <CardHeader className="pb-2">
        <div className="mb-3">
          <Progress value={progress} className="h-1.5" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            Pregunta {currentStep + 1} de {surveyQuestions.length}
          </p>
        </div>
        <CardTitle className="text-lg leading-snug text-center">{question.text}</CardTitle>
      </CardHeader>

      <CardContent>
        <RadioGroup
          value={answers[question.id] || ""}
          onValueChange={handleSelect}
          className="flex flex-col space-y-2"
        >
          {question.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem
                value={option.value}
                id={`${question.id}-${option.value}`}
              />
              <Label
                htmlFor={`${question.id}-${option.value}`}
                className="flex flex-1 px-4 py-3 border rounded-md cursor-pointer hover:bg-muted transition-colors leading-snug font-normal text-sm"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>

      <CardFooter className="flex justify-end gap-x-2 pt-2">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0 || isSubmitting}
        >
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={!hasAnsweredCurrent || isSubmitting}
          className="w-36"
        >
          {isSubmitting
            ? "Calculando..."
            : isLastStep
              ? "Ver Resultados"
              : "Siguiente →"}
        </Button>
      </CardFooter>
    </>
  );
}
