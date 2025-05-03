import { BottomNavigator } from "@/Components/BottomNavigator/BottomNavigator";
import { ListMeals } from "@/Components/ListServings/ListServings";
import { AddServingContextProvider } from "@/contexts/addServingContext";
import { DeleteServingContextProvider } from "@/contexts/deleteServingContext";
import { GenericHeader } from "@/Components/GenericHeader/GenericHeader";
import { useLoadUser } from "@/hooks/useLoadUser";

import { MainLayout } from "@/Components/Layout/MainLayout";

function List() {
  useLoadUser();
  return (
    <AddServingContextProvider>
      <DeleteServingContextProvider>
        <MainLayout
          header={<GenericHeader header="Recent Servings" />}
          mainArea={<ListMeals />}
          footer={<BottomNavigator />}
        />
      </DeleteServingContextProvider>
    </AddServingContextProvider>
  );
}

export { List };
