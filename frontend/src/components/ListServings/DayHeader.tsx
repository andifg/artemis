import "./dayHeader.scss";

type DayHeaderProps = {
  children?: React.ReactNode;
};

const DayHeader = ({ children }: DayHeaderProps) => {
  return (
    <div className="day-header">
      <div className="day-header-line day-header-line-left"></div>
      <div className="day-header-date">{children}</div>
      <div className="day-header-line day-header-line-right"></div>
    </div>
  );
};

export { DayHeader };
