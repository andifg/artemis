import { useState } from "react";
import { AverageMeatPortions } from "../AverageMeatPortions/AverageMeatPortions";
import { useAverageMeatPortions } from "./useAverageMeatPortions";
import {
  AverageServings,
  ServingCategory,
  Timeframe,
  servingCategories,
} from "@/client/types";
import { useCentralState } from "@/hooks/useCentralState";
import { CategorySelector } from "../CategorySelector/CategorySelector";
import { ServingsChart } from "../ServingChart/ServingsChart";

const AnalyticsWrapper = () => {
  const { timeFrame, user } = useCentralState();

  const { loading } = useAverageMeatPortions();

  const {
    averageWeeklyServings,
    averageMonthlyServings,
    averageQuarterlyServings,
  } = useCentralState();

  const [categoryActive, setCategoryActive] = useState<
    Map<ServingCategory, boolean>
  >(new Map(servingCategories.map((category) => [category, true])));

  const [allActive, setAllActive] = useState(true);

  const activateAllActive = () => {
    setAllActive(true);
    setCategoryActive((prev) => {
      const newMap = new Map(prev);
      servingCategories.forEach((category) => {
        newMap.set(category, true);
      });
      return newMap;
    });
  };

  const toggleCategory = (category: ServingCategory) => {
    if (allActive) {
      setAllActive(false);
      setCategoryActive((prev) => {
        const newMap = new Map(prev);
        servingCategories.forEach((cat) => {
          newMap.set(cat, false);
        });
        newMap.set(category, true);
        return newMap;
      });
      return;
    }
    setCategoryActive((prev) => {
      const newMap = new Map(prev);
      newMap.set(category, !newMap.get(category));
      return newMap;
    });
  };

  const timeFrameMapper: Record<Timeframe, AverageServings | undefined> = {
    week: averageWeeklyServings,
    month: averageMonthlyServings,
    quarter: averageQuarterlyServings,
  };

  return (
    <>
      <CategorySelector
        categoryActive={categoryActive}
        toggleCategory={toggleCategory}
        allActive={allActive}
        setAllActive={activateAllActive}
      />
      <ServingsChart
        activeCategories={Array.from(user?.category_ranks || [])
          .filter(
            (rank) => rank.active && categoryActive.get(rank.category) === true,
          )
          .map((rank) => rank.category)}
      />
      {loading &&
      timeFrameMapper[timeFrame] == undefined &&
      user == undefined ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        user?.category_ranks
          .filter(
            (rank) => rank.active && categoryActive.get(rank.category) === true,
          )
          .map((rank) => {
            if (!timeFrameMapper[timeFrame]) {
              return null;
            }
            return (
              <AverageMeatPortions
                key={`${rank.user_id}${rank.category}-average`}
                averageServings={timeFrameMapper[timeFrame]}
                servingCategory={rank.category}
              />
            );
          })
      )}
    </>
  );
};

export { AnalyticsWrapper };
