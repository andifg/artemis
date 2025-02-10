import "./portion.scss";

import { Trash2 } from "lucide-react";
import ChickenLeg from "../../assets/chicken-leg.svg";

import { MeatPortion } from "@/client/types";

type PortionProps = {
  portion: MeatPortion;
};

const Portion = ({ portion }: PortionProps) => {
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
      <div className="portion-note">{portion.note || "Note ..."}</div>
      <div className="portion-delete-icon">
        <Trash2  strokeWidth={1}/>
      </div>
    </div>
  );
};

export { Portion };
