import "./BottomNavigator.scss";
import TestSvg from "../../assets/meat.svg";
import { AddMealSheet } from "@/components/addMeal/AddMealSheet";
import { useState } from "react";

function BottomNavigator() {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className="bottom-navigator">
      Hello
      <div className="bottom-navigator-circle">
        <img
          src={TestSvg}
          alt="test"
          onClick={openModal}
          style={{ width: "50px" }}
        />
      </div>
      {/* <AddMealDrawer open={open} onClose={closeModal} /> */}
      <AddMealSheet open={open} onClose={closeModal} />
    </div>
  );
}

export { BottomNavigator };
