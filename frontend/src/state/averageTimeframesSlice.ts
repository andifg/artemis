import { AverageServings, Timeframe } from "@/client/types";
import { StateCreator } from "zustand";

export interface AverageTimeFramesSlice {
  timeFrame: Timeframe;
  setTimeFrame: (timeFrame: Timeframe) => void;
  averageWeeklyMeatPortions: AverageServings | undefined;
  averageMonthlyMeatPortions: AverageServings | undefined;
  averageQuarterlyMeatPortions: AverageServings | undefined;
  setAverageServings: (averageMeatPortions: AverageServings) => void;
}

const averageTimeFrameSlice: StateCreator<AverageTimeFramesSlice> = (set) => ({
  timeFrame: "week",
  setTimeFrame: (timeFrame) => set({ timeFrame }),
  averageWeeklyMeatPortions: undefined,
  averageMonthlyMeatPortions: undefined,
  averageQuarterlyMeatPortions: undefined,
  setAverageServings: (averageMeatPortions) => {
    switch (averageMeatPortions.Timeframe) {
      case "week":
        set({ averageWeeklyMeatPortions: averageMeatPortions });
        break;
      case "month":
        set({ averageMonthlyMeatPortions: averageMeatPortions });
        break;
      case "quarter":
        set({ averageQuarterlyMeatPortions: averageMeatPortions });
        break;
    }
  },
});

export { averageTimeFrameSlice };
