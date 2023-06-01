"use client";

import Button from "@/app/components/Button";
import Input from "../../components/form/Input";
import { useForm } from "react-hook-form";
import ErrorBar from "../../components/form/ErrorBar";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

type FormBody = {
  email: string;
  password: string;
  username: string;
};

export async function submitForm(
  data: FieldValues,
  setResponseError: React.Dispatch<React.SetStateAction<string[]>>,
  router: AppRouterInstance
): Promise<void> {
  const bodyData: FormBody = {
    email: data.email,
    password: data.password,
    username: data.username,
  };
  const body = JSON.stringify(bodyData);
  const res = await fetch(`http://localhost:3001/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  if (res.status === 200) {
    const data = await res.json();
    router.push("/");
  } else if (res.status === 401 || res.status === 400) {
    const data = await res.json();
    setResponseError(() => [data.error]);
  }
}

export default function Register() {
  const [responseError, setResponseError] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-72">
      <h1 className="text-4xl font-bold text-center tracking-tight mb-8 w-full">
        Register to Vidia
      </h1>
      {responseError.length > 0 && <ErrorBar errors={responseError} />}
      <form
        onSubmit={handleSubmit((data) =>
          submitForm(data, setResponseError, router)
        )}
        className="grid gap-4 items-center justify-center w-full"
        action="post"
      >
        <Input
          label="email"
          htmlProps={{
            type: "email",
            id: "email",
            name: "email",
          }}
          testProps="email"
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

        <>
          <Input
            label="username"
            htmlProps={{ type: "text", id: "username", name: "username" }}
            testProps="username"
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

        <Input
          label="password"
          htmlProps={{ type: "password", id: "password", name: "password" }}
          testProps="password"
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
        <Button
          buttonType="primary"
          attributes={{ type: "submit" }}
          testProps="submit"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
