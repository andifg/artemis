import { create } from "zustand";
import {
  dailyOverviewSlice,
  DailyOverviewSlice,
} from "../state/dailyOverviewSlice";
import { meatPortionSlice, MeatPortionSlice } from "../state/meatPortionSlice";

const useCentralState = create<DailyOverviewSlice & MeatPortionSlice>()(
  (...a) => ({ ...dailyOverviewSlice(...a), ...meatPortionSlice(...a) }),
);

export { useCentralState };
