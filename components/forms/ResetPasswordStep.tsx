"use client";

import { useState } from "react";
import { Lock, Eye, KeyRound } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(otp, password, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label>OTP Code</Label>
        <Input
          type="text"
          required
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
          icon={<KeyRound className="h-5 w-5 text-[#1e2550]" />}
          error={errors.otp}
        />
      </div>

      <div>
        <Label>New Password</Label>
        <Input
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5 text-[#1e2550]" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <Eye className="h-5 w-5" />
            </button>
          }
          error={errors.password}
        />
      </div>

      <div>
        <Label>Confirm Password</Label>
        <Input
          type={showPassword ? "text" : "password"}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5 text-[#1e2550]" />}
          error={errors.confirmPassword}
        />
      </div>

      <Button type="submit" isLoading={isLoading}>
        Reset Password
      </Button>
    </form>
  );
}
