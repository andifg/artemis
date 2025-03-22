import { useState } from "react";
import { useEffect } from "react";
import { useClient } from "@/hooks/useClient";

import { MeatPortionService } from "@/client/MeatPortionService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCentralState } from "@/hooks/useCentralState";

function useListMeals() {
  const [loading, setLoading] = useState<boolean>(true);
  const [callClientServiceMethod] = useClient();
  const { getUser } = useAuthentication();
  const user = getUser();

  const { setPortions } = useCentralState();

  useEffect(() => {
    callClientServiceMethod({
      function: MeatPortionService.GetMeatPortion,
      args: [user.id, 1, 30],
    }).then((response) => {
      setPortions(response.data);
      setLoading(false);
    });
  }, []);

  return { loading };
}

export { useListMeals };
