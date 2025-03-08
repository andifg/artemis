import { useEffect, useState, useContext } from "react";
import { useClient } from "@/hooks/useClient";
import { MeatPortionService } from "@/client/MeatPortionService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";
import { MeatPortion } from "@/client/types";

function useVeggieStreak() {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();

  const { registerCallback } = useContext(AddMeatPortionContext);
  const { registerDeleteCallback } = useContext(DeleteMeatPortionContext);

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

  const deleteMeatPortion = (_: MeatPortion) => {
    console.log("Deleting meat portion...");
    fetchStreak();
  };

  useEffect(() => {
    registerCallback(updateStreak);
    registerDeleteCallback(deleteMeatPortion);
  }, []);

  useEffect(() => {
    fetchStreak();
  });

  return {
    streak,
  };
}

export { useVeggieStreak };
