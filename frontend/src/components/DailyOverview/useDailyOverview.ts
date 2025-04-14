import { useEffect, useState, useContext } from "react";
import { AddServingContext } from "@/contexts/addServingContext";
import { DeleteServingContext } from "@/contexts/deleteServingContext";
import { useClient } from "@/hooks/useClient";
import { ServingService } from "@/client/ServingService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCentralState } from "@/hooks/useCentralState";
import { Serving, Timeframe } from "@/client/types";

function useDailyOverview() {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const user = getUser();

  const setDailyOverview = useCentralState((state) => state.setDailyOverview);

  const increasePortion = useCentralState((state) => state.increasePortion);

  const decreasePortion = useCentralState((state) => state.decreasePortion);

  const { registerAddCallback } = useContext(AddServingContext);
  const { registerDeleteCallback } = useContext(DeleteServingContext);

  const [loading, setLoading] = useState(true);

  const deleteServing = (portion: Serving) => {
    decreasePortion(portion);
  };

  const addServing = (portion: Serving, _: Timeframe) => {
    increasePortion(portion);
  };

  useEffect(() => {
    registerAddCallback(addServing);
    registerDeleteCallback(deleteServing);
    callClientServiceMethod({
      function: ServingService.GetDailyOverview,
      args: [user.id],
    }).then((response) => {
      console.log("Daily overview: ", response.data);
      setDailyOverview(response.data);
      setLoading(false);
    });
  }, []);

  return { loading };
}

export { useDailyOverview };
