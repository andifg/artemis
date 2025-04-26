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
import { AggregatedServings } from "@/client/types";
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

type ServingsBarChartContainerProps<T> = {
  data: CategoricalChartProps["data"];
  dataKey: DataKey<T>;
  loading: boolean;
  aggregatedServings: AggregatedServings[] | undefined;
};

const ServingsBarChartContainer = <T,>({
  data,
  dataKey,
  loading,
  aggregatedServings,
}: ServingsBarChartContainerProps<T>) => {
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
              fontSize={10}
            >
              {value}
            </text>
          </g>
        )}
      </>
    );
  };

  return loading && aggregatedServings == undefined ? (
    <Skeleton className="min-h-[200px] w-full m-2 self-center" />
  ) : (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <ComposedChart
        accessibilityLayer
        data={data?.sort((a, b) => a.timeframe.localeCompare(b.timeframe))}
        margin={{ top: 30, left: 0 }}
        barCategoryGap={"13%"}
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
          dataKey="meat_servings"
          name="Meat Servings"
          fill="var(--secondary-color)"
          radius={4}
        >
          <LabelList
            dataKey="meat_servings"
            position="insideTop"
            content={renderCustomizedLabel}
          />
        </Bar>
        <Bar
          dataKey="vegetarian_servings"
          name="Vegetarian Servings"
          fill="var(--secondary-dark)"
          radius={4}
        >
          <LabelList
            dataKey="vegetarian_servings"
            position="insideTop"
            content={renderCustomizedLabel}
          />
        </Bar>
        <Bar
          dataKey="alcohol_servings"
          name="Alcohol Servings"
          fill="var(--secondary-light)"
          radius={4}
        >
          <LabelList
            dataKey="alcohol_servings"
            position="insideTop"
            content={renderCustomizedLabel}
          />
        </Bar>
        <Bar
          dataKey="candy_servings"
          name="Candy Servings"
          fill="var(--sencodary-darker)"
          radius={4}
        >
          <LabelList
            dataKey="candy_servings"
            position="insideTop"
            content={renderCustomizedLabel}
          />
        </Bar>
        <Line
          name="Meat Serving Target"
          type="monotone"
          dataKey="meat_limit"
          stroke="var(--secondary-color)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          name="Vegetarian Serving Target"
          type="monotone"
          dataKey="vegetarian_limit"
          stroke="var(--secondary-dark)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          name="Alcohol Serving Target"
          type="monotone"
          dataKey="alcohol_limit"
          stroke="var(--secondary-light)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          name="Candy Serving Target"
          type="monotone"
          dataKey="candy_limit"
          stroke="var(--sencodary-darker)"
          strokeWidth={2}
          dot={false}
        />
        <Legend />
      </ComposedChart>
    </ChartContainer>
  );
};

export { ServingsBarChartContainer };
