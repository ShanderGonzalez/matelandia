import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Star, Sparkles, Trophy, Rocket } from "lucide-react";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedScores = localStorage.getItem('gameScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  const handleGameEnd = (finalScore: number) => {
    const newScores = [finalScore, ...scores].slice(0, 10);
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
    <div className="min-h-screen bg-gradient-to-b from-[#FFE29F] to-[#FF719A] p-4">
      {!gameStarted ? (
        <div className="max-w-2xl mx-auto mt-10 space-y-8">
          <div className="animate-bounce flex justify-center">
            <Star className="h-16 w-16 text-yellow-300 drop-shadow-lg" />
          </div>
          
          <Card className="backdrop-blur-sm bg-white/90 rounded-3xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="h-8 w-8 text-purple-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ¡Explosión de Multiplicaciones!
              </h1>
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>

            <div className="space-y-6">
              <div className="flex justify-center gap-4 items-center">
                <Rocket className="h-6 w-6 text-blue-500 animate-pulse" />
                <Button
                  onClick={handleStartGame}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                  aria-label="Iniciar juego"
                >
                  ¡JUGAR AHORA!
                </Button>
                <Rocket className="h-6 w-6 text-blue-500 animate-pulse" />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/90 hover:bg-white text-purple-600 border-purple-300 px-8 py-6 text-xl rounded-full shadow-md flex items-center gap-2"
                    aria-label="Ver progreso"
                  >
                    <Trophy className="h-5 w-5" />
                    VER PROGRESO
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-purple-600 flex items-center gap-2">
                      <Trophy className="h-6 w-6" />
                      Historial de Puntajes
                    </DialogTitle>
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
                            <span className="font-medium">Partida {scores.length - index}</span>
                            <span className="text-purple-600 font-bold">{gameScore} puntos</span>
                          </div>
                          <Progress value={gameScore * 10} className="h-3 bg-purple-100" /> 
                        </div>
                      ))
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <div className="text-center space-y-4">
            <p className="text-white text-lg font-medium shadow-sm">
              ¡Practica tus multiplicaciones de forma divertida!
            </p>
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((star) => (
                <Star 
                  key={star} 
                  className="h-8 w-8 text-yellow-300 animate-pulse" 
                  style={{ animationDelay: `${star * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
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