import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
}

export default function Input({ icon, rightIcon, error, className = "", ...props }: InputProps) {
  const describedBy = props["aria-describedby"];
  const errorId = typeof describedBy === "string" ? describedBy : undefined;

  return (
    <div>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`block w-full border rounded-lg focus:ring-[#1e2550] focus:border-[#1e2550] sm:text-sm text-gray-900 ${
            icon ? "pl-10" : "pl-3"
          } ${rightIcon ? "pr-10" : "pr-3"} py-2 ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
