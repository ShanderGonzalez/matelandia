import { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Tutorial from './Tutorial';

interface GameScreenProps {
  score: number;
  setScore: (score: number) => void;
  setGameStarted: (started: boolean) => void;
  onGameEnd: (finalScore: number) => void;
}

const GameScreen = ({ score, setScore, setGameStarted, onGameEnd }: GameScreenProps) => {
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState({ num1: 0, num2: 0, operation: '×' });
  const [options, setOptions] = useState<number[]>([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const { toast } = useToast();

  // Función para determinar el rango de números según el nivel
  const getNumberRangeForLevel = useCallback((currentLevel: number) => {
    // Cada 5 preguntas correctas, aumentamos el nivel
    const baseNumber = Math.min(Math.floor((currentLevel - 1) / 5) + 2, 10);
    return {
      min: baseNumber,
      max: baseNumber
    };
  }, []);

  const generateQuestion = useCallback(() => {
    const range = getNumberRangeForLevel(level);
    const isMultiplication = Math.random() < 0.8; // 80% probabilidad de multiplicación
    let num1, num2, correctAnswer;

    if (isMultiplication) {
      num1 = range.min; // Usamos el número de la tabla actual
      num2 = Math.floor(Math.random() * 10) + 1; // Del 1 al 10
      correctAnswer = num1 * num2;
    } else {
      correctAnswer = Math.floor(Math.random() * 5) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
      num1 = correctAnswer * num2;
    }
    
    // Generar opciones incorrectas
    let wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrong = Math.floor(Math.random() * (correctAnswer * 2)) + 1;
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
    
    setQuestion({ 
      num1, 
      num2, 
      operation: isMultiplication ? '×' : '÷'
    });
    setOptions(allOptions);
  }, [level, getNumberRangeForLevel]);

  const handleAnswer = useCallback((selectedAnswer: number) => {
    const correctAnswer = question.operation === '×' 
      ? question.num1 * question.num2
      : question.num1 / question.num2;
    
    if (selectedAnswer === correctAnswer) {
      const newScore = score + 1;
      setScore(newScore);
      
      // Aumentar nivel cada 5 respuestas correctas
      if (newScore % 5 === 0) {
        const newLevel = level + 1;
        setLevel(newLevel);
        toast({
          title: "¡Nuevo nivel desbloqueado!",
          description: `¡Has alcanzado el nivel ${newLevel}! Las preguntas serán un poco más difíciles.`,
          variant: "default",
        });
      } else {
        toast({
          title: "¡Correcto!",
          description: "¡Muy bien! Sigamos adelante.",
          variant: "default",
        });
      }
      
      generateQuestion();
    } else {
      toast({
        title: "¡Juego terminado!",
        description: `Tu puntaje final fue: ${score}`,
        variant: "destructive",
      });
      onGameEnd(score);
    }
  }, [question, score, setScore, generateQuestion, toast, onGameEnd, level]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const keyToIndex: { [key: string]: number } = {
      'a': 0, 's': 1, 'd': 2, 'f': 3
    };
    
    if (event.key.toLowerCase() in keyToIndex) {
      const selectedIndex = keyToIndex[event.key.toLowerCase()];
      handleAnswer(options[selectedIndex]);
    }
  }, [options, handleAnswer]);

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
    <>
      <Tutorial open={showTutorial} onClose={() => setShowTutorial(false)} />
      <Card className="max-w-4xl mx-auto mt-8 p-8">
        <div className="flex justify-between mb-4">
          <div className="text-xl font-bold flex items-center gap-2">
            <span>Nivel: {level}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400" />
            <span className="text-xl font-bold">{score}</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8" role="alert" aria-live="polite">
          ¿Cuánto es {question.num1} {question.operation} {question.num2}?
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
              <button 
                onClick={() => handleAnswer(option)}
                className={`w-20 h-20 rounded-full ${balloonColors[index]} flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                role="button"
                aria-label={`Opción ${option}`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => {
              onGameEnd(score);
            }}
            variant="outline"
            className="mt-4"
          >
            Terminar juego
          </Button>
        </div>
      </Card>
    </>
  );
};

export default GameScreen;
