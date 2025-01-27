import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const tutorialSteps = [
  {
    title: "¡Bienvenido a Explosión de Matemáticas!",
    description: "Aprenderemos multiplicación y división de una manera divertida.",
  },
  {
    title: "¿Cómo jugar?",
    description: "Verás una operación matemática y cuatro globos con diferentes respuestas.",
  },
  {
    title: "Elige tu respuesta",
    description: "Puedes hacer clic en el globo con la respuesta correcta o usar las teclas A, S, D, F del teclado.",
  },
  {
    title: "¡Gana puntos!",
    description: "Por cada respuesta correcta ganarás una estrella. ¡Intenta conseguir todas las que puedas!",
  },
];

interface TutorialProps {
  open: boolean;
  onClose: () => void;
}

const Tutorial = ({ open, onClose }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
      setCurrentStep(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tutorialSteps[currentStep].title}</DialogTitle>
          <DialogDescription className="text-lg">
            {tutorialSteps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleNext}>
            {currentStep === tutorialSteps.length - 1 ? "¡Empezar!" : "Siguiente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Tutorial;