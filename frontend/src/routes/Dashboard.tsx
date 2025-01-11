import { Layout } from "@/components/layout/layout";
import { BottomNavigator } from "@/components/bottomNavigator/bottomNavigator";
import { LogoHeader } from "@/components/logoHeader/LogoHeader";
import { VeggieStreak } from "@/components/veggiStreak/VeggieStreak";
import { DailyOverview } from "@/components/dailyOverview/dailyOverview";
import { AverageAndChartWrapper } from "@/components/averageAndChartWrapper/averageAndChartWrapper";
import { AddMeatPortionContextProvider } from "@/contexts/addMeatPortionContext";

function Dashboard() {
  return (
    <>
      <Layout>
        <LogoHeader />
        <AddMeatPortionContextProvider>
          <div
            className="dashboard-main"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
              marginBottom: "100px",
            }}
          >
            <DailyOverview />
            <VeggieStreak />
            <AverageAndChartWrapper />
          </div>
          <BottomNavigator />
        </AddMeatPortionContextProvider>
      </Layout>
    </>
  );
}

export { Dashboard };
