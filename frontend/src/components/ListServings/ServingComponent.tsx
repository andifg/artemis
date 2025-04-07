import "./serving.scss";

import { RefObject, useRef } from "react";

import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import ChickenLeg from "../../assets/chicken-leg.svg";

import { useCentralState } from "@/hooks/useCentralState";

import { Serving } from "@/client/types";

type PortionProps = {
  serving: Serving;
  selectedForDeletion: Serving | null;
  selectForDeletion: (serving: Serving, ref: RefObject<HTMLElement>) => void;
};

const ServingComponent = ({
  serving,
  selectedForDeletion,
  selectForDeletion,
}: PortionProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setEditServing } = useCentralState();

  const handleDeleteFirstClick = () => {
    console.log("Selected for deletion : ", serving);
    selectForDeletion(serving, inputRef);
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
    <div className="serving">
      <img src={ChickenLeg} alt="chicken leg" className="serving-icon" />
      <div className="serving-size">{getSize(serving.size || "medium")}</div>
      <div className="serving-note">{serving.note && serving.note}</div>
      <div className="serving-edit-icon">
        <Pencil
          strokeWidth={1}
          stroke="black"
          onClick={() => setEditServing(serving)}
        />
      </div>
      <div
        className={`serving-delete-icon ${serving.id === selectedForDeletion?.id ? "serving-confirm-delete-icon" : ""}`}
        ref={inputRef}
      >
        <Trash2
          strokeWidth={1}
          stroke={serving.id === selectedForDeletion?.id ? "white" : "black"}
          onClick={handleDeleteFirstClick}
        />
      </div>
    </div>
  );
};

export { ServingComponent };
