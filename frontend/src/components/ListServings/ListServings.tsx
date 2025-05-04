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

  const { servings, user } = useCentralState();
  const { addServing } = useCentralState();

  const { selectedServing, selectForDeletion } = useDeleteServing();

  const { registerAddCallback } = useContext(AddServingContext);

  const filteredDays = Object.keys(servings)
    .sort()
    .reverse()
    .map((day) => {
      const filteredServings = servings[day]
        .filter((serving) =>
          user?.category_ranks.find(
            (rank) => rank.category === serving.category && rank.active,
          ),
        )
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

      return filteredServings.length > 0
        ? { day, servings: filteredServings }
        : null;
    })
    .filter(Boolean) as { day: string; servings: (typeof servings)[string] }[];

  useEffect(() => {
    registerAddCallback(addServing);
  }, []);

  return (
    <div className="list-servings-wrapper">
      {loading && Object.keys(servings).length === 0 ? (
        <LoaderIcon className="animate-spin" />
      ) : (
        <div className="list-servings-sheet-content">
          {filteredDays.map(({ day, servings }) => (
            <div key={`${day}-l`}>
              <DayHeader>{day}</DayHeader>
              {servings.map((serving) => (
                <ServingComponent
                  serving={serving}
                  selectedForDeletion={selectedServing}
                  selectForDeletion={selectForDeletion}
                  key={`l-${serving.id}`}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { ListMeals };
