import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";

interface TimerBarProps {
  timeLeft: number;
}

const TimerBar = ({ timeLeft }: TimerBarProps) => {
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (hasFocus) {
      const announcement = new SpeechSynthesisUtterance(`${timeLeft} segundos restantes`);
      window.speechSynthesis.speak(announcement);
    }
  }, [timeLeft, hasFocus]);

  return (
    <div className="mb-4">
      <Progress 
        value={(timeLeft / 90) * 100} 
        className={`h-2 ${
          timeLeft <= 15 
            ? '[&>div]:bg-red-500' 
            : timeLeft <= 30 
              ? '[&>div]:bg-yellow-500' 
              : '[&>div]:bg-green-500'
        }`}
        aria-label={`Tiempo restante: ${timeLeft} segundos`}
      />
      <div 
        className="text-center mt-1 text-sm font-medium"
        role="timer"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={0}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      >
        Tiempo: {timeLeft}s
      </div>
    </div>
  );
};

export default TimerBar;