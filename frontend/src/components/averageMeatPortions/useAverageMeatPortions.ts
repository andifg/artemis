import { useClient } from "@/hooks/useClient";
import { useEffect, useState, useContext } from "react";
import { MeatPortionService } from "@/client/MeatPortionService";
import { MeatPortion, Timeframe } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";
import { useCentralState } from "@/hooks/useCentralState";

type useAverageMeatPortionsReturn = {
  loading: boolean;
};

function useAverageMeatPortions(): useAverageMeatPortionsReturn {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const { registerAddCallback } = useContext(AddMeatPortionContext);
  const { registerDeleteCallback } = useContext(DeleteMeatPortionContext);
  const { timeFrame, setAverageMeatPortions } = useCentralState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAverageMeatPortions = (timeFrameToCatch: Timeframe) => {
    setLoading(true);
    callClientServiceMethod({
      function: MeatPortionService.GetAverageMeatPortions,
      args: [getUser().id, timeFrameToCatch],
    }).then((data) => {
      console.log("data average", data.data);
      setAverageMeatPortions({
        Timeframe: data.data.Timeframe,
        Value: data.data.Value,
        ChangeRate: data.data.ChangeRate,
      });
      setLoading(false);
    });
  };

  const updateAverageMeatPortions = (
    _: MeatPortion,
    timeFrameToCatch: Timeframe,
  ) => {
    fetchAverageMeatPortions(timeFrameToCatch);
  };

  const deleteMeatPortion = (_: MeatPortion, timeFrameToCatch: Timeframe) => {
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
