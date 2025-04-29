import "./averageMeatPortions.scss";
import { DashboardBox } from "../DashboardBox/DashboardBox";
import { TrendingUp } from "lucide-react";
// import { useAverageMeatPortions } from "../AnalyticsWrapper/useAverageMeatPortions";
import { AverageMeatPortionsValues } from "./AverageMeatPortionsValues";

import { TimeFrameSelector } from "../TimeframeSelector/TimeFrameSelector";
import { AverageServings, ServingCategory } from "@/client/types";

type AverageMeatPortionsProps = {
  averageServings: AverageServings;
  servingCategory: ServingCategory;
};

function AverageMeatPortions({
  averageServings,
  servingCategory,
}: AverageMeatPortionsProps) {
  let currentValue: number = 0;
  let lastValue: number = 0;

  switch (servingCategory) {
    case "meat":
      currentValue = averageServings.meat_portions;
      lastValue = averageServings.prev_meat_portions;
      break;
    case "vegetarian":
      currentValue = averageServings.vegetarian_portions;
      lastValue = averageServings.prev_vegetarian_portions;
      break;
    case "alcohol":
      currentValue = averageServings.alcohol_portions;
      lastValue = averageServings.prev_alcohol_portions;
      break;
    case "candy":
      currentValue = averageServings.candy_portions;
      lastValue = averageServings.prev_candy_portions;
      break;
    default:
      currentValue = averageServings.meat_portions;
      lastValue = averageServings.prev_meat_portions;
      break;
  }

  return (
    <DashboardBox>
      <div className="average-meat-portions">
        <div className="average-meat-portions-header">
          <div className="average-meat-portions-header-title">
            <TrendingUp color="var(--secondary-color)" />
            <div className="average-meat-portions-header-title-title">
              Average Weekly {servingCategory.charAt(0).toUpperCase()}
              {servingCategory.slice(1)} Portions
            </div>
          </div>

          <TimeFrameSelector />
        </div>

        <AverageMeatPortionsValues
          currentValue={currentValue}
          lastValue={lastValue}
        />
      </div>
    </DashboardBox>
  );
}
export { AverageMeatPortions };
