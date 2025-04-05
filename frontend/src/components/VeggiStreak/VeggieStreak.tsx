import "./veggieStreak.scss";
import { DashboardBox } from "../DashboardBox/DashboardBox";
import FireLogo from "../../assets/fire.svg";
import { useVeggieStreak } from "./useVeggieStreak";

function VeggieStreak() {
  const { loading, streak } = useVeggieStreak();

  return (
    <DashboardBox>
      <div className="veggie-streak">
        <div className="veggie-streak-icon">
          <img src={FireLogo} alt="fire" />
        </div>
        <div className="veggie-streak-text text-primary">
          {(!loading || streak != 0) && streak} Days Veggie Streak
        </div>
      </div>
    </DashboardBox>
  );
}

export { VeggieStreak };
