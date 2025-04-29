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

  const { servingStreaks, user } = useCentralState();

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
            <CarouselContent className="max-h-10" key="veggie-streak-carousel">
              {loading && servingStreaks == undefined ? (
                <CarouselItem>loading ....</CarouselItem>
              ) : (
                user?.category_ranks
                  .filter((rank) => rank.active)
                  .map((rank) => (
                    <CarouselItem key={`${rank.category}-carousel-item`}>
                      {" "}
                      {(servingStreaks.length > 0 &&
                        servingStreaks.find(
                          (streak) => streak.serving_category == rank.category,
                        )?.streak) ||
                        0}{" "}
                      Days {streakNames[rank.category]} Streak
                    </CarouselItem>
                  ))
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </DashboardBox>
  );
}

export { VeggieStreak };
