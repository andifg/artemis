import "./AddMealSheet.scss";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { AddMealForm } from "./AddMealForm";

export type AddMealSheetProps = {
  open: boolean;
  onClose: () => void;
};

function AddMealSheet({ open, onClose }: AddMealSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full add-meal-sheet-background" side="left">
        <SheetTitle className="text-3xl">Add Meat Serving</SheetTitle>
        <SheetDescription>Hopefully it was tasty!</SheetDescription>
        <div className="add-meal-sheet-content">
          <AddMealForm onClose={onClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { AddMealSheet };
