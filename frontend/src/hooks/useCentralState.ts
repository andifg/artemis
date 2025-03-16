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

const useCentralState = create<
  DailyOverviewSlice & MeatPortionSlice & AverageTimeFramesSlice
>()((...a) => ({
  ...dailyOverviewSlice(...a),
  ...meatPortionSlice(...a),
  ...averageTimeFrameSlice(...a),
}));

export { useCentralState };
