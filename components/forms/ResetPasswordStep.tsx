"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import PasswordField from "@/components/ui/passwordfield";

interface ResetPasswordStepProps {
  email: string;
  isLoading: boolean;
  onSubmit: (otp: string, password: string, confirmPassword: string) => void;
  errors: Record<string, string>;
}

export default function ResetPasswordStep({ email, isLoading, onSubmit, errors }: ResetPasswordStepProps) {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(otp, password, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="email" value={email} />

      <div>
        <Label htmlFor="otp">OTP Code</Label>
        <Input
          id="otp"
          name="otp"
          type="text"
          required
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
          autoComplete="one-time-code"
          inputMode="numeric"
          icon={<KeyRound className="h-5 w-5 text-[#1e2550]" />}
          error={errors.otp}
          aria-invalid={Boolean(errors.otp)}
        />
      </div>

      <PasswordField
        id="new-password"
        name="newPassword"
        label="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="new-password"
      />

      <PasswordField
        id="confirm-password"
        name="confirmPassword"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        autoComplete="new-password"
      />

      <Button type="submit" isLoading={isLoading}>
        Reset Password
      </Button>
    </form>
  );
}
