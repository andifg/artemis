import "./meatPortionsChart.scss";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { Bar, BarChart, XAxis } from "recharts";
import { DataKey } from "recharts/types/util/types";
import { AggregatedMeatPortions } from "@/client/types";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  desktop: {
    label: "Meat Portions",
    color: "#3E721D",
  },
} satisfies ChartConfig;

type MeatPortionBarChartContainerProps<T> = {
  data: CategoricalChartProps["data"];
  dataKey: DataKey<T>;
  loading: boolean;
  aggregatedMeatPortions: AggregatedMeatPortions[] | undefined;
};

const MeatPortionBarChartContainer = <T,>({
  data,
  dataKey,
  loading,
  aggregatedMeatPortions,
}: MeatPortionBarChartContainerProps<T>) => {
  return loading && aggregatedMeatPortions == undefined ? (
    <Skeleton className="min-h-[200px] w-full m-2 self-center" />
  ) : (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <XAxis
          dataKey={dataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="Total"
          name="Total Portions"
          fill="var(--meat-color)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
};

export { MeatPortionBarChartContainer };
