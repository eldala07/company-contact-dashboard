"use client";

import React, { memo, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { entityIdAtom } from "@/app/(dashboard)/handlers/atoms";
import { useAtom } from "jotai";
import { useGetEntity } from "@/app/(dashboard)/handlers/hooks/queries/getEntity";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { CornerDownLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import { HotkeyItem, useHotkeys } from "@/lib/hooks/useHotKeys";
import { entityTypes } from "@/lib/constants";
import { Contact, EntityType } from "@/app/generated/graphql";
import { toast } from "sonner";
import { useUpdateEntityMutation } from "@/app/(dashboard)/handlers/hooks/mutations/updateEntity";
import { useGridRefContext } from "@/app/(dashboard)/handlers/context/GridRefContext";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z
    .string()
    .refine((val) => val === "" || validator.isMobilePhone(val), {
      message: "Invalid phone number",
    })
    .optional(),
});

export const DrawerContact = memo(() => {
  const [entityIdInEdit, setEntityIdInEdit] = useAtom(entityIdAtom);
  const gridRef = useGridRefContext();

  const { data, loading } = useGetEntity({
    variables: { id: entityIdInEdit! },
    skip: !entityIdInEdit,
  });

  const contact = data?.getEntity as Contact;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: contact?.name || "",
      email: contact?.email || "",
      phone: contact?.phone || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: contact?.name || "",
      email: contact?.email || "",
      phone: contact?.phone || "",
    });
  }, [contact]);

  const [updateEntity] = useUpdateEntityMutation();

  const handleClose = () => {
    setEntityIdInEdit(null);
    form.reset();
    form.clearErrors();
  };

  const hotKeys: HotkeyItem[] = [
    ["Escape", () => handleClose()],
    ["Enter", () => form.handleSubmit(onSubmit)()],
  ];

  useHotkeys(hotKeys, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedContactResponse = await updateEntity({
      variables: {
        input: {
          id: contact?.id,
          ...values,
          entityType: entityTypes.CONTACT as EntityType,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateEntity: {
          __typename: "Contact",
          id: contact?.id,
          ...values,
        },
      },
    });

    if (updatedContactResponse?.errors) {
      toast.error("An error occurred while updating the contact");
      return;
    }

    const { data } = updatedContactResponse;
    const updatedContact = data?.updateEntity as Contact;

    if (!!gridRef) {
      const rowNodeToChange = gridRef.current?.api?.getRowNode(contact?.id);
      Object.entries(updatedContact).forEach(([key, value]) => {
        if (key === "id" || key === "__typename" || !rowNodeToChange) return;
        rowNodeToChange.setDataValue(key, value);
      });
    }

    toast.success("Contact updated successfully");
    handleClose();
  }

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {loading && <p>Loading...</p>}
            {!loading && !!contact && (
              <>
                <SheetHeader>
                  <SheetTitle>Editing {contact.name}</SheetTitle>
                  <SheetDescription>
                    Update your contact details here.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6">
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
                </div>
              </>
            )}
            <SheetFooter className="flex gap-3">
              <SheetClose asChild>
                <Button
                  type={"button"}
                  variant="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <LoadingButton
                  type={"submit"}
                  isLoading={form.formState.isSubmitting}
                  loadingText={"Updating..."}
                  className="flex gap-0.5"
                >
                  <CornerDownLeftIcon className="h-4 w-4" />
                  <div>Update contact</div>
                </LoadingButton>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
});

DrawerContact.displayName = "DrawerContact";
