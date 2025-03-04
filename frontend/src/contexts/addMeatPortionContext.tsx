import React, { createContext, useEffect } from "react";
import { MeatPortion } from "@/client/types";

const AddMeatPortionContext = createContext<{
  callAllCallbacks: (meatPortion: MeatPortion) => void;
  registerCallback: (callback: (meatPortion: MeatPortion) => void) => void;
}>({
  callAllCallbacks: () => {},
  registerCallback: () => {},
});

function AddMeatPortionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [addFunction, setAddFunction] = React.useState<
    ((meatPortion: MeatPortion) => void)[]
  >([]);

  const registerCallback = (callback: (meatPortion: MeatPortion) => void) => {
    setAddFunction((prevFunctions) => {
      const isAlreadyRegistered = prevFunctions.some((fn) => fn === callback);

      if (isAlreadyRegistered) {
        return prevFunctions;
      }

      return [...prevFunctions, callback];
    });
  };

  const callAllCallbacks = (meatPortion: MeatPortion) => {
    addFunction.forEach((callback) => {
      callback(meatPortion);
    });
  };

  useEffect(() => {
    console.log("Current add Portion callbacks: ", addFunction);
  }, [addFunction]);

  return (
    <AddMeatPortionContext.Provider
      value={{
        callAllCallbacks: callAllCallbacks,
        registerCallback: registerCallback,
      }}
    >
      {children}
    </AddMeatPortionContext.Provider>
  );
}

export { AddMeatPortionContext, AddMeatPortionContextProvider };
