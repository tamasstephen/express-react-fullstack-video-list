"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Input from "../components/form/Input";
import Button from "@/app/components/Button";
import ErrorBar from "../components/form/ErrorBar";

async function submitFile(data: FieldValues) {
  const formData = new FormData();
  formData.append("video", data.video[0]);
  formData.append("title", data.title);
  formData.append("description", data.description);
}

export default function Upload() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession({
    required: true,
  });
  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
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
            {...register("description", { required: true })}
          />
        </div>
        {errors.description && (
          <ErrorBar errors={["Please provide a description for the video"]} />
        )}
        <Input
          label="video"
          htmlProps={{ type: "file", id: "video", name: "video" }}
          testProps="vieo"
          isRequired={true}
          register={register}
        />
        {errors.video && <ErrorBar errors={["Please provide a video file"]} />}
        <Button
          buttonType="primary"
          attributes={{ type: "submit" }}
          testProps="submit"
        >
          Upload
        </Button>
      </form>
    </div>
  );
}
