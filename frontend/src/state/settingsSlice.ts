import { User, ServingCategory } from "@/client/types";
import { StateCreator } from "zustand";

export interface SettingsSlice {
  user: User;
  setUser: (user: User) => void;
  setLimit: (category: ServingCategory, target: number) => void;
}

const settingsSlice: StateCreator<SettingsSlice> = (set) => ({
  user: {
    id: "",
    username: "",
    weekly_meat_limit: 0,
    weekly_vegetarian_limit: 0,
    weekly_alcohol_limit: 0,
    weekly_candy_limit: 0,
    servings: [],
  },
  setUser: (user) => {
    set({ user });
  },
  setLimit: (category, target) => {
    set((state) => {
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
});

export { settingsSlice };
