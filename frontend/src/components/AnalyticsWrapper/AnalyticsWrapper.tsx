import { useEffect } from "react";
import { AverageMeatPortions } from "../AverageMeatPortions/AverageMeatPortions";
import { useAverageMeatPortions } from "./useAverageMeatPortions";
import { AverageServings, ServingCategory, Timeframe } from "@/client/types";
import { useCentralState } from "@/hooks/useCentralState";

const servingCategoriesPriorities: Record<number, ServingCategory> = {
  1: "meat",
  2: "vegetarian",
  3: "alcohol",
  4: "candy",
};

const AnalyticsWrapper = () => {
  const { timeFrame } = useCentralState();

  const { loading } = useAverageMeatPortions();

  const {
    averageWeeklyServings,
    averageMonthlyServings,
    averageQuarterlyServings,
  } = useCentralState();

  const emtpyAverageServings: AverageServings = {
    timeframe: timeFrame,
    timeframe_start: "",
    meat_portions: 0,
    vegetarian_portions: 0,
    alcohol_portions: 0,
    candy_portions: 0,
    prev_meat_portions: 0,
    prev_vegetarian_portions: 0,
    prev_alcohol_portions: 0,
    prev_candy_portions: 0,
  };

  const timeFrameMapper: Record<Timeframe, AverageServings | undefined> = {
    week: averageWeeklyServings,
    month: averageMonthlyServings,
    quarter: averageQuarterlyServings,
  };

  useEffect(() => {
    console.log("Week overview: ", averageWeeklyServings);
  }, [averageWeeklyServings]);

  return (
    <>
      {loading && timeFrameMapper[timeFrame] == undefined ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        Object.entries(servingCategoriesPriorities).map(([key, category]) => {
          return (
            <AverageMeatPortions
              key={key}
              averageServings={
                timeFrameMapper[timeFrame] || emtpyAverageServings
              }
              servingCategory={category}
            />
          );
        })
      )}
    </>
  );
};

export { AnalyticsWrapper };
