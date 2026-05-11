"use client";

import { signIn } from "next-auth/react";

export default function LoginClient() {
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="rounded-full bg-black px-6 py-3 text-white"
      >
        Continue with Google
      </button>
    </div>
  );
}