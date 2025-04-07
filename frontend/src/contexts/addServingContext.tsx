import React, { createContext, useEffect } from "react";
import { Serving, Timeframe } from "@/client/types";

const AddServingContext = createContext<{
  callAddCallbacks: (serving: Serving, timeFrameToCatch: Timeframe) => void;
  registerAddCallback: (
    callback: (serving: Serving, timeFrameToCatch: Timeframe) => void,
  ) => void;
}>({
  callAddCallbacks: () => {},
  registerAddCallback: () => {},
});

function AddServingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [addFunction, setAddFunction] = React.useState<
    ((serving: Serving, timeFrameToCatch: Timeframe) => void)[]
  >([]);

  const registerCallback = (
    callback: (serving: Serving, timeFrameToCatch: Timeframe) => void,
  ) => {
    setAddFunction((prevFunctions) => {
      const isAlreadyRegistered = prevFunctions.some((fn) => fn === callback);

      if (isAlreadyRegistered) {
        return prevFunctions;
      }

      return [...prevFunctions, callback];
    });
  };

  const callAllCallbacks = (serving: Serving, timeFrameToCatch: Timeframe) => {
    addFunction.forEach((callback) => {
      callback(serving, timeFrameToCatch);
    });
  };

  useEffect(() => {
    console.log("Current add Portion callbacks: ", addFunction);
  }, [addFunction]);

  return (
    <AddServingContext.Provider
      value={{
        callAddCallbacks: callAllCallbacks,
        registerAddCallback: registerCallback,
      }}
    >
      {children}
    </AddServingContext.Provider>
  );
}

export { AddServingContext, AddServingContextProvider };
