import * as React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => (
  <div
    className={`border border-slate-300 bg-white p-3 shadow-sm ${className}`.trim()}
  >
    {children}
  </div>
);

export default Card;
