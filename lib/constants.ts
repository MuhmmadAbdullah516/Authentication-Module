// ============================================
// APP CONSTANTS
// ============================================

// App Info
export const APP_NAME = "Skyvela";
export const APP_DESCRIPTION = "Your smart travel companion for flights, hotels, activities and more.";

// Brand Colors
export const BRAND_COLOR = "#1e2550";

// Routes — easy to update from one place
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGET_PASSWORD: "/forget-password",
  DASHBOARD: "/dashboard",
};

// Auth Routes — routes that only non-logged-in users can access
export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FORGET_PASSWORD,
];

// Protected Routes — routes that only logged-in users can access
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
];

// Toast Messages
export const MESSAGES = {
  LOGIN_SUCCESS: "Successfully logged in!",
  LOGIN_ERROR: "Invalid email or password",
  SIGNUP_SUCCESS: "Account created successfully!",
  FORGET_PASSWORD_SUCCESS: "Password reset email sent!",
  RESET_PASSWORD_SUCCESS: "Password reset successfully!",
  PASSWORDS_NOT_MATCH: "Passwords do not match",
};
