"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Card from "@/components/ui/Card";

// Import centralized Zod schema (from lib/validation.ts)
import { loginSchema } from "@/lib/validation";
import { toast } from "react-toastify";
import { ROUTES, MESSAGES } from "@/lib/constants";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Validate with Zod
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      // Show errors below each field
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear errors if validation passed
    setErrors({});
    setIsLoading(true);

    // Step 2: Call NextAuth signIn
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (res?.error) {
      toast.error(MESSAGES.LOGIN_ERROR);
    } else {
      toast.success(MESSAGES.LOGIN_SUCCESS);
      router.push(ROUTES.DASHBOARD);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card>
        <h2 className="text-2xl font-bold text-center text-[#1e2550] mb-6">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <Label>Email Address</Label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@gmail.com"
              icon={<Mail className="h-5 w-5 text-[#1e2550]" />}
              error={errors.email}
            />
          </div>

          <div>
            <Label>Password</Label>
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
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              }
              error={errors.password}
            />
          </div>

          <div className="flex justify-end">
            <Link href={ROUTES.FORGET_PASSWORD} className="text-sm font-semibold text-[#1e2550] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" isLoading={isLoading}>Sign In</Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an Account?{" "}
          <Link href={ROUTES.SIGNUP} className="font-semibold text-[#1e2550] hover:underline">
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
}
