import { Slider } from "../ui/slider";
import { useCentralState } from "@/hooks/useCentralState";
import { useSaveSlider } from "./useSaveSlider";
import { Skeleton } from "../ui/skeleton";

const ServingCategorySlider = () => {
  const { loading } = useSaveSlider();

  const { meatPortionWeeklyTarget, setMeatPortionWeeklyTarget } =
    useCentralState();

  return (
    <div className="account-settings-slider">
      <div className="account-settings-slider-header">
        <div className="account-settings-slider-header-text">Weekly Limit:</div>
        <div className="slider-value">
          {meatPortionWeeklyTarget === undefined && loading ? (
            <Skeleton className="h-12 w-12" />
          ) : (
            meatPortionWeeklyTarget
          )}
        </div>
      </div>
      <>
        <div className="slider-wrapper">
          0
          <Slider
            value={[meatPortionWeeklyTarget ?? 10]}
            // disabled={meatPortionWeeklyTarget === undefined}
            max={20}
            step={1}
            className="m-2"
            onValueChange={(value) => {
              console.log("Slider value: ", value[0]);
              setMeatPortionWeeklyTarget(value[0]);
            }}
          />
          20
        </div>
      </>
    </div>
  );
};

export { ServingCategorySlider };
