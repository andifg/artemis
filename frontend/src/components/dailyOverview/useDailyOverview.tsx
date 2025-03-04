import { useEffect, useState, useContext } from "react";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";
import { useClient } from "@/hooks/useClient";
import { MeatPortionService } from "@/client/meatPortionService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { MeatPortion } from "@/client/types";
import { extractDate } from "@/utils/extractDate";

export type DailyOverview = {
  [key: string]: MeatPortion | undefined;
};

function useDailyOverview() {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const user = getUser();

  const { registerCallback } = useContext(AddMeatPortionContext);
  const { registerDeleteCallback } = useContext(DeleteMeatPortionContext);

  const initializeMeatPortions = () => {
    const meatPortions: DailyOverview = {};

    for (let i = 0; i < 14; i++) {
      // Calculate the date for each iteration
      const date = new Date();
      date.setDate(date.getDate() - i);

      // Convert the date to a string
      const dateString = extractDate(date);

      // Add the date to the object
      meatPortions[dateString] = undefined;
    }
    return meatPortions;
  };

  const [dailyOverview, setDailyOverview] = useState<DailyOverview>(
    initializeMeatPortions(),
  );

  const updateMeatPortionsByDate = (newMeatPortions: MeatPortion[]) => {
    setDailyOverview((meatPortions) => {
      const updatedMeatPortions = { ...meatPortions };

      newMeatPortions.forEach((newMeatPortion) => {
        updatedMeatPortions[extractDate(new Date(newMeatPortion.date))] =
          newMeatPortion;
      });

      return updatedMeatPortions;
    });
  };

  const deleteMeatPortion = (meatPortionId: string) => {
    setDailyOverview((meatPortions) => {
      const updatedMeatPortions = { ...meatPortions };

      Object.keys(updatedMeatPortions).forEach((date) => {
        if (updatedMeatPortions[date]?.id === meatPortionId) {
          updatedMeatPortions[date] = undefined;
        }
      });

      return updatedMeatPortions;
    });
  };

  const addSingleMeatPortion = (portion: MeatPortion) => {
    console.log("Adding single meat portion");
    updateMeatPortionsByDate([portion]);
  };

  // changeFunction(()=>addSingleMeatPortion);

  useEffect(() => {
    // initializeMeatPortions();
    registerCallback(addSingleMeatPortion);
    registerDeleteCallback(deleteMeatPortion);
    callClientServiceMethod({
      function: MeatPortionService.GetMeatPortions,
      args: [user.id],
    }).then((response) => {
      updateMeatPortionsByDate(response.data);
    });
  }, []);

  return { dailyOverview };
}

export { useDailyOverview };
