// src/components/shared/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: string;
  shadow?: string;
  rounded?: string;
}

const Card = ({ 
  children, 
  className = "", 
  hover = false, 
  padding = "p-6",
  shadow = "shadow-md",
  rounded = "rounded-lg"
}: CardProps) => {
  return (
    <div 
      className={`
        bg-white border border-gray-200 ${rounded} ${shadow} ${padding}
        ${hover ? 'hover:shadow-lg transition-shadow duration-300 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;