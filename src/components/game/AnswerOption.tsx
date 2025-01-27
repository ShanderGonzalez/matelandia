import React from 'react';

interface AnswerOptionProps {
  index: number;
  option: number;
  keyLabel: string;
  balloonColor: string;
  onAnswer: (option: number) => void;
}

const AnswerOption = ({ index, option, keyLabel, balloonColor, onAnswer }: AnswerOptionProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        className={`w-12 h-12 ${index === 0 ? 'bg-black' : 'bg-gray-800'} text-white rounded-lg font-bold focus:ring-4 focus:ring-blue-500`}
        aria-label={`Tecla ${keyLabel}`}
      >
        {keyLabel}
      </button>
      <button 
        onClick={() => onAnswer(option)}
        className={`w-20 h-20 rounded-full ${balloonColor} flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer`}
        role="button"
        aria-label={`Opción ${option}`}
      >
        {option}
      </button>
    </div>
  );
};

export default AnswerOption;