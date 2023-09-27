// Your Zustand store file (e.g., zustandStore.js)
import { create } from "zustand";
import { Info } from "../App";
import { devtools } from "zustand/middleware";

type Store = {
  info:
    | {
        itemName: string;
        id: string;
      }[];
  updateGlobalState: (newValue: Info) => void;
  deleteInfo: (id: string) => void;
};
const useZustandStore = create<Store>((set: any) => ({
  info: JSON.parse(localStorage.getItem("info") || "[]"),

  updateGlobalState: (newValue: Info) => {
    set((state: Store) => {
      const updatedState = [newValue, ...state.info];
      localStorage.setItem("info", JSON.stringify(updatedState));
      return { info: updatedState };
    });
  },
  deleteInfo: (id: string) => {
    set((state: Store) => {
      const filtered = state.info.filter((infos) => infos.id !== id);
      localStorage.setItem("info", JSON.stringify(filtered));
      return { info: filtered };
    });
  },
}));
export default useZustandStore;
