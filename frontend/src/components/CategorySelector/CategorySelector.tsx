import "./categorySelector.scss";
import { ServingCategory } from "@/client/types";
import { useCentralState } from "@/hooks/useCentralState";

type CategorySelectorProps = {
  categoryActive: Map<ServingCategory, boolean>;
  toggleCategory: (category: ServingCategory) => void;
};

const CategorySelector = ({
  categoryActive,
  toggleCategory,
}: CategorySelectorProps) => {
  const { user } = useCentralState();

  return (
    <div className="category-selector">
      {user?.category_ranks
        .filter((rank) => rank.active)
        .map((category) => (
          <button
            key={category.category}
            className={`form-color ${categoryActive.get(category.category) == true ? "category-selector-selected" : "category-selector-unselected"} category-selector-item`}
            onClick={() => toggleCategory(category.category)}
          >
            {category.category.charAt(0).toUpperCase()}
            {category.category.slice(1)}
          </button>
        ))}
    </div>
  );
};

export { CategorySelector };
