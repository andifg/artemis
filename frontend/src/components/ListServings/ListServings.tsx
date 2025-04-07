import "./listServingsSheet.scss";

import { useContext, useEffect } from "react";

import { DayHeader } from "./DayHeader";
import { ServingComponent } from "./ServingComponent";
import { useListServings } from "./useListServings";
import { useDeleteServing } from "./useDeleteServing";

import { useCentralState } from "@/hooks/useCentralState";
import { AddServingContext } from "@/contexts/addServingContext";

import { LoaderIcon } from "lucide-react";

const ListMeals = () => {
  const { loading } = useListServings();

  const { servings } = useCentralState();
  const { addServing } = useCentralState();

  const { selectedServing, selectForDeletion } = useDeleteServing();

  const { registerAddCallback } = useContext(AddServingContext);

  useEffect(() => {
    registerAddCallback(addServing);
  }, []);

  return (
    <div className="list-servings-wrapper">
      {loading && Object.keys(servings).length === 0 ? (
        <LoaderIcon className="animate-spin" />
      ) : (
        <div className="list-servings-sheet-content">
          {Object.keys(servings)
            .sort()
            .reverse()
            .map((day) => {
              return (
                <>
                  <DayHeader day={day} key={`${day}-l`} />
                  {servings[day].map((servings) => {
                    return (
                      <ServingComponent
                        serving={servings}
                        selectedForDeletion={selectedServing}
                        selectForDeletion={selectForDeletion}
                        key={`l-${servings.id}`}
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
