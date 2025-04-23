import "./categorySettings.scss";
import { useSortable } from "@dnd-kit/sortable";
import { DndContext, useSensor, TouchSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { ServingCategory } from "@/client/types";
import { Switch } from "../ui/switch";
import { ArrowUpDown } from "lucide-react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { ServingCategorySlider } from "./ServingCategorySlider";
import { ServingIcon } from "../ServingIcon/ServingIcon";

function Sortable({
  id,
  text,
  active,
  toggleActive,
  category,
}: {
  id: number;
  text?: string;
  active: boolean;
  toggleActive: (id: number) => void;
  category: ServingCategory;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: !active });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className={`${active ? "category-active" : "category-inactive"} category`}
      >
        <div className="category-content">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ServingIcon servingCategory={category} />
            <div style={{ marginRight: "8px", marginLeft: "8px" }}>
              {" "}
              {text && text.charAt(0).toUpperCase() + text.slice(1)}
            </div>
            <Switch
              id="airplane-mode"
              onClick={() => toggleActive(id)}
              checked={active}
            />
          </div>
          <div>
            <ServingCategorySlider />
          </div>
        </div>

        <div style={{ padding: "8px" }}>
          <ArrowUpDown {...attributes} {...listeners} />
        </div>
      </div>
    </li>
  );
}

interface CategoryPriority {
  category: ServingCategory;
  id: number;
  active: boolean;
}

const CategorySettings = () => {
  const touchSensor = useSensor(TouchSensor);
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

      // Remove the current item from its position
      const itemsWithout = prev.filter((_, i) => i !== index);

      const lastActiveIndex = (() => {
        for (let i = itemsWithout.length - 1; i >= 0; i--) {
          if (itemsWithout[i].active) return i;
        }
        return -1;
      })();

      // Toggle logic
      if (!isActive) {
        // Find the index of the last active item

        const updatedItem = { ...item, active: true };

        // Insert the updated item after the last active item
        const newItems = [
          ...itemsWithout.slice(0, lastActiveIndex + 1),
          updatedItem,
          ...itemsWithout.slice(lastActiveIndex + 1),
        ];

        return updateIDs(newItems);
      } else {
        const insertIndex: number = (() => {
          if (lastActiveIndex === -1) return 0; // No active items — insert at the beginning
          return lastActiveIndex + 1; // Insert after the last active item
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

  return (
    <DndContext
      sensors={[touchSensor]}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={(event) => {
        console.log("Drag ended: ", event);

        console.log("Active id : ", event.active.id);
        console.log("Over id : ", event.over?.id);

        const { active, over } = event;

        if (!over) return;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (items[newIndex].active == false) {
          console.log("Target is inactive, not moving");
          return;
        }

        if (oldIndex !== newIndex) {
          setItems((items) => {
            const updatedItems = arrayMove(items, oldIndex, newIndex);
            // updateIDs(updatedItems);
            return updateIDs(updatedItems);
          });
        }
      }}
    >
      <SortableContext items={items}>
        <ul className="list">
          {items.map((id) => (
            <Sortable
              key={`${id.id}${id.category}`}
              id={id.id}
              text={id.category}
              active={id.active}
              toggleActive={toggleActive}
              category={id.category}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export { CategorySettings };
