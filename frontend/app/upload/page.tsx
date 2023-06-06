"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Input from "../components/form/Input";
import Button from "@/app/components/Button";
import ErrorBar from "../components/form/ErrorBar";
import Heading from "../components/Heading";
import Div from "../components/Div";
import { useState } from "react";
import { Session } from "next-auth";
import ButtonLoad from "../components/ButtonLoad";
import SnackBar from "../components/form/SnackBar";

interface VidiaSession extends Session {
  sToken: string;
}

export default function Upload() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseError, setResponseError] = useState<string[]>([]);
  const [isSnackBarHidden, setIsSnackBarHidden] = useState<boolean>(true);
  const { data: session } = useSession({
    required: true,
  });

  async function submitFile(data: FieldValues) {
    const formData = new FormData();
    formData.append("video", data.video[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    const mySession = session as VidiaSession;
    setIsSubmitting(true);
    const res = await fetch("http://localhost:3001/api/video", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mySession?.sToken}`,
      },
      body: formData,
    });
    if (res.ok) {
      const json = await res.json();
      reset();
      setIsSnackBarHidden(false);
      setTimeout(() => {
        setIsSnackBarHidden(true);
      }, 3000);
    } else {
      setResponseError(["Could not upload video"]);
    }
    setIsSubmitting(false);
  }

  return (
    <main className="flex flex-col h-full items-center justify-center min-h-[75vh] mx-4 pt-8 lg:mx-0">
      <Div>
        <Heading>Upload your Video</Heading>
        {responseError.length > 0 && <ErrorBar errors={responseError} />}
        <div className="relative w-full">
          <SnackBar isHidden={isSnackBarHidden} isAbsolute={false}>
            <p className="font-bold text-purple-600">Video uploaded!</p>
          </SnackBar>
        </div>
        <form
          onSubmit={handleSubmit((data) => submitFile(data))}
          className="grid gap-4 items-center justify-center w-full"
        >
          <Input
            label="title"
            htmlProps={{ type: "text", id: "title", name: "title" }}
            testProps="title"
            isRequired={true}
            register={register}
          />
          {errors.title && (
            <ErrorBar errors={["Please provide a title for the video"]} />
          )}
          <div className="flex flex-col w-72">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="h-8 p-2 rounded-md border border-gray-400 w-full min-h-[4rem]"
              {...register("description", { required: true })}
            />
          </div>
          {errors.description && (
            <ErrorBar errors={["Please provide a description for the video"]} />
          )}
          <Input
            label="video"
            htmlProps={{
              type: "file",
              id: "video",
              name: "video",
              accept: "video/mp4",
            }}
            testProps="vieo"
            isRequired={true}
            register={register}
          />
          {errors.video && (
            <ErrorBar errors={["Please provide a video file"]} />
          )}
          {!isSubmitting ? (
            <Button
              buttonType="primary"
              attributes={{ type: "submit" }}
              testProps="submit"
            >
              Upload
            </Button>
          ) : (
            <ButtonLoad>
              <p className="font-medium text-primary-text">Submitting...</p>
            </ButtonLoad>
          )}
        </form>
      </Div>
    </main>
  );
}
