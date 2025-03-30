import { BottomNavigator } from "@/Components/BottomNavigator/BottomNavigator";
import { AddMeatPortionContextProvider } from "@/contexts/addMeatPortionContext";
import { DeleteMeatPortionContextProvider } from "@/contexts/deleteMeatPortionContext";
import { GenericHeader } from "@/Components/GenericHeader/GenericHeader";
import { MainLayout } from "@/Components/Layout/MainLayout";
import { useAuthentication } from "@/hooks/useAuthentication";
import { Settings } from "@/Components/Settings/Settings";

const Account = () => {
  const { getUser } = useAuthentication();
  const user = getUser();

  return (
    <AddMeatPortionContextProvider>
      <DeleteMeatPortionContextProvider>
        <MainLayout
          header={<GenericHeader header={`Hello ${user.username}`} />}
          mainArea={
            <>
              <Settings />
            </>
          }
          footer={<BottomNavigator />}
        />
      </DeleteMeatPortionContextProvider>
    </AddMeatPortionContextProvider>
  );
};

export { Account };
