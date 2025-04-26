import "./settings.scss";
import { DayHeader } from "../ListServings/DayHeader";
import { Button } from "../ui/button";
import { useAuthentication } from "@/hooks/useAuthentication";
import { ExternalLink } from "lucide-react";
import { LogOut } from "lucide-react";
import { CategorySettings } from "../CategorySettings/CategorySettings";

const Settings = () => {
  const { logout } = useAuthentication();

  const logOut = () => {
    console.log("WIll logout");
    logout();
  };

  return (
    <div className="account">
      <div>
        <DayHeader day="Categroy Settings" />
        <CategorySettings />
        <DayHeader day="Settings" />
        <Button
          className="settings-logout-button"
          onClick={logOut}
          variant={"outline"}
        >
          Logout <LogOut />
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
