import "./categorySettings.scss";
import { DndContext, useSensor, TouchSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableCategory } from "./SortableCategory";
import { useCategorySettings } from "./useCategorySettings";
import { useSaveSlider } from "./useSaveSlider";

const CategorySettings = () => {
  const touchSensor = useSensor(TouchSensor);

  const { items, setItems, updateIDs, toggleActive } = useCategorySettings();

  useSaveSlider();

  return (
    <DndContext
      sensors={[touchSensor]}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={(event) => {
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
            <SortableCategory
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
