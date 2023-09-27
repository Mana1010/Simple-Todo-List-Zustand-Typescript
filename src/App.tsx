import React, { useState, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Form from "./components/Form";
import "./App.css";
import useZustandStore from "./components/store";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { nanoid } from "nanoid";
export type Info = {
  itemName: string;
  id: string;
};
function App() {
  const { info, updateGlobalState, deleteInfo } = useZustandStore();
  const form = useForm<Info>({
    defaultValues: {
      itemName: "",
      id: nanoid(),
    },
  });
  const { register, formState, control, handleSubmit, reset, getValues } = form;
  const { isDirty } = formState;
  function itemSubmit(data: Info) {
    if (isDirty) {
      updateGlobalState(data);
    }

    reset({
      itemName: "",
      id: nanoid(),
    });
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(itemSubmit)();
    }
  };
  // localStorage.clear();
  return (
    <div className="flex w-screen h-screen bg-gradient-to-tr from-blue-500 to-white/20 justify-center items-center">
      <form className="w-1/3 h-[80%] rounded-md backdrop-blur-sm bg-white/25 px-5 py-2.5">
        <h1 className="font-poppins text-xl font-bold">Buy something</h1>
        <div className="flex justify-center pt-5 w-full">
          <input
            type="text"
            placeholder="Enter something"
            id="itemName"
            onKeyDown={handleKeyDown}
            className={`w-full p-2 focus:outline-1 focus:outline-blue-600 ${
              getValues("itemName").length === 0 && "outline-none"
            }`}
            {...register("itemName")}
          />
        </div>
        <div className="overflow-auto flex flex-col space-y-2 pt-3 h-[80%]">
          {info.map((infos) => (
            <div
              key={infos.id}
              className=" bg-white p-3 flex justify-between items-center"
            >
              <h1 className="font-poppins text-blue-600 uppercase">
                {infos.itemName}
              </h1>
              <button
                onClick={() => deleteInfo(infos.id)}
                className="px-2.5 h-full font-poppins text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default App;
