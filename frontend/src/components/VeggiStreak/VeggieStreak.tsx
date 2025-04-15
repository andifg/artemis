import "./veggieStreak.scss";
import { DashboardBox } from "../DashboardBox/DashboardBox";
import FireLogo from "../../assets/fire.svg";
import { useVeggieStreak } from "./useVeggieStreak";
import { useCentralState } from "@/hooks/useCentralState";
import { ServingCategory } from "@/client/types";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
        <div className="">
          <Carousel
            orientation="vertical"
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
          >
            <CarouselContent className="max-h-10">
              {loading && servingStreaks.length == 0 ? (
                <CarouselItem>loading ....</CarouselItem>
              ) : (
                Object.entries(servingCategoriesPriorities).map((priority) => {
                  return (
                    <CarouselItem>
                      {" "}
                      {servingStreaks.find(
                        (streak) => streak.serving_category == priority[1],
                      )?.streak || 0}{" "}
                      Days {streakNames[priority[1]]} Streak
                    </CarouselItem>
                  );
                })
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </DashboardBox>
  );
}

export { VeggieStreak };
