"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUserContext } from "@/app/UserContext";
import Button from "@/app/components/Button";
import Input from "./Input";

type FormBody = {
  email: string;
  password: string;
  username?: string;
};

export default function LogRegForm() {
  const { user, setUser } = useUserContext();
  const pathName = usePathname();
  const router = useRouter();
  const pageH1 =
    pathName === "/register" ? "Register to Vidia" : "Log in to Vidia";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const bodyData: FormBody = {
      email: form.email.value,
      password: form.password.value,
    };
    if (pathName === "/register") {
      bodyData["username"] = form.username.value;
    }
    const body = JSON.stringify(bodyData);
    const res = await fetch(
      `http://localhost:3001/${pathName.replace("/", "")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      setUser({ type: "login", payload: data.user });
      router.push("/");
    } else if (res.status === 401 || res.status === 400) {
      const data = await res.json();
      console.log(data);
    }
    // TODO: handle errors
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center tracking-tight mb-8">
        {pageH1}
      </h1>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="grid gap-4 items-center justify-center w-full"
        action="post"
      >
        <Input
          label="Email"
          htmlProps={{ type: "email", id: "email", name: "email" }}
        />
        {pathName === "/register" && (
          <Input
            label="Username"
            htmlProps={{ type: "text", id: "username", name: "username" }}
          />
        )}
        <Input
          label="Password"
          htmlProps={{ type: "password", id: "password", name: "password" }}
        />
        <Button buttonType="primary" attributes={{ type: "submit" }}>
          Continue
        </Button>
      </form>
    </>
  );
}
