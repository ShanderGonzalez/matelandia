import React, { useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

interface TimerBarProps {
  timeLeft: number;
}

const TimerBar = ({ timeLeft }: TimerBarProps) => {
  useEffect(() => {
    // Crear un mensaje que será leído por el screen reader
    const announcement = new SpeechSynthesisUtterance(`${timeLeft} segundos restantes`);
    window.speechSynthesis.speak(announcement);
  }, [timeLeft]);

  return (
    <div className="mb-4">
      <Progress 
        value={(timeLeft / 60) * 100} 
        className={`h-2 ${
          timeLeft <= 10 
            ? '[&>div]:bg-red-500' 
            : timeLeft <= 20 
              ? '[&>div]:bg-yellow-500' 
              : '[&>div]:bg-green-500'
        }`}
        aria-label={`Tiempo restante: ${timeLeft} segundos`}
      />
      <div 
        className="text-center mt-1 text-sm font-medium"
        role="timer"
        aria-live="assertive"
        aria-atomic="true"
        tabIndex={0}
      >
        Tiempo: {timeLeft}s
      </div>
    </div>
  );
};

export default TimerBar;