import { useState, useRef, useEffect, RefObject, useContext } from "react";
import { useClient } from "@/hooks/useClient";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCentralState } from "@/state/centralState";
import { MeatPortionService } from "@/client/meatPortionService";
import { DeleteMeatPortionContext } from "@/contexts/deleteMeatPortionContext";

type useDeleteMealReturn = {
  selectedMeal: string;
  selectForDeletion: (id: string, ref: RefObject<HTMLElement>) => void;
};

function useDeleteMeal(): useDeleteMealReturn {
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [callClientServiceMethod] = useClient();
  const deletePortion = useCentralState((state) => state.deletePortion);
  const { getUser } = useAuthentication();
  const { callAllCallbacks } = useContext(DeleteMeatPortionContext);

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
        deletePortion(selectedMeal);
        callAllCallbacks(selectedMeal);
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
