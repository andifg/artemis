import "./TimeFrameSelector.scss";
import { Timeframe } from "@/client/types";
import { useCentralState } from "@/hooks/useCentralState";

type TimeFrameMap = {
  [key in Timeframe]: string;
};

const TimeFrameSelector = () => {
  const { timeFrame, setTimeFrame } = useCentralState();

  const timeFrameMap: TimeFrameMap = {
    week: "W",
    month: "M",
    quarter: "Q",
  };

  return (
    <div className="time-frame-selector">
      {Object.entries(timeFrameMap).map(([key, value]) => (
        <div
          key={key}
          className={`time-frame-selector-item ${key == timeFrame ? "time-frame-selector-selected" : ""}`}
          onClick={() => setTimeFrame(key as Timeframe)}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export { TimeFrameSelector };
