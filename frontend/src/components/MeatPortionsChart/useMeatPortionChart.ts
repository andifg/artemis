import { useClient } from "@/hooks/useClient";
import { useEffect, useState, useContext } from "react";
import { MeatPortionService } from "@/client/MeatPortionService";
import { MeatPortion, Timeframe } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";
import { useCentralState } from "@/hooks/useCentralState";

function useMeatPortionChart(): {
  loading: boolean;
} {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const { registerAddCallback } = useContext(AddMeatPortionContext);
  const { registerDeleteCallback } = useContext(DeleteMeatPortionContext);
  const { timeFrame, setAggregatedMeatPortions } = useCentralState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAggregatedMeatPortions = (timeFrameToFetch: Timeframe) => {
    setLoading(true);
    console.log(
      "2: Fetching aggregated meat portions for timeframe: ",
      timeFrameToFetch,
    );
    callClientServiceMethod({
      function: MeatPortionService.GetAggregatedMeatPortions,
      args: [getUser().id, timeFrameToFetch],
    }).then((data) => {
      console.log("Meat portion chart data: ", data);
      setAggregatedMeatPortions(data.data);
      setLoading(false);
    });
  };

  const updateMeatPortions = (_: MeatPortion, timeFrameToFetch: Timeframe) => {
    console.log("1: Updating meat portions for timeframe: ", timeFrameToFetch);
    fetchAggregatedMeatPortions(timeFrameToFetch);
  };

  const deleteMeatPortion = (_: MeatPortion, timeFrameToFetch: Timeframe) => {
    fetchAggregatedMeatPortions(timeFrameToFetch);
  };

  useEffect(() => {
    registerAddCallback(updateMeatPortions);
    registerDeleteCallback(deleteMeatPortion);
  }, []);

  useEffect(() => {
    fetchAggregatedMeatPortions(timeFrame);
  }, [timeFrame]);

  return { loading };
}

export { useMeatPortionChart };
