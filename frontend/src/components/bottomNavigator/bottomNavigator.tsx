import "./bottomNavigator.scss";
import TestSvg from "../../assets/meat.svg";
import { AddMealSheet } from "@/components/addMeal/AddMealSheet";
import { ListMealsSheet } from "../listMeals/ListMealsSheet";
import { useState } from "react";
import { List } from "lucide-react";

function BottomNavigator() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openList, setOpenList] = useState<boolean>(false);

  const toggleList = () => {
    setOpenList((prev) => !prev);
  };

  const toggleAddModal = () => {
    setOpenAddModal((prev) => !prev);
  };

  return (
    <>
      <div className="bottom-navigator">
        <div className="bottom-navigator-left bottom-navigator-child">
          <div className="bottom-navigator-list-wrapper">
            <List onClick={toggleList} color="black" />
          </div>
        </div>
        <div className="bottom-navigator-child bottom-navigator-middle">
          <div className="bottom-navigator-circle">
            <img
              src={TestSvg}
              alt="test"
              onClick={toggleAddModal}
              style={{ width: "50px" }}
            />
          </div>
        </div>
        <div className="bottom-navigator-right bottom-navigator-child"></div>
      </div>
      <AddMealSheet open={openAddModal} onClose={toggleAddModal} />
      <ListMealsSheet open={openList} onClose={toggleList} />
    </>
  );
}

export { BottomNavigator };
