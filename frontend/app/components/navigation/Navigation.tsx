"use client";

import Wrapper from "../Wrapper";
import { signIn, useSession } from "next-auth/react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserWidget from "./UserWidget";

export default function Navigation() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="fixed bg-white flex items-center justify-center flex-wrap border-b border-gray-300 p-4 w-full">
      <Wrapper>
        <div className="flex justify-between w-full">
          <div className="flex items-center text-gray-800">
            <Link href="/">
              <span className="font-bold text-xl tracking-tight">Vidia</span>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-800 hover:text-gray-500 hover:border-gray-500">
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Vidia</title>
                <path d="M0 0h20v20H0z" fill="none" />
                <path d="M0 4h20v1.5H0zM0 9.5h20V11H0zM0 15h20v1.5H0z" />
              </svg>
            </button>
          </div>
          {session?.user ? (
            <UserWidget />
          ) : (
            <div className="flex items-center">
              <Button buttonType="link-sm" cb={() => signIn()}>
                Login
              </Button>
              <Button
                buttonType="primary-sm"
                cb={() => router.push("/register")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </Wrapper>
    </nav>
  );
}
