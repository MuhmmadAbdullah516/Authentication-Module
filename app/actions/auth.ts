"use server";

import { signIn, signOut } from "@/auth";
import { loginSchema, signupSchema } from "@/lib/validation";
import { AuthError } from "next-auth";
import type { AuthResult } from "@/types/auth";
import { ROUTES, MESSAGES } from "@/lib/constants";
import { addMockUser, resetMockUserPassword, findMockUserByEmail } from "@/lib/dummy-data";

// ============================================
// LOGIN ACTION
// ============================================
export async function loginAction(formData: { email: string; password: string }): Promise<AuthResult> {
  // Step 1: Validate with Zod (server-side validation)
  const validated = loginSchema.safeParse(formData);
  if (!validated.success) {
    return { success: false, error: validated.error.issues[0].message };
  }

  // Step 2: Try to sign in with NextAuth
  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: MESSAGES.LOGIN_ERROR };
    }
    throw error; // Re-throw unexpected errors
  }
}

// ============================================
// SIGNUP ACTION
// ============================================
export async function signupAction(formData: { email: string; phone: string; password: string }): Promise<AuthResult> {
  // Step 1: Validate with Zod
  const validated = signupSchema.safeParse(formData);
  if (!validated.success) {
    return { success: false, error: validated.error.issues[0].message };
  }

  // Step 2: Write to our mock JSON database
  // We mock a user name as "User <EmailPrefix>" for simplicity
  const name = "User " + validated.data.email.split("@")[0];
  
  const result = await addMockUser({
    name,
    email: validated.data.email,
    password: validated.data.password,
  });

  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true };
}

// ============================================
// CHECK EMAIL ACTION
// ============================================
export async function checkEmailAction(email: string): Promise<boolean> {
  const user = await findMockUserByEmail(email);
  return !!user;
}

// ============================================
// RESET PASSWORD ACTION
// ============================================
export async function resetPasswordAction(formData: { email: string; newPassword: string }): Promise<AuthResult> {
  const result = await resetMockUserPassword(formData.email, formData.newPassword);
  
  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true };
}

// ============================================
// LOGOUT ACTION
// ============================================
export async function logoutAction() {
  await signOut({ redirectTo: ROUTES.HOME });
}
