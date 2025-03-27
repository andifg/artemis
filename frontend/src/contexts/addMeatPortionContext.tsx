import React, { createContext, useEffect } from "react";
import { MeatPortion, Timeframe } from "@/client/types";

const AddMeatPortionContext = createContext<{
  callAddCallbacks: (
    meatPortion: MeatPortion,
    timeFrameToCatch: Timeframe,
  ) => void;
  registerAddCallback: (
    callback: (meatPortion: MeatPortion, timeFrameToCatch: Timeframe) => void,
  ) => void;
}>({
  callAddCallbacks: () => {},
  registerAddCallback: () => {},
});

function AddMeatPortionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [addFunction, setAddFunction] = React.useState<
    ((meatPortion: MeatPortion, timeFrameToCatch: Timeframe) => void)[]
  >([]);

  const registerCallback = (
    callback: (meatPortion: MeatPortion, timeFrameToCatch: Timeframe) => void,
  ) => {
    setAddFunction((prevFunctions) => {
      const isAlreadyRegistered = prevFunctions.some((fn) => fn === callback);

      if (isAlreadyRegistered) {
        return prevFunctions;
      }

      return [...prevFunctions, callback];
    });
  };

  const callAllCallbacks = (
    meatPortion: MeatPortion,
    timeFrameToCatch: Timeframe,
  ) => {
    addFunction.forEach((callback) => {
      callback(meatPortion, timeFrameToCatch);
    });
  };

  useEffect(() => {
    console.log("Current add Portion callbacks: ", addFunction);
  }, [addFunction]);

  return (
    <AddMeatPortionContext.Provider
      value={{
        callAddCallbacks: callAllCallbacks,
        registerAddCallback: registerCallback,
      }}
    >
      {children}
    </AddMeatPortionContext.Provider>
  );
}

export { AddMeatPortionContext, AddMeatPortionContextProvider };
