import { useState } from "react";

import { AverageMeatPortions } from "../AverageMeatPortions/AverageMeatPortions";
import { MeatPortionsChart } from "../MeatPortionsChart/MeatPortionsChart";
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
