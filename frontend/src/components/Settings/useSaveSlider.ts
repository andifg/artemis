import { useEffect } from "react";
import { useCentralState } from "@/hooks/useCentralState";
// import { useClient } from "@/hooks/useClient";

function useSaveSlider() {
  const { meatPortionWeeklyTarget } = useCentralState();

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        console.log(
          `Send current value to backend: ${meatPortionWeeklyTarget}`,
        );
      },

      2000,
    );

    return () => clearTimeout(timeoutId);
  }, [meatPortionWeeklyTarget]);
}

export { useSaveSlider };
