import { useState } from "react";

import { AverageMeatPortions } from "../averageMeatPortions/averageMeatPortions";
import { MeatPortionsChart } from "../meatPortionsChart/meatPortionsChart";
import { Timeframe } from "@/client/types";

function AverageAndChartWrapper() {
  const [selected, setSelected] = useState<Timeframe>("week");

  return (
    <>
      <AverageMeatPortions selected={selected} setSelected={setSelected} />
      <MeatPortionsChart selected={selected} />
    </>
  );
}

export { AverageAndChartWrapper };
