import { AggregatedServings } from "@/client/types";

import { StateCreator } from "zustand";

export interface AggregateTimeFramesSlice {
  aggregatedWeeklyServings: AggregatedServings[] | undefined;
  aggregatedMonthlyServings: AggregatedServings[] | undefined;
  aggregatedQuarterlyServings: AggregatedServings[] | undefined;
  setAggregatedServings: (aggregatedServings: AggregatedServings[]) => void;
}

const aggregateTimeframesSlice: StateCreator<AggregateTimeFramesSlice> = (
  set,
) => ({
  aggregatedWeeklyServings: undefined,
  aggregatedMonthlyServings: undefined,
  aggregatedQuarterlyServings: undefined,
  setAggregatedServings: (aggregatedServings) => {
    switch (aggregatedServings[0].timeframe) {
      case "week":
        set({ aggregatedWeeklyServings: aggregatedServings });
        break;
      case "month":
        set({ aggregatedMonthlyServings: aggregatedServings });
        break;
      case "quarter":
        set({ aggregatedQuarterlyServings: aggregatedServings });
        break;
    }
  },
});

export { aggregateTimeframesSlice };
