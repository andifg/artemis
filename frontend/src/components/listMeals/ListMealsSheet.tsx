import "./listMealsSheet.scss";

import { DayHeader } from "./DayHeader";
import { Portion } from "./Portion";
import { useListMeals } from "./useListMeals";
import { useDeleteMeal } from "./useDeleteMeal";

import { useCentralState } from "@/hooks/useCentralState";

import { LoaderIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/Components/ui/sheet";

export type AddMealSheetProps = {
  open: boolean;
  onClose: () => void;
};

function ListMealsSheet({ open, onClose }: AddMealSheetProps) {
  const { loading } = useListMeals({ open });

  const portions = useCentralState((state) => state.meatPortions);

  const { selectedMeal, selectForDeletion } = useDeleteMeal();

  return (
    <Sheet open={open} onOpenChange={onClose} key={"list-meals-sheet"}>
      <SheetContent
        className="w-full list-meals-sheet-background"
        side="left"
        key={"list-meals-sheet-content"}
      >
        <SheetTitle className="text-3xl">Recent Servings</SheetTitle>
        <SheetDescription></SheetDescription>
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
      </SheetContent>
    </Sheet>
  );
}

export { ListMealsSheet };
