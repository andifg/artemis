import "./veggieStreak.scss";
import { DashboardBox } from "../DashboardBox/DashboardBox";
import FireLogo from "../../assets/fire.svg";
import { useVeggieStreak } from "./useVeggieStreak";
import { useCentralState } from "@/hooks/useCentralState";
import { ServingCategory } from "@/client/types";

function VeggieStreak() {
  const { loading } = useVeggieStreak();

  const { servingStreaks } = useCentralState();

  const servingCategoriesPriorities: Record<number, ServingCategory> = {
    1: "meat",
    2: "vegetarian",
    3: "alcohol",
    4: "candy",
  };

  const streakNames: Record<ServingCategory, string> = {
    meat: "Meatless",
    vegetarian: "Vegan",
    alcohol: "Alcoholfree",
    candy: "Sugarfree",
  };

  return (
    <DashboardBox>
      <div className="veggie-streak">
        <div className="veggie-streak-icon">
          <img src={FireLogo} alt="fire" />
        </div>
        <div className="veggie-streak-text">
          {loading && servingStreaks.length == 0 ? (
            <p>Loading</p>
          ) : (
            Object.entries(servingCategoriesPriorities).map((priority) => {
              return (
                <p>
                  {servingStreaks.find(
                    (streak) => streak.serving_category == priority[1],
                  )?.streak || 0}{" "}
                  days {streakNames[priority[1]]} Streak
                </p>
              );
            })
          )}
        </div>
      </div>
    </DashboardBox>
  );
}

export { VeggieStreak };
