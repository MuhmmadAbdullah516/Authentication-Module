import fs from "fs/promises";
import path from "path";
import type { DummyUser } from "@/types/auth";

// Path to users.json file
const filePath = path.join(process.cwd(), "data", "users.json");

/**
 * Helper to read users from the JSON file
 */
export async function getMockUsers(): Promise<DummyUser[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as DummyUser[];
  } catch (error) {
    console.error("Error reading mock users database:", error);
    return [];
  }
}

/**
 * Helper to write users to the JSON file
 */
export async function saveMockUsers(users: DummyUser[]): Promise<boolean> {
  try {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing mock users database:", error);
    return false;
  }
}

/**
 * Find user by email
 */
export async function findMockUserByEmail(email: string): Promise<DummyUser | undefined> {
  const users = await getMockUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Add a new user to the JSON file
 */
export async function addMockUser(newUser: Omit<DummyUser, "id">): Promise<{ success: boolean; error?: string }> {
  const users = await getMockUsers();
  
  // Check if user already exists
  const exists = users.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
  if (exists) {
    return { success: false, error: "Email already registered" };
  }

  // Create user object with unique ID
  const user: DummyUser = {
    id: (users.length + 1).toString(),
    ...newUser,
  };

  users.push(user);
  const saved = await saveMockUsers(users);
  
  if (!saved) {
    return { success: false, error: "Database error" };
  }

  return { success: true };
}

/**
 * Reset a user's password in the JSON file
 */
export async function resetMockUserPassword(email: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  const users = await getMockUsers();
  
  const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (userIndex === -1) {
    return { success: false, error: "User with this email not found" };
  }

  // Update password
  users[userIndex].password = newPassword;
  
  const saved = await saveMockUsers(users);
  if (!saved) {
    return { success: false, error: "Database error" };
  }

  return { success: true };
}
