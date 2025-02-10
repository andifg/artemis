import "./listMealsSheet.scss";

import { DayHeader } from "./dayHeader";
import { Portion } from "./portion";

import { listMealsTmpData } from "./ListMealsTmpData";

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
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full list-meals-sheet-background" side="left">
        <SheetTitle className="text-3xl">Servings</SheetTitle>
        <SheetDescription></SheetDescription>
        <div className="list-meals-sheet-content">
          {Array.from(listMealsTmpData).map(([day, portions]) => {
            return (
              <>
                <DayHeader day={day} />
                {portions.map((portion) => {
                  return <Portion portion={portion} />;
                })}
              </>
            );
          })}
          {/* <DayHeader />
          <Portion /> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { ListMealsSheet };
