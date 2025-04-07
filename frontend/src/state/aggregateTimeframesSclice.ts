import { AggregatedServings } from "@/client/types";

import { StateCreator } from "zustand";

export interface AggregateTimeFramesSlice {
  aggregatedWeeklyMeatPortions: AggregatedServings[] | undefined;
  aggregatedMonthlyMeatPortions: AggregatedServings[] | undefined;
  aggregatedQuarterlyMeatPortions: AggregatedServings[] | undefined;
  setAggregatedServings: (aggregatedMeatPortions: AggregatedServings[]) => void;
}

const aggregateTimeframesSlice: StateCreator<AggregateTimeFramesSlice> = (
  set,
) => ({
  aggregatedWeeklyMeatPortions: undefined,
  aggregatedMonthlyMeatPortions: undefined,
  aggregatedQuarterlyMeatPortions: undefined,
  setAggregatedServings: (aggregatedMeatPortions) => {
    switch (aggregatedMeatPortions[0].timeframe) {
      case "week":
        set({ aggregatedWeeklyMeatPortions: aggregatedMeatPortions });
        break;
      case "month":
        set({ aggregatedMonthlyMeatPortions: aggregatedMeatPortions });
        break;
      case "quarter":
        set({ aggregatedQuarterlyMeatPortions: aggregatedMeatPortions });
        break;
    }
  },
});

export { aggregateTimeframesSlice };
