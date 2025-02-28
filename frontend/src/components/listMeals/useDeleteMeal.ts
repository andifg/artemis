import { useState, useRef, useEffect, RefObject } from "react";

type useDeleteMealReturn = {
  selectedMeal: string;
  selectForDeletion: (id: string, ref: RefObject<HTMLElement>) => void;
};

function useDeleteMeal(): useDeleteMealReturn {
  const [selectedMeal, setSelectedMeal] = useState<string>("");

  const refObject = useRef<HTMLElement | null>(null);

  const handleClick = (e: MouseEvent) => {
    if (refObject.current && !refObject.current.contains(e.target as Node)) {
      setSelectedMeal("");
    }
  };

  const selectForDeletion = (id: string, ref: RefObject<HTMLElement>) => {
    setSelectedMeal(id);
    refObject.current = ref.current;
  };

  useEffect(() => {
    setTimeout(() => {
      if (selectedMeal !== "") {
        document.addEventListener("click", handleClick);
      } else {
        document.removeEventListener("click", handleClick);
      }
    }, 250);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [selectedMeal]);

  return { selectedMeal, selectForDeletion };
}

export { useDeleteMeal };
