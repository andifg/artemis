import { createContext, useState, useEffect } from "react";

const DeleteMeatPortionContext = createContext<{
  callAllCallbacks: (meatPortionId: string) => void;
  registerDeleteCallback: (callback: (meatPortionId: string) => void) => void;
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
    ((meatPortionId: string) => void)[]
  >([]);

  const registerDeleteCallback = (
    callback: (meatPortionId: string) => void,
  ) => {
    setDeleteFunctions((prevFunctions) => {
      const isAlreadyRegistered = prevFunctions.some((fn) => fn === callback);

      if (isAlreadyRegistered) {
        return prevFunctions;
      }

      return [...prevFunctions, callback];
    });
  };

  const callAllCallbacks = (meatPortionId: string) => {
    deleteFunctions.forEach((callback) => {
      callback(meatPortionId);
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
