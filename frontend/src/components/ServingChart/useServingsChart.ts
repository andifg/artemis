import { useClient } from "@/hooks/useClient";
import { useEffect, useState, useContext } from "react";
import { ServingService } from "@/client/ServingService";
import { Serving, Timeframe } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddServingContext } from "@/contexts/addServingContext";
import { DeleteServingContext } from "@/contexts/deleteServingContext";
import { useCentralState } from "@/hooks/useCentralState";

function useServingsChart(): {
  loading: boolean;
} {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const { registerAddCallback } = useContext(AddServingContext);
  const { registerDeleteCallback } = useContext(DeleteServingContext);
  const { timeFrame, setAggregatedServings } = useCentralState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAggregatedServings = (timeFrameToFetch: Timeframe) => {
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

  const updateServings = (_: Serving, timeFrameToFetch: Timeframe) => {
    console.log("1: Updating meat portions for timeframe: ", timeFrameToFetch);
    fetchAggregatedServings(timeFrameToFetch);
  };

  const deleteMeatPortion = (_: Serving, timeFrameToFetch: Timeframe) => {
    fetchAggregatedServings(timeFrameToFetch);
  };

  useEffect(() => {
    registerAddCallback(updateServings);
    registerDeleteCallback(deleteMeatPortion);
  }, []);

  useEffect(() => {
    fetchAggregatedServings(timeFrame);
  }, [timeFrame]);

  return { loading };
}

export { useServingsChart };
