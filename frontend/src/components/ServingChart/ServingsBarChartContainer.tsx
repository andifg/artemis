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
import { AggregatedServings, ServingCategory } from "@/client/types";
import { Skeleton } from "../ui/skeleton";
import { ReactNode } from "react";

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
  activeCategories: ServingCategory[];
};

const ServingsBarChartContainer = <T,>({
  data,
  dataKey,
  loading,
  aggregatedServings,
  activeCategories,
}: ServingsBarChartContainerProps<T>) => {
  type ChartSetting = {
    color: string;
    label: string;
    targetLabel: string;
    data: string;
    limitData: string;
  };

  const chartMap: Record<ServingCategory, ChartSetting> = {
    meat: {
      color: "var(--chart-color-1)",
      label: "Meat Servings",
      targetLabel: "Meat Limit",
      data: "meat_servings",
      limitData: "meat_limit",
    },
    vegetarian: {
      color: "var(--chart-color-2)",
      label: "Vegetarian Servings",
      targetLabel: "Vegetarian Limit",
      data: "vegetarian_servings",
      limitData: "vegetarian_limit",
    },
    alcohol: {
      color: "var(--chart-color-3)",
      label: "Alcohol Servings",
      targetLabel: "Alcohol Limit",
      data: "alcohol_servings",
      limitData: "alcohol_limit",
    },
    candy: {
      color: "var(--chart-color-4)",
      label: "Candy Servings",
      targetLabel: "Candy Limit",
      data: "candy_servings",
      limitData: "candy_limit",
    },
  };

  const renderCustomizedLabel = (
    props: Omit<SVGProps<SVGTextElement>, "viewBox"> & LabelProps,
  ): ReactNode => {
    const { x, y, width, value } = props;

    if (data == undefined || value == undefined) {
      console.log("Data is undefined");
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
        {activeCategories.map((category) => (
          <Bar
            key={`${category}-bar`}
            dataKey={chartMap[category].data}
            name={chartMap[category].label}
            fill={chartMap[category].color}
            radius={4}
          >
            <LabelList
              dataKey={chartMap[category].data}
              position="insideTop"
              content={renderCustomizedLabel}
            />
          </Bar>
        ))}
        {activeCategories.map((category) => (
          <Line
            key={`${category}-line`}
            name={chartMap[category].targetLabel}
            type="monotone"
            dataKey={chartMap[category].limitData}
            stroke={chartMap[category].color}
            strokeWidth={2}
            dot={false}
          />
        ))}

        <Legend />
      </ComposedChart>
    </ChartContainer>
  );
};

export { ServingsBarChartContainer };
