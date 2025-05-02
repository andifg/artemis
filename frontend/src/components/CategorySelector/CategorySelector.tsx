import "./categorySelector.scss";
import { ServingCategory } from "@/client/types";
import { useCentralState } from "@/hooks/useCentralState";
import { ServingIcon } from "../ServingIcon/ServingIcon";

type CategorySelectorProps = {
  allActive: boolean;
  setAllActive: () => void;
  categoryActive: Map<ServingCategory, boolean>;
  toggleCategory: (category: ServingCategory) => void;
};

const CategorySelector = ({
  allActive,
  setAllActive,
  categoryActive,
  toggleCategory,
}: CategorySelectorProps) => {
  const { user } = useCentralState();

  return (
    <div className="category-selector">
      <div className="category-selector-scroll">
        <div
          className={`form-color ${allActive ? "category-selector-selected" : "category-selector-unselected"} category-selector-item`}
          onClick={setAllActive}
        >
          {allActive && (
            <div className="category-selector-text-container">All </div>
          )}
          {user?.category_ranks
            .filter((rank) => rank.active)
            .map((category) => (
              <ServingIcon servingCategory={category.category} />
            ))}
        </div>
        {user?.category_ranks
          .filter((rank) => rank.active)
          .map((category) => (
            <div
              key={category.category}
              className={`form-color ${categoryActive.get(category.category) == true && !allActive ? "category-selector-selected" : "category-selector-unselected"} category-selector-item`}
              onClick={() => toggleCategory(category.category)}
            >
              {categoryActive.get(category.category) == true && !allActive && (
                <div className="category-selector-text-container">
                  {category.category.charAt(0).toUpperCase() +
                    category.category.slice(1)}{" "}
                </div>
              )}
              <ServingIcon servingCategory={category.category} />
            </div>
          ))}
      </div>
    </div>
  );
};

export { CategorySelector };
