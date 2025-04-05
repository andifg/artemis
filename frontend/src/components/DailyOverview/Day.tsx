import "./day.scss";
import ChickenLeg from "../../assets/chicken-leg.svg";
import Brocoli from "../../assets/broccoli.svg";
import { useCentralState } from "@/hooks/useCentralState";

export type DailyOverviewEntry = {
  date: Date;
  meatConsumed: boolean;
};

type DayProps = DailyOverviewEntry;

function getFirstCharacterOfWeekday(date: Date): string {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const dayIndex = date.getDay();
  return weekdays[dayIndex];
}

function Day({ date, meatConsumed }: DayProps) {
  const { setSelectedDate, selectedDate } = useCentralState();

  const isInactive = date > new Date(new Date().setHours(23, 59, 59, 999));
  const isSelected = date.toDateString() == selectedDate.toDateString();

  const selectDate = () => {
    if (date <= new Date(new Date().setHours(23, 59, 59, 999))) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="day">
      <div className="day-section">
        <div
          className={`day-day ${isSelected ? "day-date-selected" : ""} ${isInactive ? "day-date-unactive" : ""}`}
          onClick={selectDate}
        >
          {getFirstCharacterOfWeekday(date)}
        </div>
      </div>
      <div className="day-image">
        {meatConsumed ? (
          <img src={ChickenLeg} alt="chicken leg" className="day-image-image" />
        ) : (
          <img
            src={Brocoli}
            alt="broccoli"
            className={`day-image-image ${isInactive ? "day-image-image-inactive" : ""}`}
          />
        )}
      </div>
    </div>
  );
}

export { Day };
