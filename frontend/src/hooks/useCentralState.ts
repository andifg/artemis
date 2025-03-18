import { create } from "zustand";
import {
  dailyOverviewSlice,
  DailyOverviewSlice,
} from "../state/dailyOverviewSlice";
import {
  AverageTimeFramesSlice,
  averageTimeFrameSlice,
} from "@/state/averageTimeframesSlice";
import { meatPortionSlice, MeatPortionSlice } from "../state/meatPortionSlice";
import {
  aggregateTimeframesSlice,
  AggregateTimeFramesSlice,
} from "@/state/aggregateTimeframesSclice";

const useCentralState = create<
  DailyOverviewSlice &
    MeatPortionSlice &
    AverageTimeFramesSlice &
    AggregateTimeFramesSlice
>()((...a) => ({
  ...dailyOverviewSlice(...a),
  ...meatPortionSlice(...a),
  ...averageTimeFrameSlice(...a),
  ...aggregateTimeframesSlice(...a),
}));

export { useCentralState };
