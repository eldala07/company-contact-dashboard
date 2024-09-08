"use client";

import React, { memo, useEffect, useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import validator from "validator";
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
import { entityIsInlineCreationAtom } from "@/app/(dashboard)/handlers/atoms/entityIsInlineCreationAtom";
import LoadingButton from "@/components/ui/loading-button";
import { HotkeyItem, useHotkeys } from "@/lib/hooks/useHotKeys";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().refine(validator.isMobilePhone).optional(),
});

export const NewContactForm = memo(() => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: undefined,
    },
  });

  useEffect(() => {
    form.reset({
      name: "",
      email: "",
      phone: undefined,
    });
  }, []);

  const setIsInInsertion = useSetAtom(entityIsInlineCreationAtom);
  const [createEntity] = useCreateEntityMutation();

  const handleClose = () => {
    setIsInInsertion(false);
    form.reset();
    form.clearErrors();
  };

  const hotKeys: HotkeyItem[] = useMemo(
    () => [
      ["Escape", () => handleClose()],
      ["Enter", () => form.handleSubmit(onSubmit)],
    ],
    [handleClose, onSubmit, form],
  );

  useHotkeys(hotKeys, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newContactResponse = await createEntity({
      variables: {
        input: {
          ...values,
          entityType: entityTypes.CONTACT as EntityType,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        createEntity: {
          __typename: "Contact",
          id: "new-uuid",
          ...values,
        },
      },
    });

    if (newContactResponse?.errors) {
      toast.error("An error occurred while creating the contact");
      return;
    }
    const newContactId = newContactResponse?.data?.createEntity?.id;
    if (newContactId) {
      toast("Contact added successfully");
    }
    handleClose();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 items-baseline"
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
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"phone"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
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
          >
            Add contact
          </LoadingButton>
          <Button type={"button"} variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
});
