import { useEffect, useState, useContext } from "react";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";
import { useClient } from "@/hooks/useClient";
import { MeatPortionService } from "@/client/MeatPortionService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCentralState } from "@/hooks/useCentralState";
import { MeatPortion, Timeframe } from "@/client/types";

function useDailyOverview() {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const user = getUser();

  const setDailyOverviewMap = useCentralState(
    (state) => state.setDailyOverviewMap,
  );

  const increasePortion = useCentralState((state) => state.increasePortion);

  const decreasePortion = useCentralState((state) => state.decreasePortion);

  const { registerAddCallback } = useContext(AddMeatPortionContext);
  const { registerDeleteCallback } = useContext(DeleteMeatPortionContext);

  const [loading, setLoading] = useState(true);

  const deleteMeatPortion = (portion: MeatPortion) => {
    decreasePortion(portion);
  };

  const addMeatPortion = (portion: MeatPortion, _: Timeframe) => {
    increasePortion(portion);
  };

  useEffect(() => {
    registerAddCallback(addMeatPortion);
    registerDeleteCallback(deleteMeatPortion);
    callClientServiceMethod({
      function: MeatPortionService.GetDailyOverview,
      args: [user.id],
    }).then((response) => {
      setDailyOverviewMap(response.data);
      setLoading(false);
    });
  }, []);

  return { loading };
}

export { useDailyOverview };
