"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Phone, ArrowLeft, ChevronDown } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Card from "@/components/ui/Card";

// Import centralized Zod schema
import { signupSchema, type SignupFormData } from "@/lib/validation";
import { toast } from "react-toastify";
import { ROUTES, MESSAGES } from "@/lib/constants";
import { signupAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Step 1: Validate with Zod
    const validation = signupSchema.safeParse({ email, phone, password });
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear errors
    setErrors({});
    setIsLoading(true);

    // Step 2: Call the real signup Server Action (our mock backend)
    const result = await signupAction({ email, phone, password });
    setIsLoading(false);

    if (result.success) {
      toast.success(MESSAGES.SIGNUP_SUCCESS);
      router.push(ROUTES.LOGIN);
    } else {
      toast.error(result.error || "Failed to create account");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="relative">
        <Link href={ROUTES.HOME} className="absolute left-6 top-8 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#1e2550] mb-2">Sign Up</h2>
          <p className="text-xs text-gray-500">Create an account & explore the skyvela!</p>
        </div>

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
            <Label>Phone</Label>
            <div>
              <div className={`flex border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#1e2550] focus-within:border-[#1e2550] ${errors.phone ? "border-red-500" : "border-gray-300"}`}>
                <div className="flex items-center px-3 bg-gray-50 border-r border-gray-300">
                  <Phone className="h-4 w-4 text-[#1e2550] mr-2" />
                  <span className="text-sm text-gray-600">+088</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full py-2 px-3 focus:outline-none sm:text-sm text-gray-900 bg-white"
                  placeholder="1XXXXXXXXXX"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
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

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-[#1e2550] focus:ring-[#1e2550] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-xs text-gray-900">
              I agree to the <span className="font-semibold text-[#1e2550]">Terms & Conditions</span>
            </label>
          </div>

          <Button type="submit" isLoading={isLoading}>Sign Up</Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an Account?{" "}
          <Link href={ROUTES.LOGIN} className="font-semibold text-[#1e2550] hover:underline">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}
