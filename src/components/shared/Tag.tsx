// src/components/shared/Tag.tsx
import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  className?: string;
  title?: string;
}

const Tag = ({ 
  children, 
  variant = "default", 
  size = "sm",
  className = "",
  title
}: TagProps) => {
  const variants: Record<string, string> = {
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    primary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    danger: "bg-red-100 text-red-800 hover:bg-red-200",
    "Éthique": "bg-purple-100 text-purple-800 hover:bg-purple-200",
    "Droit": "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    "Intelligence Artificielle": "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
    "Technologie": "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    "Gouvernance": "bg-orange-100 text-orange-800 hover:bg-orange-200"
  };

  const sizes: Record<string, string> = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-1.5 text-base"
  };

  return (
    <span 
      title={title}
      className={`inline-flex items-center font-medium rounded-full transition-colors duration-200 ${variants[variant] || variants.default} ${sizes[size] || sizes.sm} ${className}`}
    >
      {children}
    </span>
  );
};

export default Tag;