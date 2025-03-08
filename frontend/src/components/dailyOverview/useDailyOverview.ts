import { useEffect, useState, useContext } from "react";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";
import { useClient } from "@/hooks/useClient";
import { MeatPortionService } from "@/client/MeatPortionService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCentralState } from "@/hooks/useCentralState";
import { MeatPortion } from "@/client/types";

function useDailyOverview() {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const user = getUser();

  const setDailyOverviewMap = useCentralState(
    (state) => state.setDailyOverviewMap,
  );

  const increasePortion = useCentralState((state) => state.increasePortion);

  const decreasePortion = useCentralState((state) => state.decreasePortion);

  const { registerCallback } = useContext(AddMeatPortionContext);
  const { registerDeleteCallback } = useContext(DeleteMeatPortionContext);

  const [loading, setLoading] = useState(true);

  const deleteMeatPortion = (portion: MeatPortion) => {
    console.log("Deleting single meat portion");
    decreasePortion(portion);
  };

  const addMeatPortion = (portion: MeatPortion) => {
    console.log("Adding single meat portion");
    increasePortion(portion);
  };

  useEffect(() => {
    registerCallback(addMeatPortion);
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
