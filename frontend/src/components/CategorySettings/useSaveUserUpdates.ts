import { useEffect, useState } from "react";
import { useCentralState } from "@/hooks/useCentralState";
import { useClient } from "@/hooks/useClient";
import { UserService } from "@/client/UserService";
import { useAuthentication } from "@/hooks/useAuthentication";

function useSaveUserUpdates() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useCentralState();
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

  const saveCategoryRanksUpdate = () => {
    if (user === undefined) {
      console.log("No ranks to update");
      return;
    }

    console.log("Saving ranks to server", user?.category_ranks);

    callClientServiceMethod({
      function: UserService.UpdateRanks,
      args: [user.category_ranks, tokenUser.id],
    }).then((data) => {
      console.log("Successfully updated ranks on server", data);
    });
  };

  const saveLimitUpdate = () => {
    if (user === undefined) {
      console.log("No slider value to save");
      return;
    }

    const bodyUpdateUser = {
      id: tokenUser.id,
      weekly_meat_limit: user.weekly_meat_limit,
      weekly_vegetarian_limit: user.weekly_vegetarian_limit,
      weekly_alcohol_limit: user.weekly_alcohol_limit,
      weekly_candy_limit: user.weekly_candy_limit,
    };
    callClientServiceMethod({
      function: UserService.UpdateUser,
      args: [bodyUpdateUser, tokenUser.id],
    }).then((data) => {
      console.log("Updated slider value: ", data.data);
      setUser(data.data);
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        saveLimitUpdate();
      },

      200,
    );
    return () => clearTimeout(timeoutId);
  }, [
    user?.weekly_alcohol_limit,
    user?.weekly_candy_limit,
    user?.weekly_meat_limit,
    user?.weekly_vegetarian_limit,
  ]);

  useEffect(() => {
    console.log("Detected rank change,", user);
    saveCategoryRanksUpdate();
  }, [user?.category_ranks]);

  useEffect(() => {
    setLoading(true);
    loadUser();
    setLoading(false);
  }, []);

  return {
    loading,
  };
}

export { useSaveUserUpdates };
