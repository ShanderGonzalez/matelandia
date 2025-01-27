import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import GameScreen from '@/components/GameScreen';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

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
            <Button
              variant="outline"
              className="ml-4 px-8 py-6 text-xl"
              aria-label="Ver progreso"
            >
              VER PROGRESO
            </Button>
          </div>
        </Card>
      ) : (
        <GameScreen score={score} setScore={setScore} setGameStarted={setGameStarted} />
      )}
    </div>
  );
};

export default Index;