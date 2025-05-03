import "./settings.scss";
import { DayHeader } from "../ListServings/DayHeader";
import { Button } from "../ui/button";
import { useAuthentication } from "@/hooks/useAuthentication";
import { ExternalLink } from "lucide-react";
import { LogOut } from "lucide-react";
import { CategorySettings } from "../CategorySettings/CategorySettings";
import { InfoPopover } from "../InfoPopover/InfoPopover";

const Settings = () => {
  const { logout } = useAuthentication();

  const logOut = () => {
    console.log("WIll logout");
    logout();
  };

  return (
    <div className="account">
      <div>
        <DayHeader>
          Category Settings{" "}
          <InfoPopover>
            <div className="category-settings-popover-section-title">
              Activate/Deactivate Category:
            </div>
            <div className="category-settings-popover-section-text">
              This allows you to hide categories that you do not want to use/see
              in the app at all. If you want to hide a category only in the
              analysis, you can do this via the quick filters on the home
              screen.
            </div>
            <div className="category-settings-popover-section-title">
              Change Category Order:
            </div>
            <div className="category-settings-popover-section-text">
              This allows you to order serving categories for all analysis
              within the app
            </div>
            <div className="category-settings-popover-section-title">
              Change Weekly Limit:
            </div>
            <div className="category-settings-popover-section-text">
              Define your personal weekly limit target for the serving
              categories. This is the amount of servings (independendent of the
              serving size) you want to maximally consume on average per week
            </div>
          </InfoPopover>{" "}
        </DayHeader>
        <CategorySettings />
        <DayHeader>Settings </DayHeader>
        <Button
          className="settings-logout-button"
          onClick={logOut}
          variant={"outline"}
        >
          Logout <LogOut />
        </Button>
      </div>
      <div>
        <DayHeader>Infos </DayHeader>
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
