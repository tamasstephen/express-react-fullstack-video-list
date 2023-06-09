import { useClickOutSide } from "@/hooks/useClickOutside";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import UserIcon from "./UserIcon";
import { userUtils } from "@/app/utils/utils";

export default function UserWidget() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const myRef = useClickOutSide(() => setIsMenuOpen(false));
  const { data: session } = useSession();
  const userInitials = session?.user?.name
    ? userUtils.getNameInitials(session.user.name)
    : "";
  function handleClick() {
    setIsMenuOpen((prev) => !prev);
  }

  async function handleLogout() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      signOut();
    }
  }

  return (
    <div className="relative">
      <button onClick={handleClick}>
        <UserIcon initials={userInitials ?? ""} size="small" />
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
