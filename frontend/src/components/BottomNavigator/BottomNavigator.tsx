import "./bottomNavigator.scss";
import { MealModal } from "@/Components/MealModal/MealModal";
import { useState } from "react";
import { AlignJustify } from "lucide-react";
import { House } from "lucide-react";
import { useLocation, Link } from "react-router";
import { useCentralState } from "@/hooks/useCentralState";
import { CircleUserRound } from "lucide-react";
import { Trophy } from "lucide-react";
import { CirclePlus } from "lucide-react";

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
        <div
          className={`bottom-navigator-child ${location.pathname.includes("dashboard") ? "bottom-navigator-selected" : ""}`}
        >
          <Link to="/dashboard" className="buttom-navigator-link">
            <House
              strokeWidth={1.5}
              // color="black"
              className="buttom-navigator-icon"
            />
          </Link>
        </div>

        <div
          className={`bottom-navigator-child ${location.pathname.includes("list") ? "bottom-navigator-selected" : ""}`}
        >
          <Link to="/list" className="buttom-navigator-link">
            <AlignJustify strokeWidth={1.5} className="buttom-navigator-icon" />
          </Link>
        </div>

        <div className={`bottom-navigator-child `}>
          <div className="buttom-navigator-link" onClick={openModal}>
            <CirclePlus
              color="var(--text-primary)"
              strokeWidth={1.5}
              width={28}
              height={28}
            />
          </div>
        </div>

        <div
          className={`bottom-navigator-child ${location.pathname.includes("trophys") ? "bottom-navigator-selected" : ""}`}
        >
          <Link to="/trophys" className="buttom-navigator-link">
            <Trophy strokeWidth={1.5} className="buttom-navigator-icon" />
          </Link>
        </div>

        <div
          className={`bottom-navigator-child ${location.pathname.includes("account") ? "bottom-navigator-selected" : ""}`}
        >
          <Link to="/account" className="buttom-navigator-link">
            <CircleUserRound
              strokeWidth={1.5}
              className="buttom-navigator-icon"
            />
          </Link>
        </div>
      </div>

      <MealModal open={openAddModal} onClose={closeModal} />
    </div>
  );
}

export { BottomNavigator };
