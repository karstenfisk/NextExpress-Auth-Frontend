"use client";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <div className="shadow-sm w-screen h-14 flex items-center justify-between">
      <Link href="/">
        <h5 className="text-2xl font-sans font-main pl-5">Placeholder</h5>
      </Link>

      <div className="pr-10">
        {status === "loading" ? null : session?.user ? (
          <>
            <button
              onClick={() => signOut()}
              className="underline underline-offset-2 hover:text-red-500 px-4"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="underline underline-offset-2 hover:text-sky-600 px-4"
            >
              Login
            </button>
            <Link
              href="/register"
              className="underline underline-offset-2 hover:text-sky-600  px-4"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
