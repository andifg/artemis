import "./MealModal.scss";

import { useCentralState } from "@/hooks/useCentralState";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/Components/ui/sheet";
import { AddMealForm } from "./MealForm";

export type AddMealSheetProps = {
  open: boolean;
  onClose: () => void;
};

function MealModal({ open, onClose }: AddMealSheetProps) {
  const { editPortion } = useCentralState();

  return (
    <Sheet open={open || editPortion != null} onOpenChange={onClose}>
      <SheetContent className="w-full meal-sheet-background" side="left">
        <SheetTitle className="text-3xl">
          {editPortion ? "Edit Meat Serving" : "Add Meat Serving"}
        </SheetTitle>
        <SheetDescription>
          {editPortion ? "Edit your meal" : "Add a new meal"}
        </SheetDescription>
        <div className="meal-sheet-content">
          <AddMealForm onClose={onClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MealModal };
