import { useState, useRef, useEffect, RefObject, useContext } from "react";
import { useClient } from "@/hooks/useClient";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCentralState } from "@/hooks/useCentralState";
import { MeatPortionService } from "@/client/meatPortionService";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";
import { MeatPortion } from "@/client/types";

type useDeleteMealReturn = {
  selectedMeal: MeatPortion | null;
  selectForDeletion: (
    portion: MeatPortion,
    ref: RefObject<HTMLElement>,
  ) => void;
};

function useDeleteMeal(): useDeleteMealReturn {
  const [selectedMeal, setSelectedMeal] = useState<MeatPortion | null>(null);
  const [callClientServiceMethod] = useClient();
  const deletePortion = useCentralState((state) => state.deletePortion);
  const { getUser } = useAuthentication();
  const { callAllCallbacks } = useContext(DeleteMeatPortionContext);

  const user = getUser();

  const refObject = useRef<HTMLElement | null>(null);

  const handleClick = (e: MouseEvent) => {
    if (selectedMeal === null) {
      return;
    }
    if (refObject.current && !refObject.current.contains(e.target as Node)) {
      setSelectedMeal(null);
    } else {
      callClientServiceMethod({
        function: MeatPortionService.DeleteMeatPortion,
        args: [user.id, selectedMeal.id],
      }).then(() => {
        deletePortion(selectedMeal.id);
        callAllCallbacks(selectedMeal);
        setSelectedMeal(null);
      });
    }
  };

  const selectForDeletion = (
    portion: MeatPortion,
    ref: RefObject<HTMLElement>,
  ) => {
    setSelectedMeal(portion);
    refObject.current = ref.current;
  };

  useEffect(() => {
    setTimeout(() => {
      if (selectedMeal !== null) {
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
