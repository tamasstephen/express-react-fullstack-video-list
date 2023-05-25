import { useUserContext } from "@/app/UserContext";
import { useClickOutSide } from "@/hooks/useClickOutside";
import Link from "next/link";
import { useState } from "react";

export default function UserWidget() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const myRef = useClickOutSide(() => setIsMenuOpen(false));
  const { user, setUser } = useUserContext();
  const userInitials = user?.username
    .split(" ")
    .map((name) => name[0])
    .join("");
  function handleClick() {
    setIsMenuOpen((prev) => !prev);
  }

  async function handleLogout() {
    const res = await fetch(`http://localhost:3001/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUser({ type: "logout", payload: null });
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-900 font-medium"
        onClick={handleClick}
      >
        {userInitials}
      </button>
      {isMenuOpen && (
        <div
          ref={myRef}
          className="absolute top-12 right-0 w-48 bg-white rounded-md shadow-md"
        >
          <ul className="flex flex-col text-sm">
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/profile">Profile</Link>
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/upload">Upload video</Link>
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
