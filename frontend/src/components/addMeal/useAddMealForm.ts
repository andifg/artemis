import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { AddMeatPortionContext } from "@/contexts/addMeatPortionContext";

import { useClient } from "@/hooks/useClient";
import { MeatPortionService } from "@/client/MeatPortionService";
import { BodyCreateMeatPortion } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";

const formSchema = z.object({
  date: z.date(),
  portionSize: z.enum(["small", "medium", "large"]),
  notes: z.string().max(100).optional(),
});

type useAddMealFormReturn = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

type useAddMealFormProps = {
  onClose: () => void;
};

function useAddMealForm({
  onClose,
}: useAddMealFormProps): useAddMealFormReturn {
  const { getUser } = useAuthentication();

  const { callAllCallbacks } = useContext(AddMeatPortionContext);

  const user = getUser();

  const currentUUID = uuidv4();

  const [callClientServiceMethod] = useClient();

  const sendData = async (body: BodyCreateMeatPortion) => {
    const response = await callClientServiceMethod({
      function: MeatPortionService.CreateMeatPortion,
      args: [body, user.id],
    });
    console.log("Response from post: ", response);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.date.setHours(12, 30, 0, 0);
    console.log("submit");
    console.log(values);

    sendData({
      size: values.portionSize,
      ID: currentUUID,
      date: values.date,
      note: values.notes,
    }).then(() => {
      callAllCallbacks({
        user_id: user.id,
        date: values.date.toISOString(),
        id: currentUUID,
        size: values.portionSize,
        note: values.notes,
      });

      onClose();
    });
  }

  return { onSubmit };
}

export { useAddMealForm, formSchema };
