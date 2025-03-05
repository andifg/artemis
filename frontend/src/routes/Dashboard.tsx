import "./Dashboard.scss";

// import { Layout } from "@/components/layout/layout";
// import { BottomNavigator } from "@/components/bottomNavigator/bottomNavigator";
// import { LogoHeader } from "@/components/logoHeader/LogoHeader";
// import { VeggieStreak } from "@/components/veggiStreak/VeggieStreak";
// import { DailyOverview } from "@/components/dailyOverview/dailyOverview";
// import { AverageAndChartWrapper } from "@/components/averageAndChartWrapper/averageAndChartWrapper";
// import { AddMeatPortionContextProvider } from "@/contexts/addMeatPortionContext";
// import { DeleteMeatPortionContextProvider } from "@/contexts/deleteMeatPortionContext";

import FadeOutComponent from "./Test";

import { useState } from "react";

function Dashboard() {
  const [isMounted, setIsMounted] = useState(true);
  return (
    <>
    <div>
      <button onClick={() => {setIsMounted(true)}}>Re-mount</button>
      {isMounted && <FadeOutComponent remove={() => {setIsMounted(false)}} />}
    </div>
      {/* <Layout>
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
      </Layout> */}
    </>
  );
}

export { Dashboard };
