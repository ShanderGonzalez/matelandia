import React from 'react';

interface CelebrationOverlayProps {
  show: boolean;
  message: string;
}

const CelebrationOverlay = ({ show, message }: CelebrationOverlayProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="relative">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl -z-10" />
        <div className="text-4xl md:text-6xl font-bold text-center whitespace-pre-line animate-[scale-in_0.5s_ease-out] px-8 py-6 text-white">
          {message}
        </div>
      </div>
    </div>
  );
};

export default CelebrationOverlay;