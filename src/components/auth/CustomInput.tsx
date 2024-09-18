import React from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";

import { Control, FieldPath } from "react-hook-form";
import { authFormSchema } from "./helper";
import { z } from "zod";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeHolder: string;
  type?: string | "text";
}

const CustomInput = ({
  control,
  label,
  name,
  placeHolder,
  type,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className={"form-item"}>
          <FormLabel className={"form-label"}>{label}</FormLabel>
          <div className={"flex w-full flex-col"}>
            <FormControl>
              <Input
                placeholder={placeHolder}
                className={"input-class"}
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className={"form-message"} />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
