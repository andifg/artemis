import "./meatPortionsChart.scss";
import { Timeframe } from "@/client/types";
import { DashboardBox } from "../dashboardBox/DashboardBox";
import { useMeatPortionChart } from "./useMeatPortionChart";
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

type MeatPortionsChartProps = {
  selected: Timeframe;
};

function MeatPortionsChart({ selected }: MeatPortionsChartProps) {
  const { meatPortionMap } = useMeatPortionChart({ selected });

  return (
    <DashboardBox>
      <div className="meat-portions-chart-wrapper">
        <div className="meat-portions-chart-title-wrapper">
          <ChartNoAxesColumn />
          <div className="meat-portions-chart-title-title">
            Total Meat Portions
          </div>
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
