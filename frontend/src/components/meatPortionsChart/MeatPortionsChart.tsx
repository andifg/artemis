import "./meatPortionsChart.scss";
import { DashboardBox } from "../DashboardBox/DashboardBox";
import { useMeatPortionChart } from "./useMeatPortionChart";
import { TimeFrameSelector } from "../TimeframeSelector/TimeFrameSelector";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, XAxis } from "recharts";
import { ChartNoAxesColumn } from "lucide-react";

const chartConfig = {
  desktop: {
    label: "Meat Portions",
    color: "#3E721D",
  },
} satisfies ChartConfig;

function MeatPortionsChart() {
  const { meatPortionMap } = useMeatPortionChart();

  return (
    <DashboardBox>
      <div className="meat-portions-chart-wrapper">
        <div className="meat-portions-chart-title">
          <div className="meat-portions-chart-title-left">
            <ChartNoAxesColumn />
            <div className="meat-portions-chart-title-title">
              Total Meat Portions
            </div>
          </div>
          <TimeFrameSelector />
        </div>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={Object.values(meatPortionMap).reverse()}
          >
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="Value"
              name="Total Portions"
              fill="var(--meat-color)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </DashboardBox>
  );
}

export { MeatPortionsChart };
