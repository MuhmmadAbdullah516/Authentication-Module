import { auth } from "@/auth";

// ============================================
// AUTH HELPER FUNCTIONS
// ============================================

/**
 * Get the current logged-in user's session (server-side)
 * Use this in Server Components and Server Actions
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

/**
 * Check if the user is logged in (server-side)
 */
export async function isAuthenticated() {
  const session = await auth();
  return !!session?.user;
}
