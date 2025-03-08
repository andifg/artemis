import "./dailyOverview.scss";

import { Day } from "./Day";
import { useState, useRef, useEffect } from "react";
import { useDailyOverview } from "./useDailyOverview";

import { useCentralState } from "@/hooks/useCentralState";

function DailyOverview() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dailyOverviewRef = useRef<HTMLDivElement>(null);

  const dailyOverviewMap = useCentralState((state) => state.dailyOverviewMap);

  const { loading } = useDailyOverview();

  const changeSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (dailyOverviewRef.current) {
      dailyOverviewRef.current.scrollLeft =
        dailyOverviewRef.current.scrollWidth;
    }
  }, [dailyOverviewMap]);

  return (
    <>
      <div className="daily-overview-wrapper">
        <div>{selectedDate.toDateString()}</div>
        <div className="daily-overview" ref={dailyOverviewRef}>
          {(!loading || Object.keys(dailyOverviewMap).length != 0) && (
            <div
              className="daily-overview-slider"
              style={{
                minWidth: `${(100 / 7) * Object.keys(dailyOverviewMap).length}%`,
              }}
            >
              {Object.keys(dailyOverviewMap).map((key) => {
                return (
                  <Day
                    key={key + "day"}
                    date={new Date(dailyOverviewMap[key].Date)}
                    meatConsumed={
                      dailyOverviewMap[key].MeatPortions > 0 ? true : false
                    }
                    select={changeSelectedDate}
                    selectedDate={selectedDate}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { DailyOverview };
