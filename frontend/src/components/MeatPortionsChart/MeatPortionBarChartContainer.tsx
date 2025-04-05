import "./meatPortionsChart.scss";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import {
  Bar,
  Line,
  XAxis,
  LabelList,
  Legend,
  YAxis,
  CartesianGrid,
  ComposedChart,
} from "recharts";
import { DataKey } from "recharts/types/util/types";
import { AggregatedMeatPortions } from "@/client/types";
import { Skeleton } from "../ui/skeleton";
import { ReactNode, useEffect } from "react";

import { LabelProps } from "recharts";
import { SVGProps } from "react";
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
  useEffect(() => {
    console.log("Meat portion chart data: ", data);
  }, [data]);

  const renderCustomizedLabel = (
    props: Omit<SVGProps<SVGTextElement>, "viewBox"> & LabelProps,
  ): ReactNode => {
    const { x, y, width, value } = props;

    if (data == undefined || value == undefined) {
      return y;
    }

    return (
      <>
        {Number(value) > 0 && (
          <g>
            <text
              x={Number(x) + Number(width) / 2}
              y={Number(y) + 8}
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {value}
            </text>
          </g>
        )}
      </>
    );
  };

  return loading && aggregatedMeatPortions == undefined ? (
    <Skeleton className="min-h-[200px] w-full m-2 self-center" />
  ) : (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ComposedChart
        accessibilityLayer
        data={data?.sort((a, b) => a.timeframe.localeCompare(b.timeframe))}
        margin={{ top: 30, left: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis width={25} allowDecimals={false} />
        <Bar
          dataKey="total"
          name="Portions"
          fill="var(--secondary-color)"
          radius={4}
        >
          <LabelList
            dataKey="total"
            position="insideTop"
            content={renderCustomizedLabel}
          />
        </Bar>
        <Line
          name="Meat Portion Target"
          type="monotone"
          dataKey="meat_target"
          stroke="var(--secondary-color)"
          strokeWidth={2}
          dot={false}
        />
        <Legend />
      </ComposedChart>
    </ChartContainer>
  );
};

export { MeatPortionBarChartContainer };
