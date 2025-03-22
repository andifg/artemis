import "./bottomNavigator.scss";
import TestSvg from "../../assets/meat.svg";
import { AddMealSheet } from "@/Components/AddMeal/AddMealSheet";
import { useState } from "react";
import { List } from "lucide-react";
import { House } from "lucide-react";
import { useLocation, Link } from "react-router";

function BottomNavigator() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const location = useLocation();

  const toggleAddModal = () => {
    setOpenAddModal((prev) => !prev);
  };

  return (
    <div className="bottom-navigator-wrapper">
      <div className="bottom-navigator">
        <div className="bottom-navigator-child">
          <div
            className={`bottom-navigator-side-item ${location.pathname.includes("dashboard") ? "bottom-navigator-selected" : ""}`}
          >
            <Link to="/dashboard">
              <House strokeWidth={1.5} color="black" />
            </Link>
          </div>
          <div
            className={`bottom-navigator-side-item ${location.pathname.includes("list") ? "bottom-navigator-selected" : ""}`}
          >
            <Link to="/list">
              <List color="black" strokeWidth={2} />
            </Link>
          </div>
        </div>
        <div className="bottom-navigator-middle">
          <div className="bottom-navigator-circle">
            <img
              src={TestSvg}
              alt="test"
              onClick={toggleAddModal}
              style={{ width: "32px" }}
            />
          </div>
        </div>
        <div className="bottom-navigator-right bottom-navigator-child"></div>
      </div>
      <AddMealSheet open={openAddModal} onClose={toggleAddModal} />
    </div>
  );
}

export { BottomNavigator };
