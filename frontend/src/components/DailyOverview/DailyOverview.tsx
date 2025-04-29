import "./dailyOverview.scss";

import { Day } from "./Day";
import { useRef, useEffect } from "react";
import { useDailyOverview } from "./useDailyOverview";

import { useCentralState } from "@/hooks/useCentralState";

function DailyOverview() {
  const dailyOverviewRef = useRef<HTMLDivElement>(null);

  const { dailyOverview, selectedDate } = useCentralState();
  const { loading } = useDailyOverview();

  useEffect(() => {
    if (dailyOverviewRef.current) {
      dailyOverviewRef.current.scrollLeft =
        dailyOverviewRef.current.scrollWidth;
    }
  }, [dailyOverview]);

  return (
    <>
      <div className="daily-overview-wrapper">
        <div>{selectedDate.toDateString()}</div>
        <div className="daily-overview" ref={dailyOverviewRef}>
          {(!loading || dailyOverview.length != 0) && (
            <div
              className="daily-overview-slider"
              style={{
                minWidth: `${(100 / 7) * dailyOverview.length}%`,
              }}
            >
              {dailyOverview
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime(),
                )
                .map((key) => {
                  return <Day key={key.date + "day"} dayOverview={key} />;
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { DailyOverview };
