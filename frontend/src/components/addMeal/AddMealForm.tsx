import "./AddMealForm.scss";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAddMealForm, formSchema } from "./useAddMealForm";

type AddMealFormProps = {
  onClose: () => void;
};

function AddMealForm({ onClose }: AddMealFormProps) {
  const { onSubmit } = useAddMealForm({ onClose });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      <Form {...form}>
        <form id="1000" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="date"
            defaultValue={new Date()}
            render={({ field }) => (
              <FormItem className="add-meal-form-item">
                <FormLabel>Select Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-left font-normal add-meal-form-field-button",
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      onDayClick={(date) => {
                        date.setUTCHours(12, 30, 0, 0);
                        field.onChange(date);
                      }}
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
            defaultValue="medium"
            render={({ field }) => (
              <FormItem className="add-meal-form-item">
                <FormLabel>Portion Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select portion size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
            render={({ field }) => (
              <FormItem className="add-meal-form-item">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button form="1000" className="add-meal-form-submit-button" type="submit">
        Submit
      </Button>
    </>
  );
}

export { AddMealForm };
