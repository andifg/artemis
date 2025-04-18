export type User = {
  id: string;
  username: string;
  weeklyMeatPortionTarget: number;
  servings: Serving[];
};

export type BodyUpdateUser = {
  id: string;
  weeklyMeatPortionTarget: number;
};

export const servingSizes = ["small", "medium", "large"] as const;

export const servingCategories = [
  "meat",
  "vegetarian",
  "candy",
  "alcohol",
] as const;

export const timeFramews = ["week", "month", "quarter"] as const;

export type ServingSize = (typeof servingSizes)[number];
export type Timeframe = (typeof timeFramews)[number];
export type ServingCategory = (typeof servingCategories)[number];

export type BodyCreateServing = {
  size: ServingSize;
  category: ServingCategory;
  ID: string;
  date: Date;
  note?: string;
};

export type BodyUpdateServing = {
  size: ServingSize;
  category: ServingCategory;
  date: Date;
  note?: string;
};

export type Serving = {
  size: ServingSize;
  category: ServingCategory;
  id: string;
  user_id: string;
  date: string;
  note?: string;
};

export type APIResponse<T> = {
  responseKey: string;
  responseMessage: string;
  data: T;
};

export type AverageServings = {
  timeframe: Timeframe;
  timeframe_start: string;
  meat_portions: number;
  vegetarian_portions: number;
  alcohol_portions: number;
  candy_portions: number;
  prev_meat_portions: number;
  prev_vegetarian_portions: number;
  prev_alcohol_portions: number;
  prev_candy_portions: number;
};

export type AggregatedServings = {
  timeframe: Timeframe;
  total: number;
  timeframe_start: string;
  meat_target: number;
};

export type ServingDateList = {
  [key: string]: Serving[];
};

export type DailyOverview = {
  date: string;
  meat_portions: number;
  vegetarian_portions: number;
  alcohol_portions: number;
  candy_portions: number;
};

export type ServingStreak = {
  serving_category: ServingCategory;
  streak: number;
};

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}
