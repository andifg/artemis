import { useClient } from "@/hooks/useClient";
import { useEffect, useState, useContext } from "react";
import { MeatPortionService } from "@/client/MeatPortionService";
import { Timeframe, AggregatedMeatPortions, MeatPortion } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { extractDate } from "@/utils/extractDate";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";
import { useCentralState } from "@/hooks/useCentralState";

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

function useMeatPortionChart(): {
  meatPortionMap: meatPortionMap;
} {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const { registerCallback } = useContext(AddMeatPortionContext);
  const { registerDeleteCallback } = useContext(DeleteMeatPortionContext);
  const { timeFrame } = useCentralState();

  const [meatPortionMap, setMeatPortionMap] = useState<meatPortionMap>(
    getInitialData(timeFrame),
  );

  const fetchAggregatedMeatPortions = () => {
    callClientServiceMethod({
      function: MeatPortionService.GetAggregatedMeatPortions,
      args: [getUser().id, timeFrame],
    }).then((data) => {
      console.log("Meat portion chart data: ", data);
      const initialMap = getInitialData(timeFrame);
      console.log("inital chart data: ", initialMap);
      setMeatPortionMap(updateMap(initialMap, data.data));
    });
  };

  const updateMeatPortions = (_: MeatPortion) => {
    fetchAggregatedMeatPortions();
  };

  const deleteMeatPortion = (_: MeatPortion) => {
    fetchAggregatedMeatPortions();
  };

  useEffect(() => {
    registerCallback(updateMeatPortions);
    registerDeleteCallback(deleteMeatPortion);
  }, []);

  useEffect(() => {
    fetchAggregatedMeatPortions();
  }, [timeFrame]);

  return { meatPortionMap };
}

export { useMeatPortionChart };
