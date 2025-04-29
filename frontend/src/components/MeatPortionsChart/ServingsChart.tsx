import "./servingsChart.scss";
import { DashboardBox } from "../DashboardBox/DashboardBox";
import { useServingsChart } from "./useServingsChart";
import { TimeFrameSelector } from "../TimeframeSelector/TimeFrameSelector";
import { ServingsBarChartContainer } from "./ServingsBarChartContainer";
import { ChartNoAxesColumn } from "lucide-react";
import { useCentralState } from "@/hooks/useCentralState";
import { getCalendarWeek } from "@/utils/getCalendarWeek";
import { AggregatedServings, ServingCategory } from "@/client/types";

function ServingsChart({
  activeCategories,
}: {
  activeCategories: ServingCategory[];
}) {
  const { loading } = useServingsChart();
  const {
    aggregatedWeeklyServings,
    aggregatedMonthlyServings,
    aggregatedQuarterlyServings,
    timeFrame,
  } = useCentralState();

  const getDataAndKey = (timeFrame: string) => {
    switch (timeFrame) {
      case "week":
        return {
          data: aggregatedWeeklyServings,
          dataKey: (entry: AggregatedServings) => {
            const date = new Date(entry.timeframe_start);
            return `W${getCalendarWeek(date)}`;
          },
        };
      case "month":
        return {
          data: aggregatedMonthlyServings,
          dataKey: (entry: AggregatedServings) => {
            const date = new Date(entry.timeframe_start);
            return `${date.toLocaleString("default", { month: "short" })}`;
          },
        };
      case "quarter":
        return {
          data: aggregatedQuarterlyServings,
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

  return (
    <DashboardBox>
      <div className="servings-chart-wrapper">
        <div className="servings-chart-title">
          <div className="servings-chart-title-left">
            <ChartNoAxesColumn color="var(--secondary-color)" />
            <div className="servings-chart-title-title">Total Servings</div>
          </div>
          <TimeFrameSelector />
        </div>
        <ServingsBarChartContainer<AggregatedServings>
          data={sortedData}
          dataKey={dataKey}
          loading={loading}
          aggregatedServings={data}
          activeCategories={activeCategories}
        />
      </div>
    </DashboardBox>
  );
}

export { ServingsChart };
