import "./ServingForm.scss";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useCentralState } from "@/hooks/useCentralState";
import { servingSizes } from "@/client/types";
import { Button } from "@/Components/ui/button";
import { ServingIcon } from "../ServingIcon/ServingIcon";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

import { useServingForm, formSchema } from "./useServingForm";

type AddMealFormProps = {
  onClose: () => void;
};

function ServingForm({ onClose }: AddMealFormProps) {
  const { onSubmit } = useServingForm({ onClose });

  const { selectedDate, editServing, user } = useCentralState();

  console.log("Edit Serving", editServing);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: editServing ? new Date(editServing.date) : selectedDate,
      category: editServing?.category || user?.category_ranks[0].category,
      portionSize: editServing?.size || "medium",
      notes: editServing?.note || "",
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
                <FormLabel className="form-color serving-form-header">
                  Select Date
                </FormLabel>
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
            name="category"
            render={({ field }) => (
              <FormItem className="meal-form-item">
                <FormLabel className="form-color serving-form-header">
                  Serving Category
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2 flex-wrap">
                    {user?.category_ranks
                      .filter((rank) => rank.active)
                      .map((rank) => (
                        <Button
                          key={rank.category}
                          type="button"
                          style={{ width: "40%" }}
                          variant={
                            field.value === rank.category
                              ? "default"
                              : "outline"
                          }
                          onClick={() => field.onChange(rank.category)}
                          className={`form-color ${field.value === rank.category ? "serving-form-button-selected" : ""}`}
                        >
                          {rank.category.charAt(0).toUpperCase() +
                            rank.category.slice(1)}

                          {<ServingIcon servingCategory={rank.category} />}
                        </Button>
                      ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portionSize"
            render={({ field }) => (
              <FormItem className="meal-form-item">
                <FormLabel className="form-color serving-form-header">
                  Serving Size
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2 flex-wrap">
                    {servingSizes.map((size) => (
                      <Button
                        key={size}
                        type="button"
                        variant={field.value === size ? "default" : "outline"}
                        onClick={() => field.onChange(size)}
                        className={`form-color ${field.value === size ? "serving-form-button-selected" : ""}`}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="meal-form-item">
                <FormLabel className="form-color serving-form-header">
                  Notes
                </FormLabel>
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

export { ServingForm };
