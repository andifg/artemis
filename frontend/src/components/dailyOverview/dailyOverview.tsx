import "./dailyOverview.scss";

import { Day } from "./day";
import { useState, useRef, useEffect } from "react";
import {
  useDailyOverview,
  DailyOverview as DailyOverviewType,
} from "./useDailyOverview";
import { MeatPortion } from "@/client/types";

function DailyOverview() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dailyOverviewRef = useRef<HTMLDivElement>(null);

  const { dailyOverview } = useDailyOverview();

  const changeSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (dailyOverviewRef.current) {
      dailyOverviewRef.current.scrollLeft =
        dailyOverviewRef.current.scrollWidth;
    }
  }, [dailyOverview]);

  const transformHashMaptoArray = (
    dailyOverview: DailyOverviewType,
  ): MeatPortion[] => {
    const meatPortions = [];
    for (const key in dailyOverview) {
      if (dailyOverview[key] !== undefined) {
        meatPortions.push(dailyOverview[key]);
      } else {
        meatPortions.push({ date: key, id: "", user_id: "" });
      }
    }
    meatPortions.reverse();
    return meatPortions;
  };

  return (
    <>
      <div className="daily-overview-wrapper">
        <div>{selectedDate.toDateString()}</div>
        <div className="daily-overview" ref={dailyOverviewRef}>
          <div
            className="daily-overview-slider"
            style={{
              width: `${(100 / 7) * Object.keys(dailyOverview).length}%`,
            }}
          >
            {transformHashMaptoArray(dailyOverview).map((day, _) => {
              return (
                <Day
                  key={day.date + "day"}
                  date={new Date(day.date)}
                  meatConsumed={day.size !== undefined ? true : false}
                  select={changeSelectedDate}
                  selectedDate={selectedDate}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export { DailyOverview };
