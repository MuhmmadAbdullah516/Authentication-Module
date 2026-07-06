"use client";

import type { ChangeEventHandler, InputHTMLAttributes } from "react";
import { Mail } from "lucide-react";

import Input from "./Input";
import Label from "./Label";

type EmailFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> & {
  label?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
};

export default function EmailField({
  label = "Email Address",
  value,
  onChange,
  error,
  placeholder = "demo@gmail.com",
  required = true,
  id = "email",
  name = "email",
  autoComplete = "email",
  ...props
}: EmailFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        {...props}
        id={id}
        name={name}
        type="email"
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        icon={<Mail className="h-5 w-5 text-[#1e2550]" />}
        error={error}
      />
    </div>
  );
}
