import "./MealForm.scss";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useCentralState } from "@/hooks/useCentralState";

import { Button } from "@/Components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/Components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";

import { useAddMealForm, formSchema } from "./useAddMealForm";

type AddMealFormProps = {
  onClose: () => void;
};

function AddMealForm({ onClose }: AddMealFormProps) {
  const { onSubmit } = useAddMealForm({ onClose });

  const { selectedDate, editPortion } = useCentralState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: editPortion ? new Date(editPortion.date) : selectedDate,
      portionSize: editPortion?.size || "medium",
      notes: editPortion?.note || "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form id="1000" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="date"
            // defaultValue={selectedDate}
            render={({ field }) => (
              <FormItem className="meal-form-item">
                <FormLabel className="form-color">Select Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-left form-color font-normal meal-form-field-button",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portionSize"
            // defaultValue="medium"
            render={({ field }) => (
              <FormItem className="meal-form-item">
                <FormLabel className="form-color">Portion Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="form-color">
                      <SelectValue placeholder="Select portion size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="form-color">
                    <SelectItem value="small">small</SelectItem>
                    <SelectItem value="medium">medium</SelectItem>
                    <SelectItem value="large">large</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            // defaultValue="Schnitzel"
            render={({ field }) => (
              <FormItem className="meal-form-item">
                <FormLabel className="form-color">Notes</FormLabel>
                <FormControl>
                  <Input className="form-color" placeholder="..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button
        form="1000"
        className="meal-form-submit-button"
        type="submit"
        variant={"outline"}
      >
        Submit
      </Button>
    </>
  );
}

export { AddMealForm };
