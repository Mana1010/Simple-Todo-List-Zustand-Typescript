import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { nanoid } from "nanoid";

function Form() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });
  const { formState, control, register } = form;
  const { touchedFields, dirtyFields } = formState;
  console.log({ touchedFields, dirtyFields });
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form className="w-1/2 h-[60%] bg-white/20 backdrop-blur-md p-4 rounded-md">
        <div className="relative w-1/2 p-1.5 h-10 bg-white/20 backdrop-blur-sm flex">
          <div className="hidden">
            <h1 className="font-poppins text-white text-[13px]">Name</h1>
          </div>
          <input
            type="text"
            className="w-full"
            id="name"
            {...register("name")}
          />
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default Form;
