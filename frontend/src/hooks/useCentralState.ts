import { create } from "zustand";
import {
  dailyOverviewSlice,
  DailyOverviewSlice,
} from "../state/dailyOverviewSlice";
import {
  AverageTimeFramesSlice,
  averageTimeFrameSlice,
} from "@/state/averageTimeframesSlice";
import { servingSlice, ServingSlice } from "../state/servingSlice";
import {
  aggregateTimeframesSlice,
  AggregateTimeFramesSlice,
} from "@/state/aggregateTimeframesSclice";

import {
  ServingStreakSlice,
  servingStreakSlice,
} from "@/state/servingStreakSlice";

import { settingsSlice, SettingsSlice } from "@/state/settingsSlice";

const useCentralState = create<
  DailyOverviewSlice &
    ServingSlice &
    AverageTimeFramesSlice &
    AggregateTimeFramesSlice &
    SettingsSlice &
    ServingStreakSlice
>()((...a) => ({
  ...dailyOverviewSlice(...a),
  ...servingSlice(...a),
  ...averageTimeFrameSlice(...a),
  ...aggregateTimeframesSlice(...a),
  ...settingsSlice(...a),
  ...servingStreakSlice(...a),
}));

export { useCentralState };
