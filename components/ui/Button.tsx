import { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isLoading?: boolean; // Shows spinner when true
  fullWidth?: boolean; // Defaults to true; set false for inline/header buttons
}

export default function Button({ children, variant = "primary", isLoading = false, fullWidth = true, className = "", ...props }: ButtonProps) {
  const baseStyles = `${fullWidth ? "w-full" : "w-auto"} flex items-center justify-center gap-2 py-2.5 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`;
  
  const variants = {
    primary: "border-transparent text-white bg-[#1e2550] hover:bg-[#2a3470] focus:ring-[#1e2550]",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-[#1e2550]",
    ghost: "border-transparent text-[#1e2550] bg-transparent hover:bg-gray-100 shadow-none focus:ring-[#1e2550]",
    danger: "border-transparent text-red-300 bg-transparent hover:bg-red-500/10 hover:text-red-200 shadow-none focus:ring-red-400",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Spinner className="text-white" />
          Please wait...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
