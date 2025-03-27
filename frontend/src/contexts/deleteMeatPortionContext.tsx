import { MeatPortion, Timeframe } from "@/client/types";
import { createContext, useState, useEffect } from "react";

const DeleteMeatPortionContext = createContext<{
  callDeleteCallbacks: (
    portion: MeatPortion,
    timeFrameToCatch: Timeframe,
  ) => void;
  registerDeleteCallback: (
    callback: (portion: MeatPortion, timeFrameToCatch: Timeframe) => void,
  ) => void;
}>({
  callDeleteCallbacks: () => {},
  registerDeleteCallback: () => {},
});

function DeleteMeatPortionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deleteFunctions, setDeleteFunctions] = useState<
    ((portion: MeatPortion, timeFrameToCatch: Timeframe) => void)[]
  >([]);

  const registerDeleteCallback = (
    callback: (portion: MeatPortion, timeFrameToCatch: Timeframe) => void,
  ) => {
    setDeleteFunctions((prevFunctions) => {
      const isAlreadyRegistered = prevFunctions.some((fn) => fn === callback);

      if (isAlreadyRegistered) {
        return prevFunctions;
      }

      return [...prevFunctions, callback];
    });
  };

  const callDeleteCallbacks = (
    portion: MeatPortion,
    timeFrameToCatch: Timeframe,
  ) => {
    deleteFunctions.forEach((callback) => {
      callback(portion, timeFrameToCatch);
    });
  };

  useEffect(() => {
    console.log("Current delete callback functions: ", deleteFunctions);
  }, [deleteFunctions]);

  return (
    <DeleteMeatPortionContext.Provider
      value={{
        callDeleteCallbacks: callDeleteCallbacks,
        registerDeleteCallback: registerDeleteCallback,
      }}
    >
      {children}
    </DeleteMeatPortionContext.Provider>
  );
}

export { DeleteMeatPortionContext, DeleteMeatPortionContextProvider };
