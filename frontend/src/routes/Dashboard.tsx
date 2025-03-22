import { MainLayout } from "@/Components/Layout/MainLayout";
import { BottomNavigator } from "@/Components/BottomNavigator/BottomNavigator";
import { LogoHeader } from "@/Components/LogoHeader/LogoHeader";
import { VeggieStreak } from "@/Components/VeggiStreak/VeggieStreak";
import { DailyOverview } from "@/Components/DailyOverview/DailyOverview";
import { AverageMeatPortions } from "@/Components/AverageMeatPortions/AverageMeatPortions";
import { MeatPortionsChart } from "@/Components/MeatPortionsChart/MeatPortionsChart";
import { AddMeatPortionContextProvider } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContextProvider } from "@/contexts/deleteMeatPortionContext";

function Dashboard() {
  return (
    <AddMeatPortionContextProvider>
      <DeleteMeatPortionContextProvider>
        <MainLayout
          header={<LogoHeader />}
          mainArea={
            <>
              <DailyOverview />
              <VeggieStreak />
              <AverageMeatPortions />
              <MeatPortionsChart />
            </>
          }
          footer={<BottomNavigator />}
        />
      </DeleteMeatPortionContextProvider>
    </AddMeatPortionContextProvider>
  );
}

export { Dashboard };
