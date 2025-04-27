import "./categorySettings.scss";
import { DndContext, useSensor, TouchSensor } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableCategory } from "./SortableCategory";
import { useCategorySettings } from "./useCategorySettings";
import { useSaveUserUpdates } from "./useSaveUserUpdates";

const CategorySettings = () => {
  const touchSensor = useSensor(TouchSensor);

  const { ranks, handleResortEvent, toggleActive } = useCategorySettings();

  useSaveUserUpdates();

  return (
    <DndContext
      sensors={[touchSensor]}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleResortEvent}
    >
      <SortableContext items={ranks.map((rank) => rank.rank)}>
        <ul className="list">
          {ranks.map((rank) => (
            <SortableCategory
              key={`${rank.user_id}${rank.category}`}
              id={rank.rank}
              text={rank.category}
              active={rank.active}
              toggleActive={toggleActive}
              category={rank.category}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export { CategorySettings };
