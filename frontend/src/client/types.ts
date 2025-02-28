export type MeatPortionSize = "small" | "medium" | "large";

export type BodyCreateMeatPortion = {
  size: MeatPortionSize;
  ID: string;
  date: Date;
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
  Timeframe: Timeframe;
  Total: number;
  TimeframeStart: string;
  CalendarWeek?: number;
};

export type MeatPortionDateList = {
  [key: string]: MeatPortion[];
};

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}
