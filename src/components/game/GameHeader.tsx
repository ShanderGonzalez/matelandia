import React from 'react';
import { Star } from "lucide-react";

interface GameHeaderProps {
  level: number;
  score: number;
}

const GameHeader = ({ level, score }: GameHeaderProps) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="text-xl font-bold flex items-center gap-2">
        <span>Nivel: {level}</span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="text-yellow-400 fill-yellow-400" />
        <span className="text-xl font-bold">{score}</span>
      </div>
    </div>
  );
};

export default GameHeader;