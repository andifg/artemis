import "./categorySelector.scss";

import { Button } from "../ui/button";
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
          <Button
            key={category.category}
            variant={
              categoryActive.get(category.category) == true
                ? "default"
                : "outline"
            }
            className={`form-color ${categoryActive.get(category.category) == true ? "serving-form-button-selected" : ""} category-selector`}
            onClick={() => toggleCategory(category.category)}
          >
            {category.category}
          </Button>
        ))}
    </div>
  );
};

export { CategorySelector };
