import "./bottomNavigator.scss";
import TestSvg from "../../assets/meat.svg";
import { MealModal } from "@/Components/MealModal/MealModal";
import { useState } from "react";
import { AlignJustify } from "lucide-react";
import { House } from "lucide-react";
import { useLocation, Link } from "react-router";
import { useCentralState } from "@/hooks/useCentralState";
import { CircleUserRound } from "lucide-react";
import { Trophy } from "lucide-react";

function BottomNavigator() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const { setEditPortion } = useCentralState();

  const location = useLocation();

  const openModal = () => {
    setOpenAddModal(true);
  };

  const closeModal = () => {
    setEditPortion(null);
    setOpenAddModal(false);
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
              <AlignJustify color="black" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
        <div className="bottom-navigator-middle">
          <div className="bottom-navigator-circle">
            <img
              src={TestSvg}
              alt="test"
              onClick={openModal}
              style={{ width: "32px" }}
            />
          </div>
        </div>
        <div className="bottom-navigator-child">
          <div
            className={`bottom-navigator-side-item ${location.pathname.includes("trophys") ? "bottom-navigator-selected" : ""}`}
          >
            <Link to="/trophys">
              <Trophy strokeWidth={1.5} color="black" />
            </Link>
          </div>
          <div
            className={`bottom-navigator-side-item ${location.pathname.includes("account") ? "bottom-navigator-selected" : ""}`}
          >
            <Link to="/account">
              <CircleUserRound strokeWidth={1.5} color="black" />
            </Link>
          </div>
        </div>
      </div>
      <MealModal open={openAddModal} onClose={closeModal} />
    </div>
  );
}

export { BottomNavigator };
