import { useClient } from "@/hooks/useClient";
import { useEffect, useState, useContext } from "react";
import { MeatPortionService } from "@/client/MeatPortionService";
import { MeatPortion } from "@/client/types";
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
  const { registerCallback } = useContext(AddMeatPortionContext);
  const { registerDeleteCallback } = useContext(DeleteMeatPortionContext);
  const { timeFrame, setAverageMeatPortions } = useCentralState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAverageMeatPortions = () => {
    setLoading(true);
    callClientServiceMethod({
      function: MeatPortionService.GetAverageMeatPortions,
      args: [getUser().id, timeFrame],
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

  const updateAverageMeatPortions = (_: MeatPortion) => {
    fetchAverageMeatPortions();
  };

  const deleteMeatPortion = (_: MeatPortion) => {
    fetchAverageMeatPortions();
  };

  useEffect(() => {
    registerCallback(updateAverageMeatPortions);
    registerDeleteCallback(deleteMeatPortion);
  }, []);

  useEffect(() => {
    fetchAverageMeatPortions();
  }, [timeFrame]);

  return {
    loading,
  };
}

export { useAverageMeatPortions };
