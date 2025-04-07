import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { AddServingContext } from "@/contexts/addServingContext";

import { useClient } from "@/hooks/useClient";
import { ServingService } from "@/client/ServingService";
import { BodyCreateServing } from "@/client/types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCentralState } from "@/hooks/useCentralState";

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
  const [callClientServiceMethod] = useClient();
  const { callAddCallbacks } = useContext(AddServingContext);
  const { editPortion, addPortion, deletePortion, timeFrame } =
    useCentralState();

  const user = getUser();
  const currentUUID = uuidv4();

  const sendData = async (body: BodyCreateServing) => {
    const response = await callClientServiceMethod({
      function: ServingService.CreateServing,
      args: [body, user.id],
    });
    console.log("Response from post: ", response);
    callAddCallbacks(
      {
        user_id: user.id,
        date: body.date.toISOString(),
        id: currentUUID,
        size: body.size,
        note: body.note,
      },
      timeFrame,
    );
  };

  const updateData = async (body: BodyCreateServing, portionId: string) => {
    const response = await callClientServiceMethod({
      function: ServingService.UpdateServing,
      args: [body, user.id, portionId],
    });
    console.log("Response from update: ", response);
    deletePortion(portionId);
    addPortion({
      id: portionId,
      user_id: user.id,
      size: body.size,
      note: body.note,
      date: body.date.toISOString(),
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.date.setHours(12, 30, 0, 0);
    console.log("submit");
    console.log(values);

    async function handleSubmidt() {
      if (editPortion) {
        await updateData(
          {
            size: values.portionSize,
            category: "meat",
            ID: editPortion.id,
            date: values.date,
            note: values.notes,
          },
          editPortion.id,
        );
      } else {
        await sendData({
          size: values.portionSize,
          category: "meat",
          ID: currentUUID,
          date: values.date,
          note: values.notes,
        });
      }
      onClose();
    }
    handleSubmidt();
  }

  return { onSubmit };
}

export { useAddMealForm, formSchema };
