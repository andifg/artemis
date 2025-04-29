import "./day.scss";
import { useCentralState } from "@/hooks/useCentralState";
import { DailyOverview, ServingCategory } from "@/client/types";
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
  const { setSelectedDate, selectedDate, user } = useCentralState();

  type ServingKeys = Extract<
    keyof DailyOverview,
    | "meat_portions"
    | "vegetarian_portions"
    | "alcohol_portions"
    | "candy_portions"
  >;

  const DayMap: Record<ServingCategory, ServingKeys> = {
    meat: "meat_portions",
    vegetarian: "vegetarian_portions",
    alcohol: "alcohol_portions",
    candy: "candy_portions",
  };

  const filterDayOverview = (dayOverview: DailyOverview): DailyOverview => {
    if (!user?.category_ranks) {
      return dayOverview;
    }

    const updatedDayOverview = { ...dayOverview };

    for (const category of user.category_ranks) {
      if (!category.active) {
        const key = DayMap[category.category];

        updatedDayOverview[key] = 0;
      }
    }
    return updatedDayOverview;
  };

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
        {<SelectIcon dayOverview={filterDayOverview(dayOverview)} />}
      </div>
    </div>
  );
}

export { Day };
