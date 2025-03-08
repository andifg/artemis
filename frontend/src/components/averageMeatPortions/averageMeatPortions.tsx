import "./averageMeatPortions.scss";
import React from "react";
import { DashboardBox } from "../DashboardBox/DashboardBox";
import { TrendingUp } from "lucide-react";
import { useAverageMeatPortions } from "./useAverageMeatPortions";
import { Timeframe } from "@/client/types";

// type AverageMeatPortionsTime = "W" | "M" | "6M";

type AverageMeatPortionsProps = {
  selected: Timeframe;
  setSelected: React.Dispatch<React.SetStateAction<Timeframe>>;
};

type TimeFrameMap = {
  [key in Timeframe]: string;
};

function AverageMeatPortions({
  selected,
  setSelected,
}: AverageMeatPortionsProps) {
  const timeFrameMap: TimeFrameMap = {
    week: "W",
    month: "M",
    quarter: "Q",
  };

  const { averageMeatPortions } = useAverageMeatPortions({ selected });

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

          <div className="average-meat-portions-header-selector">
            {Object.entries(timeFrameMap).map(([key, value]) => (
              <div
                key={key}
                className={`average-meat-portions-header-selector-item ${key == selected ? "average-meat-portions-header-selector-item-selected" : ""}`}
                onClick={() => setSelected(key as Timeframe)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>

        <div className="average-meat-portions-value-header">
          <div className="average-meat-portions-value">
            {averageMeatPortions.Value}
          </div>
          <div
            className={`average-meat-portions-diff ${averageMeatPortions.ChangeRate < 0 && "average-meat-portions-diff-negative"} ${averageMeatPortions.ChangeRate == 0 && "average-meat-portions-diff-zero"}`}
          >
            {averageMeatPortions.ChangeRate}%
          </div>
        </div>
      </div>
    </DashboardBox>
  );
}
export { AverageMeatPortions };
