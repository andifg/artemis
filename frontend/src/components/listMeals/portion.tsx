import "./Portion.scss";

import { Trash2 } from "lucide-react";
import ChickenLeg from "../../assets/chicken-leg.svg";

import { useState } from "react";

import { MeatPortion } from "@/client/types";

type PortionProps = {
  portion: MeatPortion;
};

const Portion = ({ portion }: PortionProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteFirstClick = () => {
    setConfirmDelete(true);
  };

  const getSize = (size: string) => {
    switch (size) {
      case "small":
        return "S";
      case "medium":
        return "M";
      case "large":
        return "L";
      default:
        return undefined;
    }
  };

  return (
    <div className="portion">
      <img src={ChickenLeg} alt="chicken leg" className="portion-icon" />
      <div className="portion-size">{getSize(portion.size || "medium")}</div>
      <div className="portion-note">{portion.note && portion.note}</div>
      <div
        className={`portion-delete-icon ${confirmDelete ? "portion-confirm-delete-icon" : ""}`}
      >
        <Trash2
          strokeWidth={1}
          stroke={confirmDelete ? "white" : "black"}
          onClick={handleDeleteFirstClick}
        />
      </div>
    </div>
  );
};

export { Portion };
