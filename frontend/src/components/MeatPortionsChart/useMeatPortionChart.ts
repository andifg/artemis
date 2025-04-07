import { useClient } from "@/hooks/useClient";
import { useEffect, useState, useContext } from "react";
import { ServingService } from "@/client/ServingService";
import { Serving, Timeframe } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddServingContext } from "@/contexts/addServingContext";
import { DeleteServingContext } from "@/contexts/deleteServingContext";
import { useCentralState } from "@/hooks/useCentralState";

function useMeatPortionChart(): {
  loading: boolean;
} {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const { registerAddCallback } = useContext(AddServingContext);
  const { registerDeleteCallback } = useContext(DeleteServingContext);
  const { timeFrame, setAggregatedServings } = useCentralState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAggregatedMeatPortions = (timeFrameToFetch: Timeframe) => {
    setLoading(true);
    console.log(
      "2: Fetching aggregated meat portions for timeframe: ",
      timeFrameToFetch,
    );
    callClientServiceMethod({
      function: ServingService.GetAggregatedServings,
      args: [getUser().id, timeFrameToFetch],
    }).then((data) => {
      console.log("Meat portion chart data: ", data);
      setAggregatedServings(data.data);
      setLoading(false);
    });
  };

  const updateMeatPortions = (_: Serving, timeFrameToFetch: Timeframe) => {
    console.log("1: Updating meat portions for timeframe: ", timeFrameToFetch);
    fetchAggregatedMeatPortions(timeFrameToFetch);
  };

  const deleteMeatPortion = (_: Serving, timeFrameToFetch: Timeframe) => {
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
