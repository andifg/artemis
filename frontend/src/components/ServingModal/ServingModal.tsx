import "./ServingModal.scss";

import { useCentralState } from "@/hooks/useCentralState";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/Components/ui/sheet";
import { ServingForm } from "./ServingForm";

export type AddMealSheetProps = {
  open: boolean;
  onClose: () => void;
};

function ServingModal({ open, onClose }: AddMealSheetProps) {
  const { editServing } = useCentralState();

  return (
    <Sheet open={open || editServing != null} onOpenChange={onClose}>
      <SheetContent className="h-full" side="bottom">
        <SheetTitle className="meal-sheet-title">
          {editServing ? "Edit Meat Serving" : "Add Meat Serving"}
        </SheetTitle>
        <SheetDescription>
          {/* {editPortion ? "Edit your meal" : "Add a new meal"} */}
        </SheetDescription>
        <div className="meal-sheet-content">
          <ServingForm onClose={onClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { ServingModal };
