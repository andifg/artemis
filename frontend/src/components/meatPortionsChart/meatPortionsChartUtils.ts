import { getCalendarWeek } from "@/utils/getCalendarWeek";
import { extractDate } from "@/utils/extractDate";
import { meatPortionMap } from "./useMeatPortionChart";

const mapforWeeks = (result: meatPortionMap, startDate: Date) => {
  const currentDayOfWeek = startDate.getDay();

  const mostRecentMonday = new Date(startDate);
  mostRecentMonday.setDate(startDate.getDate() - currentDayOfWeek + 1);

  for (let i = 0; i < 6; i++) {
    const date = new Date(mostRecentMonday);
    date.setDate(mostRecentMonday.getDate() - i * 7);
    result[extractDate(date)] = {
      Timeframe: "week",
      Value: 0,
      TimeframeStart: extractDate(date),
      label: getCalendarWeek(date),
    };
  }
};

const mapforMonths = (result: meatPortionMap, startDate: Date) => {
  const firstDayOfMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    1,
  );

  for (let i = 0; i < 6; i++) {
    const date = new Date(firstDayOfMonth);
    date.setMonth(firstDayOfMonth.getMonth() - i);
    result[extractDate(date)] = {
      Timeframe: "month",
      Value: 0,
      TimeframeStart: extractDate(date),
      label: date.toLocaleString("default", { month: "short" }),
    };
  }
};

const mapforQuarter = (result: meatPortionMap, startDate: Date) => {
  const currentMonth = startDate.getMonth(); // Month index (0-11)
  const currentQuarter = Math.floor(currentMonth / 3) + 1; // Quarter (1-4)

  console.log("Current quarter: ", currentQuarter);

  for (let i = 0; i < 6; i++) {
    const monthsAgo = i * 3;
    const date = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    date.setMonth(currentMonth - monthsAgo);

    const quarter = Math.floor(date.getMonth() / 3) + 1;
    const year = date.getFullYear();

    result[extractDate(date)] = {
      Timeframe: "quarter",
      Value: 0,
      TimeframeStart: extractDate(date),
      label: `Q${quarter} ${year}`, // Label as "Q1 YYYY"
    };
  }
};

export { mapforWeeks, mapforMonths, mapforQuarter };
