import "./bottomNavigator.scss";
import { ServingModal } from "@/Components/ServingModal/ServingModal";
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

  const { setEditServing } = useCentralState();

  const location = useLocation();

  const openModal = () => {
    setOpenAddModal(true);
  };

  const closeModal = () => {
    setEditServing(null);
    setOpenAddModal(false);
  };

  return (
    <div className="bottom-navigator-wrapper">
      <div className="bottom-navigator">
        <div
          className={`bottom-navigator-child ${location.pathname.includes("dashboard") ? "bottom-navigator-selected" : ""}`}
        >
          <Link to="/dashboard" className="bottom-navigator-link">
            <House strokeWidth={1.5} className="bottom-navigator-icon" />
            Overview
          </Link>
        </div>

        <div
          className={`bottom-navigator-child ${location.pathname.includes("list") ? "bottom-navigator-selected" : ""}`}
        >
          <Link to="/list" className="bottom-navigator-link">
            <AlignJustify strokeWidth={1.5} className="bottom-navigator-icon" />
            Servings
          </Link>
        </div>

        <div className={`bottom-navigator-child `}>
          <div className="bottom-navigator-link" onClick={openModal}>
            <CirclePlus
              color="var(--text-primary)"
              strokeWidth={1.5}
              width={24}
              height={24}
            />
            Record
          </div>
        </div>

        <div
          className={`bottom-navigator-child ${location.pathname.includes("trophys") ? "bottom-navigator-selected" : ""}`}
        >
          <Link to="/trophys" className="bottom-navigator-link">
            <Trophy strokeWidth={1.5} className="bottom-navigator-icon" />
            Trophies
          </Link>
        </div>

        <div
          className={`bottom-navigator-child ${location.pathname.includes("account") ? "bottom-navigator-selected" : ""}`}
        >
          <Link to="/account" className="bottom-navigator-link">
            <CircleUserRound
              strokeWidth={1.5}
              className="bottom-navigator-icon"
            />
            Account
          </Link>
        </div>
      </div>

      <ServingModal open={openAddModal} onClose={closeModal} />
    </div>
  );
}

export { BottomNavigator };
