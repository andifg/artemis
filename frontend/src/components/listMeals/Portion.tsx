import "./portion.scss";

import { RefObject, useRef } from "react";

import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import ChickenLeg from "../../assets/chicken-leg.svg";

import { useCentralState } from "@/hooks/useCentralState";

import { MeatPortion } from "@/client/types";

type PortionProps = {
  portion: MeatPortion;
  selectedForDeletion: MeatPortion | null;
  selectForDeletion: (
    portion: MeatPortion,
    ref: RefObject<HTMLElement>,
  ) => void;
};

const Portion = ({
  portion,
  selectedForDeletion,
  selectForDeletion,
}: PortionProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setEditPortion } = useCentralState();

  const handleDeleteFirstClick = () => {
    console.log("Selected for deletion : ", portion);
    selectForDeletion(portion, inputRef);
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
      <div className="portion-edit-icon">
        <Pencil
          strokeWidth={1}
          stroke="black"
          onClick={() => setEditPortion(portion)}
        />
      </div>
      <div
        className={`portion-delete-icon ${portion.id === selectedForDeletion?.id ? "portion-confirm-delete-icon" : ""}`}
        ref={inputRef}
      >
        <Trash2
          strokeWidth={1}
          stroke={portion.id === selectedForDeletion?.id ? "white" : "black"}
          onClick={handleDeleteFirstClick}
        />
      </div>
    </div>
  );
};

export { Portion };
