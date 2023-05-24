"use client";

import { Dispatch, createContext, useContext, useReducer } from "react";

interface User {
  id: number;
  username: string;
  email?: string;
}

type UserReducerPayload = { type: string; payload: null | User };
interface UserContextType {
  user: User | null;
  setUser: Dispatch<UserReducerPayload>;
}

function userReducer(state: User | null, action: UserReducerPayload) {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      return null;
    default:
      throw new Error();
  }
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

export const useUserContext = () => useContext(UserContext);
