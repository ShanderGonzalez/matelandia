import { useState, useEffect } from 'react';
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
  const [scores, setScores] = useState<number[]>([]);
  const { toast } = useToast();

  // Cargar puntuaciones al iniciar
  useEffect(() => {
    const savedScores = localStorage.getItem('gameScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  const handleGameEnd = (finalScore: number) => {
    const newScores = [finalScore, ...scores].slice(0, 10); // Mantener solo los últimos 10 puntajes
    setScores(newScores);
    localStorage.setItem('gameScores', JSON.stringify(newScores));
    setGameStarted(false);
  };

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
                  <DialogTitle>Historial de Puntajes</DialogTitle>
                  <DialogDescription>
                    Tus últimas 10 partidas
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {scores.length === 0 ? (
                    <p className="text-center text-gray-500">
                      Aún no hay puntajes registrados
                    </p>
                  ) : (
                    scores.map((gameScore, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Partida {scores.length - index}</span>
                          <span>{gameScore} puntos</span>
                        </div>
                        <Progress value={gameScore * 10} /> {/* Multiplicamos por 10 para mejor visualización */}
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      ) : (
        <GameScreen 
          score={score} 
          setScore={setScore} 
          setGameStarted={setGameStarted}
          onGameEnd={handleGameEnd}
        />
      )}
    </div>
  );
};

export default Index;