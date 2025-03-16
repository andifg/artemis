import "./averageMeatPortions.scss";
import { DashboardBox } from "../DashboardBox/DashboardBox";
import { TrendingUp } from "lucide-react";
import { useAverageMeatPortions } from "./useAverageMeatPortions";
import { useCentralState } from "@/hooks/useCentralState";
import { AverageMeatPortionsValues } from "./AverageMeatPortionsValues";

import { TimeFrameSelector } from "../TimeframeSelector/TimeFrameSelector";

function AverageMeatPortions() {
  const {
    timeFrame,
    averageMonthlyMeatPortions,
    averageQuarterlyMeatPortions,
    averageWeeklyMeatPortions,
  } = useCentralState();

  useAverageMeatPortions();

  return (
    <DashboardBox>
      <div className="average-meat-portions">
        <div className="average-meat-portions-header">
          <div className="average-meat-portions-header-title">
            <TrendingUp />
            <div className="average-meat-portions-header-title-title">
              Average Weekly Meat Portions
            </div>
          </div>

          <TimeFrameSelector />
        </div>

        <AverageMeatPortionsValues
          averageMeatPortions={
            timeFrame == "week"
              ? averageWeeklyMeatPortions
              : timeFrame == "month"
                ? averageMonthlyMeatPortions
                : averageQuarterlyMeatPortions
          }
        />
      </div>
    </DashboardBox>
  );
}
export { AverageMeatPortions };
