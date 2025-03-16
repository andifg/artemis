import { AverageMeatPortions } from "@/client/types";

type AverageMeatPortionsValuesProps = {
  averageMeatPortions: AverageMeatPortions | undefined;
};

const AverageMeatPortionsValues = ({
  averageMeatPortions,
}: AverageMeatPortionsValuesProps) => {
  return (
    <div className="average-meat-portions-value-header">
      <div className="average-meat-portions-value">
        {averageMeatPortions == undefined ? 0 : averageMeatPortions.Value}
      </div>
      <div
        className={`average-meat-portions-diff ${averageMeatPortions && averageMeatPortions.ChangeRate < 0 && "average-meat-portions-diff-negative"} ${averageMeatPortions && averageMeatPortions.ChangeRate == 0 && "average-meat-portions-diff-zero"}`}
      >
        {averageMeatPortions == undefined ? 0 : averageMeatPortions.ChangeRate}%
      </div>
    </div>
  );
};

export { AverageMeatPortionsValues };
