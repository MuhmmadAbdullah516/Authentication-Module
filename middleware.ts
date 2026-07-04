import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import { AUTH_ROUTES, PROTECTED_ROUTES, ROUTES } from "@/lib/constants";

// Instantiate NextAuth auth handler for Edge middleware
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // true if user has valid session token

  // Check route status
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Redirect rules
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // Exclude API paths and static folders
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
