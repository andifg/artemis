import { useEffect, useState, useContext } from "react";
import { useClient } from "@/hooks/useClient";
import { MeatPortionService } from "@/client/meatPortionService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { MeatPortion } from "@/client/types";

function useVeggieStreak() {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();

  const { registerCallback } = useContext(AddMeatPortionContext);

  const [streak, setStreak] = useState<number>(0);

  const fetchStreak = () => {
    callClientServiceMethod({
      function: MeatPortionService.GetVeggieStreak,
      args: [getUser().id],
    }).then((data) => {
      setStreak(data.data);
    });
  };

  const updateStreak = (_: MeatPortion) => {
    console.log("Updating streak...");
    fetchStreak();
  };

  useEffect(() => {
    registerCallback(updateStreak);
  }, []);

  useEffect(() => {
    fetchStreak();
  });

  return {
    streak,
  };
}

export { useVeggieStreak };
