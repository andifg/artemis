import "./LogoHeader.scss";
import MeatMeterLogo from "../../../public/meat-meter-logo.png";

type LogoHeaderProps = {
  backgroundColor?: boolean;
};

function LogoHeader({ backgroundColor = true }: LogoHeaderProps) {
  return (
    <div
      className={
        backgroundColor ? "logo-header logo-header-colored" : "logo-header"
      }
    >
      <img
        src={MeatMeterLogo}
        alt="test"
        style={{ height: "40px", width: "auto" }}
      />
    </div>
  );
}

export { LogoHeader };
