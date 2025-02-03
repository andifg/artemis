import { useClient } from "@/hooks/useClient";
import { useEffect, useState, useContext } from "react";
import { MeatPortionService } from "@/client/meatPortionService";
import { Timeframe, AggregatedMeatPortions, MeatPortion } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { extractDate } from "@/utils/extractDate";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";

import {
  mapforWeeks,
  mapforMonths,
  mapforQuarter,
} from "./meatPortionsChartUtils";

export type AggreagteMeatPortions = {
  Timeframe: Timeframe;
  Value: number;
  TimeframeStart: string;
  label: string;
};

export type meatPortionMap = {
  [key in string]: AggreagteMeatPortions;
};

const getInitialData = (timeframe: Timeframe): meatPortionMap => {
  const result: meatPortionMap = {};
  const today = new Date();

  if (timeframe === "week") {
    mapforWeeks(result, today);
  }

  if (timeframe == "month") {
    mapforMonths(result, today);
  }

  if (timeframe === "quarter") {
    mapforQuarter(result, today);
  }

  return result;
};

const updateMap = (map: meatPortionMap, data: AggregatedMeatPortions[]) => {
  data.forEach((item) => {
    if (map[extractDate(new Date(item.TimeframeStart))]) {
      map[extractDate(new Date(item.TimeframeStart))].Value = item.Total;
    }
  });

  return map;
};

type useMeatPortionChartProps = {
  selected: Timeframe;
};

function useMeatPortionChart({ selected }: useMeatPortionChartProps): {
  meatPortionMap: meatPortionMap;
} {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const { registerCallback } = useContext(AddMeatPortionContext);

  const [meatPortionMap, setMeatPortionMap] = useState<meatPortionMap>(
    getInitialData(selected),
  );

  const fetchAggregatedMeatPortions = () => {
    callClientServiceMethod({
      function: MeatPortionService.GetAggregatedMeatPortions,
      args: [getUser().id, selected],
    }).then((data) => {
      console.log("Meat portion chart data: ", data);
      const initialMap = getInitialData(selected);
      console.log("inital chart data: ", initialMap);
      setMeatPortionMap(updateMap(initialMap, data.data));
    });
  };

  const updateMeatPortions = (_: MeatPortion) => {
    fetchAggregatedMeatPortions();
  };

  useEffect(() => {
    registerCallback(updateMeatPortions);
  }, []);

  useEffect(() => {
    fetchAggregatedMeatPortions();
  }, [selected]);

  return { meatPortionMap };
}

export { useMeatPortionChart };
