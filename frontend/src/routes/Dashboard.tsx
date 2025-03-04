import "./Dashboard.scss";

import { Layout } from "@/components/layout/layout";
import { BottomNavigator } from "@/components/bottomNavigator/bottomNavigator";
import { LogoHeader } from "@/components/logoHeader/LogoHeader";
import { VeggieStreak } from "@/components/veggiStreak/VeggieStreak";
import { DailyOverview } from "@/components/dailyOverview/dailyOverview";
import { AverageAndChartWrapper } from "@/components/averageAndChartWrapper/averageAndChartWrapper";
import { AddMeatPortionContextProvider } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContextProvider } from "@/contexts/deleteMeatPortionContext";

function Dashboard() {
  return (
    <>
      <Layout>
        <LogoHeader />
        <AddMeatPortionContextProvider>
          <DeleteMeatPortionContextProvider>
            <div className="dashboard-main">
              <DailyOverview />
              <VeggieStreak />
              <AverageAndChartWrapper />
            </div>
            <BottomNavigator />
          </DeleteMeatPortionContextProvider>
        </AddMeatPortionContextProvider>
      </Layout>
    </>
  );
}

export { Dashboard };
