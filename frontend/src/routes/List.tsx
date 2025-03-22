import { BottomNavigator } from "@/Components/BottomNavigator/BottomNavigator";
import { ListMeals } from "@/Components/ListMeals/ListMeals";
import { AddMeatPortionContextProvider } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContextProvider } from "@/contexts/deleteMeatPortionContext";
import { GenericHeader } from "@/Components/GenericHeader/GenericHeader";

import { MainLayout } from "@/Components/Layout/MainLayout";

function List() {
  return (
    <AddMeatPortionContextProvider>
      <DeleteMeatPortionContextProvider>
        <MainLayout
          header={<GenericHeader header="Recent Servings" />}
          mainArea={<ListMeals />}
          footer={<BottomNavigator />}
        />
      </DeleteMeatPortionContextProvider>
    </AddMeatPortionContextProvider>
  );
}

export { List };
