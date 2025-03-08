import { MeatPortion } from "@/client/types";
import { createContext, useState, useEffect } from "react";

const DeleteMeatPortionContext = createContext<{
  callAllCallbacks: (portion: MeatPortion) => void;
  registerDeleteCallback: (callback: (portion: MeatPortion) => void) => void;
}>({
  callAllCallbacks: () => {},
  registerDeleteCallback: () => {},
});

function DeleteMeatPortionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deleteFunctions, setDeleteFunctions] = useState<
    ((portion: MeatPortion) => void)[]
  >([]);

  const registerDeleteCallback = (callback: (portion: MeatPortion) => void) => {
    setDeleteFunctions((prevFunctions) => {
      const isAlreadyRegistered = prevFunctions.some((fn) => fn === callback);

      if (isAlreadyRegistered) {
        return prevFunctions;
      }

      return [...prevFunctions, callback];
    });
  };

  const callAllCallbacks = (portion: MeatPortion) => {
    deleteFunctions.forEach((callback) => {
      callback(portion);
    });
  };

  useEffect(() => {
    console.log("Current delete callback functions: ", deleteFunctions);
  }, [deleteFunctions]);

  return (
    <DeleteMeatPortionContext.Provider
      value={{
        callAllCallbacks: callAllCallbacks,
        registerDeleteCallback: registerDeleteCallback,
      }}
    >
      {children}
    </DeleteMeatPortionContext.Provider>
  );
}

export { DeleteMeatPortionContext, DeleteMeatPortionContextProvider };
