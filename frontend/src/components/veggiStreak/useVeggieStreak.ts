import { useEffect, useState, useContext } from "react";
import { useClient } from "@/hooks/useClient";
import { MeatPortionService } from "@/client/MeatPortionService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { MeatPortion, Timeframe } from "@/client/types";
import { useCentralState } from "@/hooks/useCentralState";

interface useVeggieStreakReturn {
  loading: boolean;
  streak: number;
}

function useVeggieStreak(): useVeggieStreakReturn {
  const { getUser } = useAuthentication();
  const user = getUser();
  const [callClientServiceMethod] = useClient();

  const { registerAddCallback } = useContext(AddMeatPortionContext);

  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const { setPortions, meatPortions, addPortion } = useCentralState();

  const addMeatPortion = (portion: MeatPortion, _: Timeframe) => {
    addPortion(portion);
  };

  const fetchStreak = () => {
    callClientServiceMethod({
      function: MeatPortionService.GetMeatPortion,
      args: [user.id, 1, 30],
    }).then((response) => {
      setPortions(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    const newestDateString = Object.keys(meatPortions).sort().reverse()[0];

    if (!newestDateString) {
      setStreak(0);
      return;
    }

    console.log("Current data: ", meatPortions);
    const newestDate = new Date(newestDateString);

    const now = new Date();

    newestDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = now.getTime() - newestDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    setStreak(diffDays);
  }, [meatPortions]);

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
