import { StateCreator } from "zustand";

export interface SettingsSlice {
  meatPortionWeeklyTarget: number;
  setMeatPortionWeeklyTarget: (newTarget: number) => void;
}

const settingsSlice: StateCreator<SettingsSlice> = (set) => ({
  meatPortionWeeklyTarget: 2,
  setMeatPortionWeeklyTarget: (newTarget) =>
    set({
      meatPortionWeeklyTarget: newTarget,
    }),
});

export { settingsSlice };
