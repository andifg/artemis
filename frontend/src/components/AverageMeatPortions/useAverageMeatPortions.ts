import { useClient } from "@/hooks/useClient";
import { useEffect, useState, useContext } from "react";
import { ServingService } from "@/client/ServingService";
import { Serving, Timeframe } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddServingContext } from "@/contexts/addServingContext";
import { DeleteServingContext } from "@/contexts/deleteServingContext";
import { useCentralState } from "@/hooks/useCentralState";

type useAverageMeatPortionsReturn = {
  loading: boolean;
};

function useAverageMeatPortions(): useAverageMeatPortionsReturn {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const { registerAddCallback } = useContext(AddServingContext);
  const { registerDeleteCallback } = useContext(DeleteServingContext);
  const { timeFrame, setAverageServings } = useCentralState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAverageMeatPortions = (timeFrameToCatch: Timeframe) => {
    setLoading(true);
    callClientServiceMethod({
      function: ServingService.GetAverageServings,
      args: [getUser().id, timeFrameToCatch],
    }).then((data) => {
      console.log("data average", data.data);
      setAverageServings({
        Timeframe: data.data.Timeframe,
        Value: data.data.Value,
        ChangeRate: data.data.ChangeRate,
      });
      setLoading(false);
    });
  };

  const updateAverageMeatPortions = (
    _: Serving,
    timeFrameToCatch: Timeframe,
  ) => {
    fetchAverageMeatPortions(timeFrameToCatch);
  };

  const deleteMeatPortion = (_: Serving, timeFrameToCatch: Timeframe) => {
    fetchAverageMeatPortions(timeFrameToCatch);
  };

  useEffect(() => {
    registerAddCallback(updateAverageMeatPortions);
    registerDeleteCallback(deleteMeatPortion);
  }, []);

  useEffect(() => {
    fetchAverageMeatPortions(timeFrame);
  }, [timeFrame]);

  return {
    loading,
  };
}

export { useAverageMeatPortions };
