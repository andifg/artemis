import { create } from "zustand";

import { MeatPortionDateList } from "@/client/types";

interface CentralState {
  meatPortions: MeatPortionDateList;
  setPortions: (portions: MeatPortionDateList) => void;
  deletePortion: (portionId: string) => void;
  deleteAllPortions: () => void;
}

const useCentralState = create<CentralState>((set) => ({
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
  deleteAllPortions: () => set({ meatPortions: {} }),
}));

export { useCentralState };
