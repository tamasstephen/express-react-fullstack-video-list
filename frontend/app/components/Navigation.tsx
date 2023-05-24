"use client";

import Wrapper from "./Wrapper";
import { useUserContext } from "../UserContext";
import Button from "./Button";

export default function Navigation() {
  async function handleLogout() {
    const res = await fetch(`http://localhost:3001/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setUser({ type: "logout", payload: null });
  }

  const { user, setUser } = useUserContext();
  console.log("nav user:", user);
  return (
    <nav className="flex items-center justify-center flex-wrap border-b border-gray-300 p-4 w-full">
      <Wrapper>
        <div className="flex w-full items-center text-gray-800 mr-6 2xl:mr-0">
          <span className="font-bold text-xl tracking-tight">Vidia</span>
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
        {user && <Button cb={handleLogout}>Log out</Button>}
      </Wrapper>
    </nav>
  );
}
