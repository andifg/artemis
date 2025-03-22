import { DailyOverviewMap } from "@/client/types";
import { MeatPortion } from "@/client/types";
import { StateCreator } from "zustand";
import { extractDate } from "@/utils/extractDate";

export interface DailyOverviewSlice {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  dailyOverviewMap: DailyOverviewMap;
  setDailyOverviewMap: (dailyOverviewMap: DailyOverviewMap) => void;
  increasePortion: (portion: MeatPortion) => void;
  decreasePortion: (portion: MeatPortion) => void;
}

const dailyOverviewSlice: StateCreator<DailyOverviewSlice> = (set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
  dailyOverviewMap: {},
  setDailyOverviewMap: (dailyOverviewMap) => set({ dailyOverviewMap }),
  increasePortion: (portion) => {
    set((state) => {
      const updatedDailyOverviewMap = { ...state.dailyOverviewMap };

      const date = extractDate(new Date(portion.date));

      if (updatedDailyOverviewMap[date]) {
        updatedDailyOverviewMap[date].MeatPortions++;
      }

      return { dailyOverviewMap: updatedDailyOverviewMap };
    });
  },
  decreasePortion: (portion) => {
    set((state) => {
      const updatedDailyOverviewMap = { ...state.dailyOverviewMap };

      const date = extractDate(new Date(portion.date));

      if (updatedDailyOverviewMap[date]) {
        updatedDailyOverviewMap[date].MeatPortions--;
      }

      return { dailyOverviewMap: updatedDailyOverviewMap };
    });
  },
});

export { dailyOverviewSlice };
