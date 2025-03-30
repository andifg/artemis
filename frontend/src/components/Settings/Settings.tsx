import "./settings.scss";
import { DayHeader } from "../ListMeals/DayHeader";
import { Button } from "../ui/button";
import ChickenLeg from "../../assets/chicken-leg.svg";
import { useAuthentication } from "@/hooks/useAuthentication";
import { ExternalLink } from "lucide-react";
import { Slider } from "../ui/slider";
import { useCentralState } from "@/hooks/useCentralState";
import { useSaveSlider } from "./useSaveSlider";

const Settings = () => {
  const { logout } = useAuthentication();

  useSaveSlider();

  const { meatPortionWeeklyTarget, setMeatPortionWeeklyTarget } =
    useCentralState();

  const logOut = () => {
    console.log("WIll logout");
    logout();
  };

  return (
    <div className="account">
      <div>
        <DayHeader day="Settings" />
        <div className="account-settings-slider">
          <div className="account-settings-slider-header">
            <img src={ChickenLeg} alt="chicken leg" className="portion-icon" />
            <div className="account-settings-slider-header-text">
              Personal Weekly Meat Portion Target
            </div>
          </div>
          <div className="slider-value">{meatPortionWeeklyTarget}</div>
          <div className="slider-wrapper">
            0
            <Slider
              defaultValue={[meatPortionWeeklyTarget]}
              // disabled={true}
              max={20}
              step={1}
              className="m-2"
              onValueChange={(value) => {
                setMeatPortionWeeklyTarget(value[0]);
              }}
            />
            20
          </div>
        </div>
        <Button
          className="settings-logout-button text-black font-semibold"
          onClick={logOut}
        >
          Logout
        </Button>
      </div>
      <div>
        <DayHeader day="Infos" />
        <a href="https://www.youtube.com/watch?v=aogGIO48MDc">
          <div className="info-wrapper">
            <div>Install App instructions for iOS</div>
            <ExternalLink strokeWidth={1.5} />
          </div>
        </a>
        <a href="https://www.youtube.com/shorts/RTnJ_v9U0Tw">
          <div className="info-wrapper">
            <div>Install App instructions for Android</div>
            <ExternalLink strokeWidth={1.5} />
          </div>
        </a>
      </div>
    </div>
  );
};

export { Settings };
