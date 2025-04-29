import { useEffect, useState } from "react";
import { useCentralState } from "@/hooks/useCentralState";
import { useClient } from "@/hooks/useClient";
import { UserService } from "@/client/UserService";
import { useAuthentication } from "@/hooks/useAuthentication";

function useLoadUser() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useCentralState();
  const [callClientServiceMethod] = useClient();
  const { getUser } = useAuthentication();

  const tokenUser = getUser();

  const loadUser = () => {
    callClientServiceMethod({
      function: UserService.GetUser,
      args: [tokenUser.id],
    }).then((data) => {
      console.log("User loaded: ", data.data);
      setUser(data.data);
    });
  };

  useEffect(() => {
    setLoading(true);
    loadUser();
    setLoading(false);
  }, []);

  return {
    loading,
  };
}

export { useLoadUser };
