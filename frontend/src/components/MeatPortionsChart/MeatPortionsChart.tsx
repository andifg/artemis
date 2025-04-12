import "./meatPortionsChart.scss";
import { DashboardBox } from "../DashboardBox/DashboardBox";
import { useMeatPortionChart } from "./useMeatPortionChart";
import { TimeFrameSelector } from "../TimeframeSelector/TimeFrameSelector";
import { MeatPortionBarChartContainer } from "./MeatPortionBarChartContainer";
import { ChartNoAxesColumn } from "lucide-react";
import { useCentralState } from "@/hooks/useCentralState";
import { useEffect } from "react";
import { getCalendarWeek } from "@/utils/getCalendarWeek";
import { AggregatedServings } from "@/client/types";

function MeatPortionsChart() {
  const { loading } = useMeatPortionChart();
  const {
    aggregatedWeeklyMeatPortions,
    aggregatedMonthlyMeatPortions,
    aggregatedQuarterlyMeatPortions,
    timeFrame,
  } = useCentralState();

  const getDataAndKey = (timeFrame: string) => {
    switch (timeFrame) {
      case "week":
        return {
          data: aggregatedWeeklyMeatPortions,
          dataKey: (entry: AggregatedServings) => {
            const date = new Date(entry.timeframe_start);
            return `W${getCalendarWeek(date)}`;
          },
        };
      case "month":
        return {
          data: aggregatedMonthlyMeatPortions,
          dataKey: (entry: AggregatedServings) => {
            const date = new Date(entry.timeframe_start);
            return `${date.toLocaleString("default", { month: "short" })}`;
          },
        };
      case "quarter":
        return {
          data: aggregatedQuarterlyMeatPortions,
          dataKey: (entry: AggregatedServings) => {
            const date = new Date(entry.timeframe_start);
            return `Q${Math.ceil((date.getMonth() + 1) / 3)}`;
          },
        };
      default:
        return { data: [], dataKey: () => "" }; // Default case
    }
  };

  const { data, dataKey } = getDataAndKey(timeFrame);

  const sortedData =
    data?.sort((a, b) => a.timeframe_start.localeCompare(b.timeframe_start)) ||
    [];

  useEffect(() => {
    console.log(
      "Aggregated weekly meat portions: ",
      aggregatedWeeklyMeatPortions,
    );
  }, [aggregatedWeeklyMeatPortions]);

  return (
    <DashboardBox>
      <div className="meat-portions-chart-wrapper">
        <div className="meat-portions-chart-title">
          <div className="meat-portions-chart-title-left">
            <ChartNoAxesColumn color="var(--secondary-color)" />
            <div className="meat-portions-chart-title-title">
              Total Meat Portions
            </div>
          </div>
          <TimeFrameSelector />
        </div>
        <MeatPortionBarChartContainer<AggregatedServings>
          data={sortedData}
          dataKey={dataKey}
          loading={loading}
          aggregatedMeatPortions={data}
        />
      </div>
    </DashboardBox>
  );
}

export { MeatPortionsChart };
