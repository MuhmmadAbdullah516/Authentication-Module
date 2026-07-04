import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white p-8 rounded-xl border border-gray-200 shadow-xl w-full max-w-md relative ${className}`}>
      {children}
    </div>
  );
}
