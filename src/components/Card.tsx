import * as React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => (
  <div
    className={`rounded-3xl border border-slate-300/45 bg-slate-900/55 p-3 text-slate-100 shadow-[0_16px_28px_rgba(2,6,23,0.35)] backdrop-blur-md ${className}`.trim()}
  >
    {children}
  </div>
);

export default Card;
