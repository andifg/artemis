import { User, ServingCategory, CategoryRank } from "@/client/types";
import { StateCreator } from "zustand";

export interface SettingsSlice {
  user: User | undefined;
  setUser: (user: User) => void;
  setLimit: (category: ServingCategory, target: number) => void;
  setRanks: (ranks: CategoryRank[]) => void;
}

const settingsSlice: StateCreator<SettingsSlice> = (set) => ({
  user: undefined,
  setUser: (user) => {
    set({ user });
  },
  setLimit: (category, target) => {
    set((state) => {
      if (state.user === undefined) {
        console.error("User is undefined, cannot set limit");
        return state;
      }
      const newUser = { ...state.user };
      switch (category) {
        case "meat":
          newUser.weekly_meat_limit = target;
          break;
        case "vegetarian":
          newUser.weekly_vegetarian_limit = target;
          break;
        case "alcohol":
          newUser.weekly_alcohol_limit = target;
          break;
        case "candy":
          newUser.weekly_candy_limit = target;
          break;
      }
      return { user: newUser };
    });
  },
  setRanks: (ranks) => {
    set((state) => {
      if (state.user === undefined) {
        console.error("User is undefined, cannot set ranks");
        return state;
      }
      const newUser = { ...state.user };

      newUser.category_ranks = ranks;

      return { user: newUser };
    });
  },
});

export { settingsSlice };
