import { AverageServings, Timeframe } from "@/client/types";
import { StateCreator } from "zustand";

export interface AverageTimeFramesSlice {
  timeFrame: Timeframe;
  setTimeFrame: (timeFrame: Timeframe) => void;
  averageWeeklyServings: AverageServings | undefined;
  averageMonthlyServings: AverageServings | undefined;
  averageQuarterlyServings: AverageServings | undefined;
  setAverageServings: (averageServings: AverageServings) => void;
}

const averageTimeFrameSlice: StateCreator<AverageTimeFramesSlice> = (set) => ({
  timeFrame: "week",
  setTimeFrame: (timeFrame) => set({ timeFrame }),
  averageWeeklyServings: undefined,
  averageMonthlyServings: undefined,
  averageQuarterlyServings: undefined,
  setAverageServings: (averageServings) => {
    switch (averageServings.timeframe) {
      case "week":
        console.log("Setting weekly servings");
        set({ averageWeeklyServings: averageServings });
        break;
      case "month":
        set({ averageMonthlyServings: averageServings });
        break;
      case "quarter":
        set({ averageQuarterlyServings: averageServings });
        break;
    }
  },
});

export { averageTimeFrameSlice };
