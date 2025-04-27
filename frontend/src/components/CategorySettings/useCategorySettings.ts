import { CategoryRank } from "@/client/types";
import { useCentralState } from "@/hooks/useCentralState";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

function useCategorySettings() {
  const { user, setRanks } = useCentralState();

  const ranks = user?.category_ranks || [];

  const handleResortEvent = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const oldIndex = ranks.findIndex((item) => item.rank === active.id);
    const newIndex = ranks.findIndex((item) => item.rank === over.id);

    if (ranks[newIndex].active == false) {
      console.log("Target is inactive, not moving");
      return;
    }

    if (oldIndex !== newIndex) {
      const updatedItems = arrayMove(ranks, oldIndex, newIndex);

      setRanks(updateIDs(updatedItems));
    }
  };

  const updateIDs = (items: CategoryRank[]) => {
    let id = 1;
    const updatedItems = items.map((item) => {
      return { ...item, rank: id++ };
    });
    console.log("Updated Items: ", updatedItems);
    return updatedItems;
  };

  const toggleActive = (id: number) => {
    console.log("Toggle active: ", id);

    const index = ranks.findIndex((rank) => rank.rank === id);
    if (index === -1) return;

    const item = ranks[index];
    const isActive = item.active;

    const itemsWithout = ranks.filter((_, i) => i !== index);

    let newItems = [];

    const lastActiveIndex = (() => {
      for (let i = itemsWithout.length - 1; i >= 0; i--) {
        if (itemsWithout[i].active) return i;
      }
      return -1;
    })();

    if (!isActive) {
      const updatedItem = { ...item, active: true };

      newItems = [
        ...itemsWithout.slice(0, lastActiveIndex + 1),
        updatedItem,
        ...itemsWithout.slice(lastActiveIndex + 1),
      ];
    } else {
      const insertIndex: number = (() => {
        if (lastActiveIndex === -1) return 0;
        return lastActiveIndex + 1;
      })();

      const updatedItem = { ...item, active: false };

      newItems = [
        ...itemsWithout.slice(0, insertIndex),
        updatedItem,
        ...itemsWithout.slice(insertIndex),
      ];
    }

    setRanks(updateIDs(newItems));
  };

  return {
    ranks,
    handleResortEvent,
    toggleActive,
  };
}

export { useCategorySettings };
