import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import GameScreen from '@/components/GameScreen';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  // Simulamos algunas puntuaciones guardadas (esto podría venir de una base de datos en el futuro)
  const progressHistory = [
    { date: '2024-03-20', score: 85 },
    { date: '2024-03-19', score: 70 },
    { date: '2024-03-18', score: 95 },
  ];

  const handleStartGame = () => {
    setGameStarted(true);
    setScore(0);
    toast({
      title: "¡Bienvenido!",
      description: "Usa las teclas A, S, D, F para seleccionar tu respuesta",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-4">
      {!gameStarted ? (
        <Card className="max-w-2xl mx-auto mt-20 p-8 text-center">
          <h1 className="text-4xl font-bold mb-8 text-blue-800">
            ¡Explosión de Multiplicaciones!
          </h1>
          <div className="space-y-4">
            <Button
              onClick={handleStartGame}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-xl"
              aria-label="Iniciar juego"
            >
              INICIAR JUEGO
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-4 px-8 py-6 text-xl"
                  aria-label="Ver progreso"
                >
                  VER PROGRESO
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Tu Progreso</DialogTitle>
                  <DialogDescription>
                    Aquí puedes ver tus últimas puntuaciones
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {progressHistory.map((progress, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{progress.date}</span>
                        <span>{progress.score}%</span>
                      </div>
                      <Progress value={progress.score} />
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      ) : (
        <GameScreen score={score} setScore={setScore} setGameStarted={setGameStarted} />
      )}
    </div>
  );
};

export default Index;