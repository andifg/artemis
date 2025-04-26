import "./sortableCategory.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ServingCategory } from "@/client/types";
import { Switch } from "../ui/switch";
import { ArrowUpDown } from "lucide-react";
import { ServingCategorySlider } from "./ServingCategorySlider";
import { ServingIcon } from "../ServingIcon/ServingIcon";

const SortableCategory = ({
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
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: !active });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div
        className={`${active ? "category-active" : "category-inactive"} sortable-category`}
      >
        <div className="sortable-category-left">
          <div className="sortable-category-content">
            <ServingIcon servingCategory={category} />
            <div className="sortable-category-text">
              {text && text.charAt(0).toUpperCase() + text.slice(1)}
            </div>
            <Switch
              id="airplane-mode"
              onClick={() => toggleActive(id)}
              checked={active}
            />
          </div>
          <div>
            <ServingCategorySlider category={category} active={active} />
          </div>
        </div>

        <div className="sortable-category-move" {...attributes} {...listeners}>
          <ArrowUpDown />
        </div>
      </div>
    </li>
  );
};

export { SortableCategory };
