import { useState } from "react";
import { ServingCategory } from "@/client/types";

interface CategoryPriority {
  category: ServingCategory;
  id: number;
  active: boolean;
}

function useCategorySettings() {
  const [items, setItems] = useState<CategoryPriority[]>([
    {
      category: "meat",
      id: 1,
      active: true,
    },
    {
      category: "alcohol",
      id: 2,
      active: true,
    },
    {
      category: "vegetarian",
      id: 3,
      active: false,
    },
    {
      category: "candy",
      id: 4,
      active: false,
    },
  ]);

  const updateIDs = (items: CategoryPriority[]) => {
    let id = 1;
    const updatedItems = items.map((item) => {
      return { ...item, id: id++ };
    });
    console.log("Updated Items: ", updatedItems);
    return updatedItems;
  };

  const toggleActive = (id: number) => {
    console.log("Toggle active: ", id);

    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev;

      const item = prev[index];
      const isActive = item.active;

      const itemsWithout = prev.filter((_, i) => i !== index);

      const lastActiveIndex = (() => {
        for (let i = itemsWithout.length - 1; i >= 0; i--) {
          if (itemsWithout[i].active) return i;
        }
        return -1;
      })();

      if (!isActive) {
        const updatedItem = { ...item, active: true };

        const newItems = [
          ...itemsWithout.slice(0, lastActiveIndex + 1),
          updatedItem,
          ...itemsWithout.slice(lastActiveIndex + 1),
        ];

        return updateIDs(newItems);
      } else {
        const insertIndex: number = (() => {
          if (lastActiveIndex === -1) return 0;
          return lastActiveIndex + 1;
        })();

        const updatedItem = { ...item, active: false };

        const newItems = [
          ...itemsWithout.slice(0, insertIndex),
          updatedItem,
          ...itemsWithout.slice(insertIndex),
        ];

        return updateIDs(newItems);
      }
    });
  };

  return {
    items,
    setItems,
    toggleActive,
    updateIDs,
  };
}

export { useCategorySettings };
