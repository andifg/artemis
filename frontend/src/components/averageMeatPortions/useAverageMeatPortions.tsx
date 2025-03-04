import { useClient } from "@/hooks/useClient";
import { useEffect, useState, useContext } from "react";
import { MeatPortionService } from "@/client/meatPortionService";
import { Timeframe, AverageMeatPortions, MeatPortion } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";

type useAverageMeatPortionsProps = {
  selected: Timeframe;
};

type useAverageMeatPortionsReturn = {
  averageMeatPortions: AverageMeatPortions;
};

function useAverageMeatPortions({
  selected,
}: useAverageMeatPortionsProps): useAverageMeatPortionsReturn {
  const { getUser } = useAuthentication();
  const [callClientServiceMethod] = useClient();
  const { registerCallback } = useContext(AddMeatPortionContext);
  const { registerDeleteCallback } = useContext(DeleteMeatPortionContext);

  const [averageMeatPortions, setAverageMeatPortions] =
    useState<AverageMeatPortions>({
      Timeframe: "week",
      Value: 0,
      ChangeRate: 0,
    });

  const fetchAverageMeatPortions = () => {
    callClientServiceMethod({
      function: MeatPortionService.GetAverageMeatPortions,
      args: [getUser().id, selected],
    }).then((data) => {
      console.log("data average", data.data);
      setAverageMeatPortions({
        Timeframe: data.data.Timeframe,
        Value: data.data.Value,
        ChangeRate: data.data.ChangeRate,
      });
    });
  };

  const updateAverageMeatPortions = (_: MeatPortion) => {
    fetchAverageMeatPortions();
  };

  const deleteMeatPortion = (_: string) => {
    fetchAverageMeatPortions();
  };

  useEffect(() => {
    registerCallback(updateAverageMeatPortions);
    registerDeleteCallback(deleteMeatPortion);
  }, []);

  useEffect(() => {
    fetchAverageMeatPortions();
  }, [selected]);

  return {
    averageMeatPortions,
  };
}

export { useAverageMeatPortions };
