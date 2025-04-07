import { MainLayout } from "@/Components/Layout/MainLayout";
import { BottomNavigator } from "@/Components/BottomNavigator/BottomNavigator";
import { LogoHeader } from "@/Components/LogoHeader/LogoHeader";
import { VeggieStreak } from "@/Components/VeggiStreak/VeggieStreak";
import { DailyOverview } from "@/Components/DailyOverview/DailyOverview";
import { AverageMeatPortions } from "@/Components/AverageMeatPortions/AverageMeatPortions";
import { MeatPortionsChart } from "@/Components/MeatPortionsChart/MeatPortionsChart";
import { AddServingContextProvider } from "@/contexts/addServingContext";
import { DeleteServingContextProvider } from "@/contexts/deleteServingContext";

function Dashboard() {
  return (
    <AddServingContextProvider>
      <DeleteServingContextProvider>
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
      </DeleteServingContextProvider>
    </AddServingContextProvider>
  );
}

export { Dashboard };
