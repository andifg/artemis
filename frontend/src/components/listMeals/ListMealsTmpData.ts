import { MeatPortion } from "@/client/types";

const listMealsTmpData: Map<string, MeatPortion[]> = new Map([
  [
    "2025-02-06",
    [
      {
        size: "small",
        ID: "1",
        UserID: "1",
        date: "2024-2-27",
        note: "This is a very long note",
      },
      {
        size: "medium",
        ID: "2",
        UserID: "1",
        date: "2024-2-27",
      },
    ],
  ],
  [
    "2025-02-05",
    [
      {
        size: "large",
        ID: "3",
        UserID: "1",
        date: "2024-2-27",
        note: "Meat Burger",
      },
      {
        size: "small",
        ID: "4",
        UserID: "1",
        date: "2024-2-27",
        note: "MC D",
      },
    ],
  ],
]);

export { listMealsTmpData };
