"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUserContext } from "@/app/UserContext";
import Button from "@/app/components/Button";
import Input from "./Input";
import { useForm, FieldValues } from "react-hook-form";
import ErrorBar from "./ErrorBar";
import { useState } from "react";

type FormBody = {
  email: string;
  password: string;
  username?: string;
};

export default function LogRegForm() {
  const { user, setUser } = useUserContext();
  const pathName = usePathname();
  const router = useRouter();
  const [responseError, setResponseError] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitForm(data: FieldValues) {
    const bodyData: FormBody = {
      email: data.email,
      password: data.password,
    };
    if (pathName === "/register") {
      bodyData["username"] = data.username;
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
      setUser({ type: "login", payload: { username: data.user.name } });
      console.log(user);
      router.push("/");
    } else if (res.status === 401 || res.status === 400) {
      const data = await res.json();
      setResponseError(() => [data.error]);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-72">
      <h1 className="text-4xl font-bold text-center tracking-tight mb-8 w-full">
        {pathName === "/register" ? "Register to Vidia" : "Log in to Vidia"}
      </h1>
      {responseError.length > 0 && <ErrorBar errors={responseError} />}
      <form
        onSubmit={handleSubmit((data) => submitForm(data))}
        className="grid gap-4 items-center justify-center w-full"
        action="post"
      >
        <Input
          label="email"
          htmlProps={{ type: "email", id: "email", name: "email" }}
          isRequired={true}
          register={register}
          validate={{
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
        />
        {errors.email && <ErrorBar errors={["Invalid email address"]} />}
        {pathName === "/register" && (
          <>
            <Input
              label="username"
              htmlProps={{ type: "text", id: "username", name: "username" }}
              isRequired={true}
              register={register}
              validate={{
                minLength: {
                  value: 3,
                  message: "Password must be at least 8 characters long",
                },
              }}
            />
            {errors.username && (
              <ErrorBar
                errors={["The username must be at least 3 characters long"]}
              />
            )}
          </>
        )}
        <Input
          label="password"
          htmlProps={{ type: "password", id: "password", name: "password" }}
          isRequired={true}
          register={register}
          validate={{
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
        />
        {errors.password && (
          <ErrorBar
            errors={["The password must be at least 8 characters long"]}
          />
        )}
        <Button buttonType="primary" attributes={{ type: "submit" }}>
          Continue
        </Button>
      </form>
    </div>
  );
}
