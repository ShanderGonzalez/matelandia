import { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GameScreenProps {
  score: number;
  setScore: (score: number) => void;
  setGameStarted: (started: boolean) => void;
}

const GameScreen = ({ score, setScore, setGameStarted }: GameScreenProps) => {
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState({ num1: 0, num2: 0 });
  const [options, setOptions] = useState<number[]>([]);
  const { toast } = useToast();

  const generateQuestion = useCallback(() => {
    const num1 = Math.floor(Math.random() * 5) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    const correctAnswer = num1 * num2;
    
    // Generar opciones incorrectas
    let wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrong = Math.floor(Math.random() * 20) + 1;
      if (wrong !== correctAnswer && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong);
      }
    }
    
    // Mezclar las opciones
    const allOptions = [...wrongAnswers, correctAnswer];
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }
    
    setQuestion({ num1, num2 });
    setOptions(allOptions);
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const keyToIndex: { [key: string]: number } = {
      'a': 0, 's': 1, 'd': 2, 'f': 3
    };
    
    if (event.key.toLowerCase() in keyToIndex) {
      const selectedIndex = keyToIndex[event.key.toLowerCase()];
      const selectedAnswer = options[selectedIndex];
      const correctAnswer = question.num1 * question.num2;
      
      if (selectedAnswer === correctAnswer) {
        toast({
          title: "¡Correcto!",
          description: "¡Muy bien! Sigamos adelante.",
          variant: "default",
        });
        setScore(score + 1); // Aquí está el cambio: pasamos directamente el nuevo valor
        generateQuestion();
      } else {
        toast({
          title: "¡Inténtalo de nuevo!",
          description: "No te rindas, ¡tú puedes!",
          variant: "destructive",
        });
      }
    }
  }, [options, question, score, setScore, generateQuestion, toast]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const balloonColors = ['bg-green-400', 'bg-yellow-300', 'bg-blue-400', 'bg-pink-400'];
  const keys = ['A', 'S', 'D', 'F'];

  return (
    <Card className="max-w-4xl mx-auto mt-8 p-8">
      <div className="flex justify-between mb-4">
        <div className="text-xl font-bold">Nivel: {level}</div>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400 fill-yellow-400" />
          <span className="text-xl font-bold">{score}</span>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8" role="alert" aria-live="polite">
        ¿Cuánto es {question.num1} × {question.num2}?
      </h2>

      <div className="grid grid-cols-4 gap-8 mb-8">
        {options.map((option, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <button
              className={`w-12 h-12 ${keys[index] === 'A' ? 'bg-black' : 'bg-gray-800'} text-white rounded-lg font-bold focus:ring-4 focus:ring-blue-500`}
              aria-label={`Tecla ${keys[index]}`}
            >
              {keys[index]}
            </button>
            <div 
              className={`w-20 h-20 rounded-full ${balloonColors[index]} flex items-center justify-center text-2xl font-bold shadow-lg`}
              role="button"
              aria-label={`Opción ${option}`}
            >
              {option}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={() => setGameStarted(false)}
          variant="outline"
          className="mt-4"
        >
          Volver al inicio
        </Button>
      </div>
    </Card>
  );
};

export default GameScreen;