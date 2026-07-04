// ============================================
// AUTH TYPES
// ============================================

// User type — what a user looks like
export interface User {
  id: string;
  name: string;
  email: string;
}

// DummyUser type — includes password for dummy data
export interface DummyUser extends User {
  password: string;
}

// What the server action returns after login/signup
export interface AuthResult {
  success: boolean;
  error?: string;
}
