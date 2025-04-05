import "./listMealsSheet.scss";

import { useContext, useEffect } from "react";

import { DayHeader } from "./DayHeader";
import { Portion } from "./Portion";
import { useListMeals } from "./useListMeals";
import { useDeleteMeal } from "./useDeleteMeal";

import { useCentralState } from "@/hooks/useCentralState";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";

import { LoaderIcon } from "lucide-react";

const ListMeals = () => {
  const { loading } = useListMeals();

  const portions = useCentralState((state) => state.meatPortions);
  const { addPortion } = useCentralState();

  const { selectedMeal, selectForDeletion } = useDeleteMeal();

  const { registerAddCallback } = useContext(AddMeatPortionContext);

  useEffect(() => {
    registerAddCallback(addPortion);
  }, []);

  return (
    <div className="list-meals-wrapper">
      {loading && Object.keys(portions).length === 0 ? (
        <LoaderIcon className="animate-spin" />
      ) : (
        <div className="list-meals-sheet-content">
          {Object.keys(portions)
            .sort()
            .reverse()
            .map((day) => {
              return (
                <>
                  <DayHeader day={day} key={`${day}-l`} />
                  {portions[day].map((portion) => {
                    return (
                      <Portion
                        portion={portion}
                        selectedForDeletion={selectedMeal}
                        selectForDeletion={selectForDeletion}
                        key={`l-${portion.id}`}
                      />
                    );
                  })}
                </>
              );
            })}
        </div>
      )}
    </div>
  );
};

export { ListMeals };
