import { Serving, Timeframe } from "@/client/types";
import { createContext, useState, useEffect } from "react";

const DeleteServingContext = createContext<{
  callDeleteCallbacks: (serving: Serving, timeFrameToCatch: Timeframe) => void;
  registerDeleteCallback: (
    callback: (serving: Serving, timeFrameToCatch: Timeframe) => void,
  ) => void;
}>({
  callDeleteCallbacks: () => {},
  registerDeleteCallback: () => {},
});

function DeleteServingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deleteFunctions, setDeleteFunctions] = useState<
    ((serving: Serving, timeFrameToCatch: Timeframe) => void)[]
  >([]);

  const registerDeleteCallback = (
    callback: (serving: Serving, timeFrameToCatch: Timeframe) => void,
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
    serving: Serving,
    timeFrameToCatch: Timeframe,
  ) => {
    deleteFunctions.forEach((callback) => {
      callback(serving, timeFrameToCatch);
    });
  };

  useEffect(() => {
    console.log("Current delete callback functions: ", deleteFunctions);
  }, [deleteFunctions]);

  return (
    <DeleteServingContext.Provider
      value={{
        callDeleteCallbacks: callDeleteCallbacks,
        registerDeleteCallback: registerDeleteCallback,
      }}
    >
      {children}
    </DeleteServingContext.Provider>
  );
}

export { DeleteServingContext, DeleteServingContextProvider };
