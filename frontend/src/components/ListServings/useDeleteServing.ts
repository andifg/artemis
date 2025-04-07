import { useState, useRef, useEffect, RefObject, useContext } from "react";
import { useClient } from "@/hooks/useClient";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCentralState } from "@/hooks/useCentralState";
import { ServingService } from "@/client/ServingService";
import { DeleteServingContext } from "@/contexts/deleteServingContext";
import { Serving } from "@/client/types";

type useDeleteMealReturn = {
  selectedServing: Serving | null;
  selectForDeletion: (portion: Serving, ref: RefObject<HTMLElement>) => void;
};

function useDeleteServing(): useDeleteMealReturn {
  const [selectedServing, setSelectedMeal] = useState<Serving | null>(null);
  const [callClientServiceMethod] = useClient();
  // const deletePortion = useCentralState((state) => state.deletePortion);
  const { deleteServing, timeFrame } = useCentralState();
  const { getUser } = useAuthentication();
  const { callDeleteCallbacks } = useContext(DeleteServingContext);

  const user = getUser();

  const refObject = useRef<HTMLElement | null>(null);

  const handleClick = (e: MouseEvent) => {
    if (selectedServing === null) {
      return;
    }
    if (refObject.current && !refObject.current.contains(e.target as Node)) {
      setSelectedMeal(null);
    } else {
      callClientServiceMethod({
        function: ServingService.DeleteServing,
        args: [user.id, selectedServing.id],
      }).then(() => {
        deleteServing(selectedServing.id);
        callDeleteCallbacks(selectedServing, timeFrame);
        setSelectedMeal(null);
      });
    }
  };

  const selectForDeletion = (portion: Serving, ref: RefObject<HTMLElement>) => {
    setSelectedMeal(portion);
    refObject.current = ref.current;
  };

  useEffect(() => {
    setTimeout(() => {
      if (selectedServing !== null) {
        document.addEventListener("click", handleClick);
      } else {
        document.removeEventListener("click", handleClick);
      }
    }, 250);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [selectedServing]);

  return { selectedServing, selectForDeletion };
}

export { useDeleteServing };
