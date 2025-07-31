"use server";
import { auth, signIn, signOut } from "@/auth";
import { cache } from "react";

// social login: google and github
export const handleGoogleLogin = async () => {
  await signIn("google", { redirectTo: "/" });
};

// logout
export const handleLogout = async () => {
  console.log("logout called");
  await signOut();
};

// get current user

const getCurrentUser = cache(async () => {
  const session = await auth();
  const user = session?.user;

  return user || null;
});

export default getCurrentUser;
