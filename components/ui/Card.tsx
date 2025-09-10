
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg dark:shadow-black/20 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;
