import { useState, useRef, useEffect, RefObject } from "react";
import { useClient } from "@/hooks/useClient";
import { useAuthentication } from "@/hooks/useAuthentication";
import { MeatPortionService } from "@/client/meatPortionService";

type useDeleteMealReturn = {
  selectedMeal: string;
  selectForDeletion: (id: string, ref: RefObject<HTMLElement>) => void;
};

function useDeleteMeal(): useDeleteMealReturn {
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [callClientServiceMethod] = useClient();
  const { getUser } = useAuthentication();

  const user = getUser();

  const refObject = useRef<HTMLElement | null>(null);

  const handleClick = (e: MouseEvent) => {
    if (refObject.current && !refObject.current.contains(e.target as Node)) {
      setSelectedMeal("");
    } else {
      callClientServiceMethod({
        function: MeatPortionService.DeleteMeatPortion,
        args: [user.id, selectedMeal],
      }).then(() => {
        setSelectedMeal("");
      });
    }
  };

  const selectForDeletion = (id: string, ref: RefObject<HTMLElement>) => {
    setSelectedMeal(id);
    refObject.current = ref.current;
  };

  useEffect(() => {
    setTimeout(() => {
      if (selectedMeal !== "") {
        document.addEventListener("click", handleClick);
      } else {
        document.removeEventListener("click", handleClick);
      }
    }, 250);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [selectedMeal]);

  return { selectedMeal, selectForDeletion };
}

export { useDeleteMeal };
