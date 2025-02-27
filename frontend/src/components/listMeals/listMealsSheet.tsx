import "./ListMealsSheet.scss";

import { DayHeader } from "./DayHeader";
import { Portion } from "./Portion";
import { useListMeals } from "./useListMeals";

import { LoaderIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

export type AddMealSheetProps = {
  open: boolean;
  onClose: () => void;
};

function ListMealsSheet({ open, onClose }: AddMealSheetProps) {
  const { meals, loading } = useListMeals({ open });

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full list-meals-sheet-background" side="left">
        <SheetTitle className="text-3xl">Servings</SheetTitle>
        <SheetDescription></SheetDescription>
        {loading ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          <div className="list-meals-sheet-content">
            <div style={{ overflowY: "scroll", height: "100%" }}>
              {Object.keys(meals)
                .sort()
                .reverse()
                .map((day) => {
                  return (
                    <>
                      <DayHeader day={day} key={day} />
                      {meals[day].map((portion) => {
                        return (
                          <Portion
                            portion={portion}
                            key={`${day}-${portion.id}`}
                          />
                        );
                      })}
                    </>
                  );
                })}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export { ListMealsSheet };
