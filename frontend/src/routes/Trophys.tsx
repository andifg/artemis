import { BottomNavigator } from "@/Components/BottomNavigator/BottomNavigator";
import { AddServingContextProvider } from "@/contexts/addServingContext";
import { DeleteServingContextProvider } from "@/contexts/deleteServingContext";
import { GenericHeader } from "@/Components/GenericHeader/GenericHeader";
import { MainLayout } from "@/Components/Layout/MainLayout";

const Trophys = () => {
  return (
    <AddServingContextProvider>
      <DeleteServingContextProvider>
        <MainLayout
          header={<GenericHeader header="Trophys" />}
          mainArea={<h1>Coming soon ...</h1>}
          footer={<BottomNavigator />}
        />
      </DeleteServingContextProvider>
    </AddServingContextProvider>
  );
};

export { Trophys };
