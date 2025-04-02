import { AggregatedMeatPortions } from "@/client/types";

import { StateCreator } from "zustand";

export interface AggregateTimeFramesSlice {
  aggregatedWeeklyMeatPortions: AggregatedMeatPortions[] | undefined;
  aggregatedMonthlyMeatPortions: AggregatedMeatPortions[] | undefined;
  aggregatedQuarterlyMeatPortions: AggregatedMeatPortions[] | undefined;
  setAggregatedMeatPortions: (
    aggregatedMeatPortions: AggregatedMeatPortions[],
  ) => void;
}

const aggregateTimeframesSlice: StateCreator<AggregateTimeFramesSlice> = (
  set,
) => ({
  aggregatedWeeklyMeatPortions: undefined,
  aggregatedMonthlyMeatPortions: undefined,
  aggregatedQuarterlyMeatPortions: undefined,
  setAggregatedMeatPortions: (aggregatedMeatPortions) => {
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
