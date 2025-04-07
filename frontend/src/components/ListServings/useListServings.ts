import { useState } from "react";
import { useEffect } from "react";
import { useClient } from "@/hooks/useClient";

import { ServingService } from "@/client/ServingService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCentralState } from "@/hooks/useCentralState";

function useListServings() {
  const [loading, setLoading] = useState<boolean>(true);
  const [callClientServiceMethod] = useClient();
  const { getUser } = useAuthentication();
  const user = getUser();

  const { setServings } = useCentralState();

  useEffect(() => {
    callClientServiceMethod({
      function: ServingService.GetServings,
      args: [user.id, 1, 30],
    }).then((response) => {
      setServings(response.data);
      setLoading(false);
    });
  }, []);

  return { loading };
}

export { useListServings };
