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

export type ServingSize = "small" | "medium" | "large";

export type Timeframe = "week" | "month" | "quarter";

export type ServingCategory = "meat" | "vegetarian" | "candy" | "alcohol";

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
  Timeframe: Timeframe;
  Value: number;
  ChangeRate: number;
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
  Date: string;
  MeatPortions: number;
};

export type DailyOverviewMap = {
  [key: string]: DailyOverview;
};
export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}
