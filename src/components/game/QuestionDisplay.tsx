import React from 'react';

interface QuestionDisplayProps {
  num1: number;
  num2: number;
  operation: string;
}

const QuestionDisplay = ({ num1, num2, operation }: QuestionDisplayProps) => {
  return (
    <h2 className="text-3xl font-bold text-center mb-8" role="alert" aria-live="polite">
      ¿Cuánto es {num1} {operation} {num2}?
    </h2>
  );
};

export default QuestionDisplay;