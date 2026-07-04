import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validation";
import { getMockUsers } from "@/lib/dummy-data";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Step 1: Validate credentials with Zod
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        // Step 2: Find user in our dynamic mock database
        const users = await getMockUsers();
        const user = users.find(
          (u) =>
            u.email.toLowerCase() === parsed.data.email.toLowerCase() && 
            u.password === parsed.data.password
        );

        // Step 3: Return user profile on success
        if (user) {
          return { id: user.id, name: user.name, email: user.email };
        }
        
        return null;
      },
    }),
  ],
});
