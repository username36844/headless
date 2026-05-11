"use client";

import { signOut } from "next-auth/react";

export default function UserMenu({
  user,
}: {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      {user.image ? (
        <img
          src={user.image ?? "/default-avatar.png"}
          alt={user.name ?? "User"}
          className="h-9 w-9 rounded-full object-cover border border-zinc-200 shrink-0"
        />
      ) : (
        <div className="h-9 w-9 rounded-full bg-zinc-300" />
      )}


      {/* Logout */}
      <button
        onClick={() => signOut()}
        className="text-sm font-medium text-zinc-600 hover:text-black"
      >
        Logout
      </button>
    </div>
  );
}
