"use client";
import React from "react";
import { signOut } from "next-auth/react";

export default function SignoutButton({ type }: { type?: string }) {
  return (
    <div className="w-full">
      <button
        className="flex gap-2 justify-center rounded-md px-4 w-[calc(100vw-64px)] m-8  py-3 bg-neutral-300 text-neutral-800 border items-center text-lg "
        onClick={() =>
          signOut({
            callbackUrl: type == "Admin" ? "/admin/login" : "/login",
            redirect: true,
          })
        }
      >
        Sign Out
      </button>
    </div>
  );
}
