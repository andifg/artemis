import "./servingCategorySlider.scss";
import { Slider } from "../ui/slider";
import { useCentralState } from "@/hooks/useCentralState";
// import { useSaveSlider } from "./useSaveSlider";
import { Skeleton } from "../ui/skeleton";
import { ServingCategory } from "@/client/types";

const ServingCategorySlider = ({
  category,
  active,
}: {
  category: ServingCategory;
  active: boolean;
}) => {
  // const { loading } = useSaveSlider({ category });

  const { user, setLimit } = useCentralState();

  const limitMap = {
    meat: user.weekly_meat_limit,
    vegetarian: user.weekly_vegetarian_limit,
    alcohol: user.weekly_alcohol_limit,
    candy: user.weekly_candy_limit,
  };

  const limit = limitMap[category as keyof typeof limitMap];

  return (
    <div className="serving-category-slider">
      <div className="serving-category-slider-header">
        <div className="serving-category-slider-header-text">Weekly Limit:</div>
        <div className="slider-value">
          {limit === undefined ? <Skeleton className="h-12 w-12" /> : limit}
        </div>
      </div>
      <>
        <div className="slider-wrapper">
          0
          <Slider
            value={[limit ?? 10]}
            disabled={!active}
            max={20}
            step={1}
            className="m-2"
            onValueChange={(value) => {
              console.log(`Slider ${category} value: `, value[0]);
              setLimit(category, value[0]);
            }}
          />
          20
        </div>
      </>
    </div>
  );
};

export { ServingCategorySlider };
