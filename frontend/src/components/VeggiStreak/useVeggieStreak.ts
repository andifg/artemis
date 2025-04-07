import { useEffect, useState, useContext } from "react";
import { useClient } from "@/hooks/useClient";
import { ServingService } from "@/client/ServingService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddServingContext } from "@/contexts/addServingContext";
import { Serving, Timeframe } from "@/client/types";
import { useCentralState } from "@/hooks/useCentralState";

interface useVeggieStreakReturn {
  loading: boolean;
  streak: number;
}

function useVeggieStreak(): useVeggieStreakReturn {
  const { getUser } = useAuthentication();
  const user = getUser();
  const [callClientServiceMethod] = useClient();

  const { registerAddCallback } = useContext(AddServingContext);

  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const { setServings, servings, addServing } = useCentralState();

  const addMeatPortion = (portion: Serving, _: Timeframe) => {
    addServing(portion);
  };

  const fetchStreak = () => {
    callClientServiceMethod({
      function: ServingService.GetServings,
      args: [user.id, 1, 30],
    }).then((response) => {
      setServings(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    const newestDateString = Object.keys(servings).sort().reverse()[0];

    if (!newestDateString) {
      setStreak(0);
      return;
    }

    console.log("Current data: ", servings);
    const newestDate = new Date(newestDateString);

    const now = new Date();

    newestDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = now.getTime() - newestDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    setStreak(diffDays);
  }, [servings]);

  useEffect(() => {
    registerAddCallback(addMeatPortion);
    fetchStreak();
  }, []);

  return {
    loading,
    streak,
  };
}

export { useVeggieStreak };
