import { useClient } from "@/hooks/useClient";
import { useEffect, useState, useContext } from "react";
import { MeatPortionService } from "@/client/MeatPortionService";
import { MeatPortion } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";
import { useCentralState } from "@/hooks/useCentralState";

function useMeatPortionChart(): {
  loading: boolean;
} {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const { registerCallback } = useContext(AddMeatPortionContext);
  const { registerDeleteCallback } = useContext(DeleteMeatPortionContext);
  const { timeFrame, setAggregatedMeatPortions } = useCentralState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAggregatedMeatPortions = () => {
    setLoading(true);
    callClientServiceMethod({
      function: MeatPortionService.GetAggregatedMeatPortions,
      args: [getUser().id, timeFrame],
    }).then((data) => {
      console.log("Meat portion chart data: ", data);
      setAggregatedMeatPortions(data.data);
      setLoading(false);
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

  return { loading };
}

export { useMeatPortionChart };
