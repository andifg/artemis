import { StateCreator } from "zustand";

export interface SettingsSlice {
  meatPortionWeeklyTarget: number | undefined;
  setMeatPortionWeeklyTarget: (newTarget: number) => void;
}

const settingsSlice: StateCreator<SettingsSlice> = (set) => ({
  meatPortionWeeklyTarget: undefined,
  setMeatPortionWeeklyTarget: (newTarget) =>
    set({
      meatPortionWeeklyTarget: newTarget,
    }),
});

export { settingsSlice };
