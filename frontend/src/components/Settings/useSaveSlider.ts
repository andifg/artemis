import { useEffect, useState } from "react";
import { useCentralState } from "@/hooks/useCentralState";
import { useClient } from "@/hooks/useClient";
import { UserService } from "@/client/UserService";
import { useAuthentication } from "@/hooks/useAuthentication";

function useSaveSlider() {
  const [loading, setLoading] = useState(false);
  const { meatPortionWeeklyTarget, setMeatPortionWeeklyTarget } =
    useCentralState();
  const [callClientServiceMethod] = useClient();
  const { getUser } = useAuthentication();

  const user = getUser();

  const loadSliderValue = () => {
    callClientServiceMethod({
      function: UserService.GetUser,
      args: [user.id],
    }).then((data) => {
      console.log("Slider value loaded: ", data.data.weeklyMeatPortionTarget);
      setMeatPortionWeeklyTarget(data.data.weeklyMeatPortionTarget);
    });
  };

  const saveSliderValue = () => {
    if (meatPortionWeeklyTarget === undefined) {
      console.log("No slider value to save");
      return;
    }

    const bodyUpdateUser = {
      id: user.id,
      weeklyMeatPortionTarget: meatPortionWeeklyTarget,
    };
    callClientServiceMethod({
      function: UserService.UpdateUser,
      args: [bodyUpdateUser, user.id],
    }).then((data) => {
      console.log("Updated slider value");
      setMeatPortionWeeklyTarget(data.data.weeklyMeatPortionTarget);
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        saveSliderValue();
      },

      500,
    );
    return () => clearTimeout(timeoutId);
  }, [meatPortionWeeklyTarget]);

  useEffect(() => {
    setLoading(true);
    loadSliderValue();
    setLoading(false);
  }, []);

  return {
    loading,
  };
}

export { useSaveSlider };
