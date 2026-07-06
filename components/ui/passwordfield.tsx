"use client";

import { useState, type ChangeEventHandler, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import Input from "./Input";
import Label from "./Label";

type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> & {
  label?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
};

export default function PasswordField({
  label = "Password",
  value,
  onChange,
  error,
  placeholder = "Password",
  required = true,
  id = "password",
  name = "password",
  autoComplete = "current-password",
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        {...props}
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        icon={<Lock className="h-5 w-5 text-[#1e2550]" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:text-[#1e2550]"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        }
        error={error}
      />
    </div>
  );
}
