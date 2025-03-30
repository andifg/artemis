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

import { settingsSlice, SettingsSlice } from "@/state/settingsSlice";

const useCentralState = create<
  DailyOverviewSlice &
    MeatPortionSlice &
    AverageTimeFramesSlice &
    AggregateTimeFramesSlice &
    SettingsSlice
>()((...a) => ({
  ...dailyOverviewSlice(...a),
  ...meatPortionSlice(...a),
  ...averageTimeFrameSlice(...a),
  ...aggregateTimeframesSlice(...a),
  ...settingsSlice(...a),
}));

export { useCentralState };
