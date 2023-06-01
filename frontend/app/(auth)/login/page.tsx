"use client";
import Button from "@/app/components/Button";
import Input from "../../components/form/Input";
import { useForm } from "react-hook-form";
import ErrorBar from "../../components/form/ErrorBar";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [responseError, setResponseError] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex flex-col items-center justify-center w-72">
      <h1 className="text-4xl font-bold text-center tracking-tight mb-8 w-full">
        Sign in to Vidia
      </h1>
      {responseError.length > 0 && <ErrorBar errors={responseError} />}
      <form
        onSubmit={handleSubmit((data) =>
          signIn("credentials", {
            ...data,
            callbackUrl: `/`,
          })
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
