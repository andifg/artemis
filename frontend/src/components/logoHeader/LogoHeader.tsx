import "./LogoHeader.scss";
import MyGreenDaysLogo from "/mygreendays-logo.png";

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
        src={MyGreenDaysLogo}
        alt="test"
        style={{
          height: "40px",
          width: "auto",
          margin: "5px",
          display: "block",
        }}
      />
    </div>
  );
}

export { LogoHeader };
