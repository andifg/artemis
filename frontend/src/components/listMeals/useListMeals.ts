import { useState } from "react";
import { useEffect } from "react";
import { useClient } from "@/hooks/useClient";

import { MeatPortionService } from "@/client/meatPortionService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCentralState } from "@/state/centralState";

type useListMealsProps = {
  open: boolean;
};

function useListMeals({ open }: useListMealsProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [callClientServiceMethod] = useClient();
  const { getUser } = useAuthentication();
  const user = getUser();

  const { setPortions } = useCentralState();

  useEffect(() => {
    if (!open) {
      return;
    }

    callClientServiceMethod({
      function: MeatPortionService.GetMeatPortion,
      args: [user.id, 1, 30],
    }).then((response) => {
      setPortions(response.data);
      setLoading(false);
    });
  }, [open]);

  return { loading };
}

export { useListMeals };
