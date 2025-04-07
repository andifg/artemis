import { ServingDateList, Serving } from "@/client/types";
import { StateCreator } from "zustand";

export interface ServingSlice {
  servings: ServingDateList;
  setServings: (portions: ServingDateList) => void;
  addServing: (portion: Serving) => void;
  deleteServing: (portionId: string) => void;
  editServing: Serving | null;
  setEditServing: (portion: Serving | null) => void;
}

const servingSlice: StateCreator<ServingSlice> = (set) => ({
  servings: {},
  setServings: (portions) => set({ servings: portions }),
  addServing: (portion) =>
    set((state) => {
      const date = new Date(portion.date).toISOString().split("T")[0];

      if (state.servings[date]?.some((p) => p.id === portion.id)) {
        return state;
      }
      const updatedMeatServingss = {
        ...state.servings,
        [date]: [...(state.servings[date] || []), portion],
      };
      return { servings: updatedMeatServingss };
    }),
  deleteServing: (portionId) =>
    set((state) => {
      const updatedMeatServingss = Object.fromEntries(
        Object.entries(state.servings)
          .map(([day, portions]) => [
            day,
            portions.filter((portion) => portion.id !== portionId),
          ])
          .filter(([_, portions]) => portions.length > 0),
      );

      return { servings: updatedMeatServingss };
    }),
  editServing: null,
  setEditServing: (portion) => set({ editServing: portion }),
});

export { servingSlice };
