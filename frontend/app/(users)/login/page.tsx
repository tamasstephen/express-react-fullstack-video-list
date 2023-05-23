"use client";

import Button from "@/app/components/Button";
import Input from "../components/Input";

export default function Login() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const body = JSON.stringify({ email, password });
    console.log(body);
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center tracking-tight mb-8">
        Log in to Vidia
      </h1>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="grid gap-4 items-center justify-center w-full"
      >
        <Input label="Email" htmlProps={{ type: "email", id: "email" }} />
        <Input
          label="Password"
          htmlProps={{ type: "password", id: "password" }}
        />
        <Button attributes={{ type: "submit" }}>Continue</Button>
      </form>
    </>
  );
}
