"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmailField from "@/components/ui/emailfield";
import ResetPasswordStep from "@/components/forms/ResetPasswordStep";

import { checkEmailAction, resetPasswordAction } from "@/app/actions/auth";
import { toast } from "react-toastify";
import { ROUTES, MESSAGES } from "@/lib/constants";

export default function ForgetPasswordForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle step 1: Request email & send mock OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setErrors({});
    setIsLoading(true);

    const exists = await checkEmailAction(email);
    setIsLoading(false);

    if (!exists) {
      toast.error("User with this email not found");
      return;
    }

    // Success: Send mock OTP and go to step 2
    toast.success("Success! Mock OTP is: 123456");
    setStep(2);
  };

  // Handle step 2: Verify OTP & Reset Password
  const handleResetPassword = async (
    otp: string,
    password: string,
    confirmPassword: string,
  ) => {
    const fieldErrors: Record<string, string> = {};

    if (otp !== "123456") {
      fieldErrors.otp = "Invalid OTP code (Use 123456)";
    }
    if (password.length < 6) {
      fieldErrors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      fieldErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    const result = await resetPasswordAction({ email, newPassword: password });
    setIsLoading(false);

    if (result.success) {
      toast.success(MESSAGES.RESET_PASSWORD_SUCCESS);
      router.push(ROUTES.LOGIN);
    } else {
      toast.error(result.error || "Failed to reset password");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="relative">
        {/* Back navigation */}
        {step === 1 ? (
          <Link
            href={ROUTES.LOGIN}
            className="absolute left-6 top-8 text-[#1e2550] hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="absolute left-6 top-8 text-[#1e2550] hover:text-gray-700 focus:outline-none"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <div className="text-center mb-8 px-6">
          <h2 className="text-2xl font-bold text-[#1e2550] mb-2">
            {step === 1 ? "Forgot Password?" : "Reset Password"}
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            {step === 1
              ? "Please enter your email address and we'll send you an OTP to reset your password"
              : "Enter the OTP code sent to your email and choose a new password"}
          </p>
        </div>

        {step === 1 ? (
          /* STEP 1: REQUEST EMAIL FORM */
          <form onSubmit={handleRequestOtp} className="space-y-6">
            <EmailField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <Button type="submit" isLoading={isLoading}>
              Send OTP
            </Button>
          </form>
        ) : (
          /* STEP 2: VERIFY OTP & RESET PASSWORD FORM */
          <ResetPasswordStep
            email={email}
            isLoading={isLoading}
            onSubmit={handleResetPassword}
            errors={errors}
          />
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an Account?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="font-semibold text-[#1e2550] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}
