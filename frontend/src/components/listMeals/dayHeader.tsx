import "./dayHeader.scss";

type DayHeaderProps = {
  day: string;
};

const DayHeader = ({ day }: DayHeaderProps) => {
  return (
    <div className="day-header">
      <div className="day-header-line day-header-line-left"></div>
      <div className="day-header-date">{day}</div>
      <div className="day-header-line day-header-line-right"></div>
    </div>
  );
};

export { DayHeader };
