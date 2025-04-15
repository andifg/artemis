import { useEffect, useState, useContext } from "react";
import { useClient } from "@/hooks/useClient";
import { ServingService } from "@/client/ServingService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddServingContext } from "@/contexts/addServingContext";
import { Serving, Timeframe } from "@/client/types";
import { useCentralState } from "@/hooks/useCentralState";

interface useVeggieStreakReturn {
  loading: boolean;
}

function useVeggieStreak(): useVeggieStreakReturn {
  const { getUser } = useAuthentication();
  const user = getUser();
  const [callClientServiceMethod] = useClient();

  const [loading, setLoading] = useState(true);

  const { registerAddCallback } = useContext(AddServingContext);

  const { setServingStreaks } = useCentralState();

  const fetchStreaks = () => {
    callClientServiceMethod({
      function: ServingService.GetServingStreaks,
      args: [user.id],
    }).then((response) => {
      setServingStreaks(response.data);
      setLoading(false);
    });
  };

  const addMeatPortion = (__: Serving, _: Timeframe) => {
    fetchStreaks();
  };

  useEffect(() => {
    registerAddCallback(addMeatPortion);
    fetchStreaks();
  }, []);

  return {
    loading,
  };
}

export { useVeggieStreak };
