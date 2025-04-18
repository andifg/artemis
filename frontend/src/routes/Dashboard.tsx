import { MainLayout } from "@/Components/Layout/MainLayout";
import { BottomNavigator } from "@/Components/BottomNavigator/BottomNavigator";
import { LogoHeader } from "@/Components/LogoHeader/LogoHeader";
import { VeggieStreak } from "@/Components/VeggiStreak/VeggieStreak";
import { DailyOverview } from "@/Components/DailyOverview/DailyOverview";
import { ServingsChart } from "@/Components/MeatPortionsChart/ServingsChart";
import { AddServingContextProvider } from "@/contexts/addServingContext";
import { DeleteServingContextProvider } from "@/contexts/deleteServingContext";
import { AnalyticsWrapper } from "@/Components/AnalyticsWrapper/AnalyticsWrapper";

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
              <ServingsChart />
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
