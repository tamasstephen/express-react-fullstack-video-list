"use client";

import { Dispatch, createContext, useReducer } from "react";

interface User {
  id: number;
  username: string;
  email?: string;
}

function userReducer(
  state: User | null,
  action: { type: string; payload: User }
) {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      return null;
    default:
      throw new Error();
  }
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<{ type: string; payload: User }>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserContextPorvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
