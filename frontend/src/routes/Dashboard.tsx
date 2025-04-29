import { MainLayout } from "@/Components/Layout/MainLayout";
import { BottomNavigator } from "@/Components/BottomNavigator/BottomNavigator";
import { LogoHeader } from "@/Components/LogoHeader/LogoHeader";
import { VeggieStreak } from "@/Components/VeggiStreak/VeggieStreak";
import { DailyOverview } from "@/Components/DailyOverview/DailyOverview";
import { AddServingContextProvider } from "@/contexts/addServingContext";
import { DeleteServingContextProvider } from "@/contexts/deleteServingContext";
import { AnalyticsWrapper } from "@/Components/AnalyticsWrapper/AnalyticsWrapper";
import { useLoadUser } from "@/hooks/useLoadUser";

function Dashboard() {
  useLoadUser();

  return (
    <AddServingContextProvider>
      <DeleteServingContextProvider>
        <MainLayout
          header={<LogoHeader />}
          mainArea={
            <>
              <DailyOverview />
              <VeggieStreak />
              <AnalyticsWrapper />
            </>
          }
          footer={<BottomNavigator />}
        />
      </DeleteServingContextProvider>
    </AddServingContextProvider>
  );
}

export { Dashboard };
