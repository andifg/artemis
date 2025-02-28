import { useState } from "react";
import { useEffect } from "react";
import { useClient } from "@/hooks/useClient";

import { MeatPortionDateList } from "@/client/types";
import { MeatPortionService } from "@/client/meatPortionService";
import { useAuthentication } from "@/hooks/useAuthentication";

type useListMealsProps = {
  open: boolean;
};

function useListMeals({ open }: useListMealsProps) {
  const [meals, setMeals] = useState<MeatPortionDateList>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [callClientServiceMethod] = useClient();
  const { getUser } = useAuthentication();
  const user = getUser();

  useEffect(() => {
    if (!open) {
      return;
    }

    callClientServiceMethod({
      function: MeatPortionService.GetMeatPortion,
      args: [user.id, 1, 30],
    }).then((response) => {
      setMeals(response.data);
      setLoading(false);
    });
  }, [open]);

  return { meals, loading };
}

export { useListMeals };
