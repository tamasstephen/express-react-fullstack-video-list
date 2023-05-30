import { FieldValues } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { UserReducerPayload } from "../UserContext";
import { Dispatch } from "react";

type FormBody = {
  email: string;
  password: string;
  username?: string;
};

export async function submitForm(
  data: FieldValues,
  submitType: "login" | "register",
  setUser: Dispatch<UserReducerPayload>,
  setResponseError: React.Dispatch<React.SetStateAction<string[]>>,
  router: AppRouterInstance
): Promise<void> {
  const bodyData: FormBody = {
    email: data.email,
    password: data.password,
  };
  if (submitType === "register") {
    bodyData["username"] = data.username;
  }
  const body = JSON.stringify(bodyData);
  const res = await fetch(`http://localhost:3001/${submitType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  if (res.status === 200) {
    const data = await res.json();
    setUser({ type: "login", payload: { username: data.user.name } });
    router.push("/");
  } else if (res.status === 401 || res.status === 400) {
    const data = await res.json();
    setResponseError(() => [data.error]);
  }
}
