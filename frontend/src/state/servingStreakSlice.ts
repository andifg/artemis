import { ServingStreak } from "@/client/types";
import { StateCreator } from "zustand";

export interface ServingStreakSlice {
  servingStreaks: ServingStreak[];
  setServingStreaks: (servingStreaks: ServingStreak[]) => void;
}

const servingStreakSlice: StateCreator<ServingStreakSlice> = (set) => ({
  servingStreaks: [],
  setServingStreaks: (servingStreaks) => set({ servingStreaks }),
});
export { servingStreakSlice };
