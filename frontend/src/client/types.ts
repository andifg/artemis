export type User = {
  id: string;
  username: string;
  weeklyMeatPortionTarget: number;
  meatPortions: MeatPortion[];
};

export type BodyUpdateUser = {
  id: string;
  weeklyMeatPortionTarget: number;
};

export type MeatPortionSize = "small" | "medium" | "large";

export type BodyCreateMeatPortion = {
  size: MeatPortionSize;
  ID: string;
  date: Date;
  note?: string;
};

export type BodyUpdateMeatPortion = {
  size?: MeatPortionSize;
  date?: Date;
  note?: string;
};

export type MeatPortion = {
  size?: MeatPortionSize;
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

export type Timeframe = "week" | "month" | "quarter";

export type AverageMeatPortions = {
  Timeframe: Timeframe;
  Value: number;
  ChangeRate: number;
};

export type AggregatedMeatPortions = {
  timeframe: Timeframe;
  total: number;
  timeframe_start: string;
  meat_target: number;
};

export type MeatPortionDateList = {
  [key: string]: MeatPortion[];
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
