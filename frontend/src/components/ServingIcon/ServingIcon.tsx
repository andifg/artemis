import "./servingIcon.scss";

import ChickenLeg from "../../assets/chicken-leg.svg";
import Beer from "../../assets/beer.svg";
import Candy from "../../assets/candy.svg";
import Vegetarian from "../../assets/cheese.svg";
import { ServingCategory } from "@/client/types";

const ServingIcon = (servingCategory: ServingCategory) => {
  const getIcon = () => {
    switch (servingCategory) {
      case "meat":
        return ChickenLeg;
      case "vegetarian":
        return Vegetarian;
      case "alcohol":
        return Beer;
      case "candy":
        return Candy;
      default:
        return ChickenLeg;
    }
  };

  return <img src={getIcon()} alt="chicken leg" className="serving-icon" />;
};

export { ServingIcon };
