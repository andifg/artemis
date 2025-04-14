import { DailyOverview } from "@/client/types";
import { ServingIcon } from "../ServingIcon/ServingIcon";
import { GenericIcon } from "../ServingIcon/GenericIcon";
import MeatBeer from "../../assets/meat-beer.svg";
import BeerCandy from "../../assets/beer-candy.svg";
import CheeseBeer from "../../assets/cheese-beer.svg";
import CheeseCandy from "../../assets/cheese-candy.svg";
import MeatCheeseBeer from "../../assets/meat-cheese-beer.svg";
import MeatCheeseCandy from "../../assets/meat-cheese-candy.svg";
import MeetBeerCandy from "../../assets/meat-beer-candy.svg";
import CheeseBeerCandy from "../../assets/cheese-beer-candy.svg";
import Brocoli from "../../assets/broccoli.svg";
import AllIcons from "../../assets/all-icons.svg";

const SelectIcon = ({ dayOverview }: { dayOverview: DailyOverview }) => {
  const selectIcon = () => {
    if (
      // only meat
      dayOverview.meat_portions > 0 &&
      dayOverview.vegetarian_portions == 0 &&
      dayOverview.alcohol_portions == 0 &&
      dayOverview.candy_portions == 0
    ) {
      return <ServingIcon servingCategory="meat" />;
    } else if (
      // only vegetarian
      dayOverview.vegetarian_portions > 0 &&
      dayOverview.meat_portions == 0 &&
      dayOverview.alcohol_portions == 0 &&
      dayOverview.candy_portions == 0
    ) {
      return <ServingIcon servingCategory="vegetarian" />;
    } else if (
      // only alcohol
      dayOverview.alcohol_portions > 0 &&
      dayOverview.meat_portions == 0 &&
      dayOverview.vegetarian_portions == 0 &&
      dayOverview.candy_portions == 0
    ) {
      return <ServingIcon servingCategory="alcohol" />;
    } else if (
      // only candy
      dayOverview.candy_portions > 0 &&
      dayOverview.meat_portions == 0 &&
      dayOverview.vegetarian_portions == 0 &&
      dayOverview.alcohol_portions == 0
    ) {
      return <ServingIcon servingCategory="candy" />;
    } else if (
      // meat and vegetarian
      dayOverview.meat_portions > 0 &&
      dayOverview.vegetarian_portions > 0 &&
      dayOverview.alcohol_portions == 0 &&
      dayOverview.candy_portions == 0
    ) {
      return <GenericIcon iconSrc={MeatBeer} />;
    } else if (
      // meat and alcohol
      dayOverview.meat_portions > 0 &&
      dayOverview.vegetarian_portions == 0 &&
      dayOverview.alcohol_portions > 0 &&
      dayOverview.candy_portions == 0
    ) {
      return <GenericIcon iconSrc={MeatBeer} />;
    } else if (
      // vegetarian and alcohol
      dayOverview.meat_portions == 0 &&
      dayOverview.vegetarian_portions > 0 &&
      dayOverview.alcohol_portions > 0 &&
      dayOverview.candy_portions == 0
    ) {
      return <GenericIcon iconSrc={CheeseBeer} />;
    } else if (
      // vegetarian and candy
      dayOverview.meat_portions == 0 &&
      dayOverview.vegetarian_portions > 0 &&
      dayOverview.alcohol_portions == 0 &&
      dayOverview.candy_portions > 0
    ) {
      return <GenericIcon iconSrc={CheeseCandy} />;
    } else if (
      // alcohol and candy
      dayOverview.meat_portions == 0 &&
      dayOverview.vegetarian_portions == 0 &&
      dayOverview.alcohol_portions > 0 &&
      dayOverview.candy_portions > 0
    ) {
      return <GenericIcon iconSrc={BeerCandy} />;
    } else if (
      // meat, vegetarian and alcohol
      dayOverview.meat_portions > 0 &&
      dayOverview.vegetarian_portions > 0 &&
      dayOverview.alcohol_portions > 0 &&
      dayOverview.candy_portions == 0
    ) {
      return <GenericIcon iconSrc={MeatCheeseBeer} />;
    } else if (
      // meat, vegetarian and candy
      dayOverview.meat_portions > 0 &&
      dayOverview.vegetarian_portions > 0 &&
      dayOverview.alcohol_portions == 0 &&
      dayOverview.candy_portions > 0
    ) {
      return <GenericIcon iconSrc={MeatCheeseCandy} />;
    } else if (
      // meat, alcohol and candy
      dayOverview.meat_portions > 0 &&
      dayOverview.vegetarian_portions == 0 &&
      dayOverview.alcohol_portions > 0 &&
      dayOverview.candy_portions > 0
    ) {
      return <GenericIcon iconSrc={MeetBeerCandy} />;
    } else if (
      // vegetarian, alcohol and candy
      dayOverview.meat_portions == 0 &&
      dayOverview.vegetarian_portions > 0 &&
      dayOverview.alcohol_portions > 0 &&
      dayOverview.candy_portions > 0
    ) {
      return <GenericIcon iconSrc={CheeseBeerCandy} />;
    } else if (
      // all four
      dayOverview.meat_portions > 0 &&
      dayOverview.vegetarian_portions > 0 &&
      dayOverview.alcohol_portions > 0 &&
      dayOverview.candy_portions > 0
    ) {
      return <GenericIcon iconSrc={AllIcons} />;
    } else {
      // meat, vegetarian, alcohol and candy
      return <GenericIcon iconSrc={Brocoli} />;
    }
  };

  return selectIcon();
};

export { SelectIcon };
