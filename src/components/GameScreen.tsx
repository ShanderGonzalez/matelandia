import { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Tutorial from './Tutorial';
import GameHeader from './game/GameHeader';
import TimerBar from './game/TimerBar';
import QuestionDisplay from './game/QuestionDisplay';
import AnswerOption from './game/AnswerOption';
import CelebrationOverlay from './game/CelebrationOverlay';

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
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const { toast } = useToast();

  const getNumberRangeForLevel = useCallback((currentLevel: number) => {
    console.log('Getting number range for level:', currentLevel);
    const baseNumber = Math.min(Math.floor((currentLevel - 1) / 5) + 2, 10);
    return {
      min: baseNumber,
      max: baseNumber + 2
    };
  }, []);

  const generateQuestion = useCallback(() => {
    console.log('Generating new question for level:', level);
    setTimeLeft(10);
    const range = getNumberRangeForLevel(level);
    console.log('Number range:', range);
    
    const isMultiplication = Math.random() < 0.8;
    let num1, num2, correctAnswer;

    if (isMultiplication) {
      num1 = range.min;
      num2 = Math.floor(Math.random() * 10) + 1;
      correctAnswer = num1 * num2;
    } else {
      num2 = Math.floor(Math.random() * 5) + 1;
      num1 = range.min * num2; // Aseguramos que la división sea exacta
      correctAnswer = num1 / num2;
    }
    
    console.log('Generated question:', { num1, num2, operation: isMultiplication ? '×' : '÷', correctAnswer });
    
    let wrongAnswers = [];
    const maxAttempts = 10;
    let attempts = 0;
    
    while (wrongAnswers.length < 3 && attempts < maxAttempts) {
      attempts++;
      const wrong = Math.floor(Math.random() * (correctAnswer * 2)) + 1;
      if (wrong !== correctAnswer && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong);
      }
    }
    
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

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setCelebrationMessage(`¡SE ACABÓ EL TIEMPO! 🕒\n¡WOW! ¡${score} PUNTOS! 🌟`);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        onGameEnd(score);
      }, 2000);
      
      toast({
        title: "¡Se acabó el tiempo! ⏰",
        description: `¡Has conseguido ${score} puntos! 🌟 ¡Inténtalo de nuevo y sé más rápido! 🚀`,
        variant: "destructive",
        className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-none",
      });
    }
  }, [timeLeft, score, onGameEnd, toast]);

  const handleAnswer = useCallback((selectedAnswer: number) => {
    console.log('Handling answer:', selectedAnswer);
    const correctAnswer = question.operation === '×' 
      ? question.num1 * question.num2
      : question.num1 / question.num2;
    
    console.log('Correct answer:', correctAnswer);
    
    if (selectedAnswer === correctAnswer) {
      const newScore = score + 1;
      console.log('New score:', newScore);
      setScore(newScore);
      
      if (newScore % 5 === 0) {
        const newLevel = level + 1;
        console.log('Leveling up to:', newLevel);
        setLevel(newLevel);
        setCelebrationMessage(`🌟 ¡NIVEL ${newLevel}! 🌟\n¡ERES INCREÍBLE!`);
        setShowCelebration(true);
        
        // Aseguramos que la celebración se oculte antes de generar la siguiente pregunta
        setTimeout(() => {
          setShowCelebration(false);
          generateQuestion();
        }, 2000);
        
        toast({
          title: "🌟 ¡NIVEL SUPERADO! 🌟",
          description: `¡WOW! ¡Eres increíble! Has llegado al nivel ${newLevel}. ¡Sigue así, campeón! 🚀`,
          variant: "default",
          className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none",
        });
      } else {
        const messages = [
          "¡Genial! 🎉 ¡Eres un matemático estrella! ⭐",
          "¡Increíble! 🌈 ¡Sigue así!",
          "¡Fantástico! 🦸‍♂️ ¡Eres super inteligente!",
          "¡Excelente trabajo! 🏆 ¡Eres asombroso!",
          "¡Perfecto! 🌟 ¡Eres un genio de las matemáticas!"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setCelebrationMessage(randomMessage);
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          generateQuestion();
        }, 1500);
        
        toast({
          title: "¡CORRECTO! 🎯",
          description: randomMessage,
          variant: "default",
          className: "bg-gradient-to-r from-green-400 to-blue-500 text-white border-none",
        });
      }
    } else {
      console.log('Incorrect answer, ending game');
      setCelebrationMessage(`¡JUEGO TERMINADO! 🎮\n¡WOW! ¡${score} PUNTOS! 🌟`);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        onGameEnd(score);
      }, 2000);
      
      toast({
        title: "¡Juego Terminado! 🎮",
        description: `¡Wow! ¡Has conseguido ${score} puntos! 🌟 ¡Eres increíble! ¿Quieres intentarlo de nuevo y superar tu récord? 🚀`,
        variant: "destructive",
        className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-none",
      });
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
      <CelebrationOverlay show={showCelebration} message={celebrationMessage} />
      
      <Card className="max-w-4xl mx-auto mt-8 p-8">
        <GameHeader level={level} score={score} />
        <TimerBar timeLeft={timeLeft} />
        <QuestionDisplay num1={question.num1} num2={question.num2} operation={question.operation} />

        <div className="grid grid-cols-4 gap-8 mb-8">
          {options.map((option, index) => (
            <AnswerOption
              key={index}
              index={index}
              option={option}
              keyLabel={['A', 'S', 'D', 'F'][index]}
              balloonColor={['bg-green-400', 'bg-yellow-300', 'bg-blue-400', 'bg-pink-400'][index]}
              onAnswer={handleAnswer}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => onGameEnd(score)}
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