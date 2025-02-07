import React from 'react';
import { Progress } from "@/components/ui/progress";

interface TimerBarProps {
  timeLeft: number;
}

const TimerBar = ({ timeLeft }: TimerBarProps) => {
  return (
    <div className="mb-4">
      <Progress 
        value={timeLeft * 10} 
        className={`h-2 ${
          timeLeft <= 3 
            ? '[&>div]:bg-red-500' 
            : timeLeft <= 5 
              ? '[&>div]:bg-yellow-500' 
              : '[&>div]:bg-green-500'
        }`}
        aria-label={`Tiempo restante: ${timeLeft} segundos`}
      />
      <div 
        className="text-center mt-1 text-sm font-medium"
        role="timer"
        aria-live="polite"
        tabIndex={0}
      >
        Tiempo: {timeLeft}s
      </div>
    </div>
  );
};

export default TimerBar;