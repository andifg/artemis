import { ServingCategory } from "@/client/types";
import { ServingIcon } from "../ServingIcon/ServingIcon";

type AverageMeatPortionsValuesProps = {
  currentValue?: number;
  lastValue?: number;
  category: ServingCategory;
};

const AverageMeatPortionsValues = ({
  currentValue,
  lastValue,
  category,
}: AverageMeatPortionsValuesProps) => {
  let changeRate = 0;
  if (lastValue != undefined && lastValue != 0 && currentValue != undefined) {
    changeRate = ((currentValue - lastValue) / lastValue) * 100;
  }

  return (
    <div className="average-meat-portions-value-header">
      <div className="average-meat-portions-values-area">
        <div className="average-meat-portions-value">
          {currentValue == undefined ? 0 : currentValue.toFixed(0)}
        </div>
        <div
          className={`average-meat-portions-diff ${changeRate < 0 && "average-meat-portions-diff-negative"} ${changeRate == 0 && "average-meat-portions-diff-zero"} ${changeRate > 0 && "average-meat-portions-diff-positive"}`}
        >
          {changeRate == undefined ? 0 : changeRate.toFixed(0)}%
        </div>
      </div>
      <div className="average-meat-portions-icon">
        <ServingIcon servingCategory={category} />
      </div>
    </div>
  );
};

export { AverageMeatPortionsValues };
