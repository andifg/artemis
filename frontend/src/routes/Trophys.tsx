import { BottomNavigator } from "@/Components/BottomNavigator/BottomNavigator";
import { AddMeatPortionContextProvider } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContextProvider } from "@/contexts/deleteMeatPortionContext";
import { GenericHeader } from "@/Components/GenericHeader/GenericHeader";
import { MainLayout } from "@/Components/Layout/MainLayout";

const Trophys = () => {
  return (
    <AddMeatPortionContextProvider>
      <DeleteMeatPortionContextProvider>
        <MainLayout
          header={<GenericHeader header="Trophys" />}
          mainArea={<h1>Coming soon ...</h1>}
          footer={<BottomNavigator />}
        />
      </DeleteMeatPortionContextProvider>
    </AddMeatPortionContextProvider>
  );
};

export { Trophys };
