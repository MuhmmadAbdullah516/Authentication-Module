import { LabelHTMLAttributes } from "react";

export default function Label({ children, className = "", ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`block text-sm font-medium text-[#1e2550] mb-1 ${className}`} {...props}>
      {children}
    </label>
  );
}
