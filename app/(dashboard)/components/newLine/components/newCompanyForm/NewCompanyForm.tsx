"use client";

import React, { memo, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useCreateEntityMutation } from "@/app/(dashboard)/handlers/hooks/mutations/createEntity";
import { entityTypes } from "@/lib/constants";
import { toast } from "sonner";
import { useSetAtom } from "jotai";
import { EntityType } from "@/app/generated/graphql";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { entityTypeInInlineCreationAtom } from "@/app/(dashboard)/handlers/atoms";
import LoadingButton from "@/components/ui/loading-button";
import { HotkeyItem, useHotkeys } from "@/lib/hooks/useHotKeys";
import { CornerDownLeftIcon } from "lucide-react";
import validator from "validator";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  industry: z.string().min(2).max(50),
  contactEmail: z
    .string()
    .refine((val) => val === "" || validator.isEmail(val), {
      message: "Invalid email address",
    })
    .optional(),
});

export const NewCompanyForm = memo(() => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      industry: "",
      contactEmail: "",
    },
  });

  useEffect(() => {
    form.reset({
      name: "",
      industry: "",
      contactEmail: "",
    });
  }, []);

  const setIsInInsertion = useSetAtom(entityTypeInInlineCreationAtom);
  const [createEntity] = useCreateEntityMutation();

  const handleClose = () => {
    setIsInInsertion(null);
    form.reset();
    form.clearErrors();
  };

  const hotKeys: HotkeyItem[] = [
    ["Escape", () => handleClose()],
    ["Enter", () => form.handleSubmit(onSubmit)()],
  ];

  useHotkeys(hotKeys, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newCompanyResponse = await createEntity({
      variables: {
        input: {
          ...values,
          entityType: entityTypes.COMPANY as EntityType,
        },
      },
    });

    if (newCompanyResponse?.errors) {
      toast.error("An error occurred while creating the company");
      return;
    }
    const newCompanyId = newCompanyResponse?.data?.createEntity?.id;
    if (newCompanyId) {
      toast.success("Company added successfully");
    }
    handleClose();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 items-center flex-wrap"
      >
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input {...field} autoFocus={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"industry"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"contactEmail"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <LoadingButton
            type={"submit"}
            isLoading={form.formState.isSubmitting}
            loadingText={"Creation..."}
            className="flex gap-0.5"
          >
            <CornerDownLeftIcon className="h-4 w-4" />
            <div>Add company</div>
          </LoadingButton>
          <Button type={"button"} variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
});

NewCompanyForm.displayName = "NewCompanyForm";
