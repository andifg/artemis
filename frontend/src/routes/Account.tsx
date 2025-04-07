import { BottomNavigator } from "@/Components/BottomNavigator/BottomNavigator";
import { AddServingContextProvider } from "@/contexts/addServingContext";
import { DeleteServingContextProvider } from "@/contexts/deleteServingContext";
import { GenericHeader } from "@/Components/GenericHeader/GenericHeader";
import { MainLayout } from "@/Components/Layout/MainLayout";
import { useAuthentication } from "@/hooks/useAuthentication";
import { Settings } from "@/Components/Settings/Settings";

const Account = () => {
  const { getUser } = useAuthentication();
  const user = getUser();

  return (
    <AddServingContextProvider>
      <DeleteServingContextProvider>
        <MainLayout
          header={<GenericHeader header={`Hello ${user.username}`} />}
          mainArea={
            <>
              <Settings />
            </>
          }
          footer={<BottomNavigator />}
        />
      </DeleteServingContextProvider>
    </AddServingContextProvider>
  );
};

export { Account };
