import { MeatPortionDateList, MeatPortion } from "@/client/types";
import { StateCreator } from "zustand";

export interface MeatPortionSlice {
  meatPortions: MeatPortionDateList;
  setPortions: (portions: MeatPortionDateList) => void;
  addPortion: (portion: MeatPortion) => void;
  deletePortion: (portionId: string) => void;
  editPortion: MeatPortion | null;
  setEditPortion: (portion: MeatPortion | null) => void;
}

const meatPortionSlice: StateCreator<MeatPortionSlice> = (set) => ({
  meatPortions: {},
  setPortions: (portions) => set({ meatPortions: portions }),
  addPortion: (portion) =>
    set((state) => {
      const date = new Date(portion.date).toISOString().split("T")[0];

      if (state.meatPortions[date]?.some((p) => p.id === portion.id)) {
        return state;
      }
      const updatedMeatPortions = {
        ...state.meatPortions,
        [date]: [...(state.meatPortions[date] || []), portion],
      };
      return { meatPortions: updatedMeatPortions };
    }),
  deletePortion: (portionId) =>
    set((state) => {
      const updatedMeatPortions = Object.fromEntries(
        Object.entries(state.meatPortions)
          .map(([day, portions]) => [
            day,
            portions.filter((portion) => portion.id !== portionId),
          ])
          .filter(([_, portions]) => portions.length > 0),
      );

      return { meatPortions: updatedMeatPortions };
    }),
  editPortion: null,
  setEditPortion: (portion) => set({ editPortion: portion }),
});

export { meatPortionSlice };
