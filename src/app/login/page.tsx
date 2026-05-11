import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginClient from "./login-client";

export default async function LoginPage() {
  const session = await auth();

  // If already logged in → send to home (or dashboard)
  if (session) {
    redirect("/");
  }

  return <LoginClient />;
}