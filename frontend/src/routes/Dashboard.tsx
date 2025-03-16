import "./dashboard.scss";

import { Layout } from "@/Components/Layout/Layout";
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
    <>
      <Layout>
        <LogoHeader />
        <AddMeatPortionContextProvider>
          <DeleteMeatPortionContextProvider>
            <div className="dashboard-main">
              <DailyOverview />
              <VeggieStreak />
              <AverageMeatPortions />
              <MeatPortionsChart />
            </div>
            <BottomNavigator />
          </DeleteMeatPortionContextProvider>
        </AddMeatPortionContextProvider>
      </Layout>
    </>
  );
}

export { Dashboard };
