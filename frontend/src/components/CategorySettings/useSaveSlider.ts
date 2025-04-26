import { useEffect, useState } from "react";
import { useCentralState } from "@/hooks/useCentralState";
import { useClient } from "@/hooks/useClient";
import { UserService } from "@/client/UserService";
import { useAuthentication } from "@/hooks/useAuthentication";
import { ServingCategory } from "@/client/types";

function useSaveSlider({ category }: { category: ServingCategory }) {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useCentralState();
  const [callClientServiceMethod] = useClient();
  const { getUser } = useAuthentication();

  const tokenUser = getUser();

  const limitMap = {
    meat: user.weekly_meat_limit,
    vegetarian: user.weekly_vegetarian_limit,
    alcohol: user.weekly_alcohol_limit,
    candy: user.weekly_candy_limit,
  };

  const categoryMap = {
    meat: "weekly_meat_limit",
    vegetarian: "weekly_vegetarian_limit",
    alcohol: "weekly_alcohol_limit",
    candy: "weekly_candy_limit",
  };

  const limit = limitMap[category as keyof typeof limitMap];

  const loadSliderValue = () => {
    callClientServiceMethod({
      function: UserService.GetUser,
      args: [tokenUser.id],
    }).then((data) => {
      console.log("Slider value loaded: ", data.data);
      setUser(data.data);
    });
  };

  const saveSliderValue = () => {
    if (limit === undefined) {
      console.log("No slider value to save");
      return;
    }

    const bodyUpdateUser = {
      id: tokenUser.id,
      [categoryMap[category as keyof typeof categoryMap]]: limit,
    };
    callClientServiceMethod({
      function: UserService.UpdateUser,
      args: [bodyUpdateUser, tokenUser.id],
    }).then((data) => {
      console.log("Updated slider value");
      setUser(data.data);
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
  }, [limit]);

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
