"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { SurveyWizard } from "@/components/survey/wizard";

export function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="pt-6 pb-16">
        <div className="container mx-auto w-full">
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border">
            <Image
              src="/hero.webp"
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-start px-40">
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-x-2">
                  <h6 className="text-white text-lg font-bold">
                    ¿No sabes qué especificaciones necesitas?
                  </h6>
                </div>
                <h2 className="py-3 text-5xl font-bold text-white text-center">
                  Encuentra el computador perfecto para ti sin complicaciones.
                </h2>
                <p className="text-white mb-6 text-base text-center font-medium">
                  Responde un breve test sobre tu día a día, y nuestro algoritmo
                  encontrará el equipo ideal para ti,{" "}
                  <br className="lg:block hidden" />
                  ya sea una Laptop, Desktop o All-in-One.
                </p>
                <Button variant="outline" onClick={() => setOpen(true)}>
                  Descubrir mi equipo ideal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Descubre tu PC Ideal</DialogTitle>
          </DialogHeader>
          <Card className="border-0 shadow-none rounded-xl">
            <div className="px-6 pt-6 pb-2 border-b">
              <h2 className="text-2xl font-bold text-center">
                Descubre tu PC Ideal
              </h2>
              <p className="text-sm text-muted-foreground text-center mt-1 pb-2">
                Responde estas preguntas y nuestro algoritmo encontrará tu match
                perfecto.
              </p>
            </div>
            <SurveyWizard onClose={() => setOpen(false)} />
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}
