import { MeatPortionDateList } from "@/client/types";
import { StateCreator } from "zustand";

export interface MeatPortionSlice {
  meatPortions: MeatPortionDateList;
  setPortions: (portions: MeatPortionDateList) => void;
  deletePortion: (portionId: string) => void;
}

const meatPortionSlice: StateCreator<MeatPortionSlice> = (set) => ({
  meatPortions: {},
  setPortions: (portions) => set({ meatPortions: portions }),
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
});

export { meatPortionSlice };
