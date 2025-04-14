import { DailyOverview } from "@/client/types";
import { Serving } from "@/client/types";
import { StateCreator } from "zustand";
import { extractDate } from "@/utils/extractDate";

export interface DailyOverviewSlice {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  dailyOverview: DailyOverview[];
  setDailyOverview: (dailyOverview: DailyOverview[]) => void;
  increasePortion: (serving: Serving) => void;
  decreasePortion: (serving: Serving) => void;
}

const dailyOverviewSlice: StateCreator<DailyOverviewSlice> = (set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
  dailyOverview: [],
  setDailyOverview: (dailyOverview) => set({ dailyOverview }),
  increasePortion: (serving) => {
    set((state) => {
      // const updatedDailyOverview = [...state.dailyOverview];
      const date = extractDate(new Date(serving.date));

      // console.log("Day overview: ", updatedDailyOverview);
      // console.log("Servering: ", serving);

      let category:
        | "meat_portions"
        | "vegetarian_portions"
        | "alcohol_portions"
        | "candy_portions";

      switch (serving.category) {
        case "meat":
          category = "meat_portions";
          break;
        case "alcohol":
          category = "alcohol_portions";
          break;
        case "candy":
          category = "candy_portions";
          break;
        case "vegetarian":
          category = "vegetarian_portions";
          break;
        default:
          console.log("Errror");
      }

      const updatedDailyOverview = state.dailyOverview.map((overview) => {
        if (extractDate(new Date(overview.date)) === date) {
          return {
            ...overview,
            [category]: overview[category] + 1,
          };
        }
        return overview;
      });

      return { dailyOverview: updatedDailyOverview };
    });
  },
  decreasePortion: (serving) => {
    set((state) => {
      // const updatedDailyOverview = [...state.dailyOverview];
      const date = extractDate(new Date(serving.date));

      let category:
        | "meat_portions"
        | "vegetarian_portions"
        | "alcohol_portions"
        | "candy_portions";

      switch (serving.category) {
        case "meat":
          category = "meat_portions";
          break;
        case "alcohol":
          category = "alcohol_portions";
          break;
        case "candy":
          category = "candy_portions";
          break;
        case "vegetarian":
          category = "vegetarian_portions";
          break;
        default:
          console.log("Errror");
      }

      const updatedDailyOverview = state.dailyOverview.map((overview) => {
        if (extractDate(new Date(overview.date)) === date) {
          return {
            ...overview,
            [category]: overview[category] + 1,
          };
        }
        return overview;
      });

      return { dailyOverview: updatedDailyOverview };
    });
  },
});

export { dailyOverviewSlice };
