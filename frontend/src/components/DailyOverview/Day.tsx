import "./day.scss";
import { useCentralState } from "@/hooks/useCentralState";
import { DailyOverview } from "@/client/types";
import { SelectIcon } from "./SelectIcon";

export type DailyOverviewEntry = {
  dayOverview: DailyOverview;
};

type DayProps = DailyOverviewEntry;

function getFirstCharacterOfWeekday(date: Date): string {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const dayIndex = date.getDay();
  return weekdays[dayIndex];
}

function Day({ dayOverview }: DayProps) {
  const { setSelectedDate, selectedDate } = useCentralState();

  const isInactive =
    new Date(dayOverview.date) > new Date(new Date().setHours(23, 59, 59, 999));
  const isSelected =
    new Date(dayOverview.date).toDateString() == selectedDate.toDateString();

  const selectDate = () => {
    if (
      new Date(dayOverview.date) <=
      new Date(new Date().setHours(23, 59, 59, 999))
    ) {
      setSelectedDate(new Date(dayOverview.date));
    }
  };

  return (
    <div className="day">
      <div className="day-section">
        <div
          className={`day-day ${isSelected ? "day-date-selected" : ""} ${isInactive ? "day-date-unactive" : ""}`}
          onClick={selectDate}
        >
          {getFirstCharacterOfWeekday(new Date(dayOverview.date))}
        </div>
      </div>
      <div className="day-image">
        {<SelectIcon dayOverview={dayOverview} />}
      </div>
    </div>
  );
}

export { Day };
