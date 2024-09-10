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
import { HotkeyItem, useHotkeys } from "@/lib/hooks/useHotKeys";
import { entityTypes } from "@/lib/constants";
import { Company, EntityType } from "@/app/generated/graphql";
import { toast } from "sonner";
import { useUpdateEntityMutation } from "@/app/(dashboard)/handlers/hooks/mutations/updateEntity";
import { useGridRefContext } from "@/app/(dashboard)/handlers/context/GridRefContext";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  industry: z.string().min(2).max(50),
  contactEmail: z
    .string()
    .email()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export const DrawerCompany = memo(() => {
  const [entityIdInEdit, setEntityIdInEdit] = useAtom(entityIdAtom);
  const gridRef = useGridRefContext();

  const { data, loading } = useGetEntity({
    variables: { id: entityIdInEdit! },
    skip: !entityIdInEdit,
  });

  const company = data?.getEntity as Company;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company?.name || "",
      industry: company?.industry || "",
      contactEmail: company?.contactEmail || undefined,
    },
  });

  useEffect(() => {
    form.reset({
      name: company?.name || "",
      industry: company?.industry || "",
      contactEmail: company?.contactEmail || undefined,
    });
  }, [company]);

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
    const newCompanyResponse = await updateEntity({
      variables: {
        input: {
          id: company?.id,
          ...values,
          entityType: entityTypes.COMPANY as EntityType,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateEntity: {
          __typename: "Company",
          id: "new-uuid",
          ...values,
        },
      },
    });

    if (newCompanyResponse?.errors) {
      toast.error("An error occurred while updating the company");
      return;
    }

    const { data } = newCompanyResponse;
    const updatedCompany = data?.updateEntity as Company;

    if (!!gridRef) {
      const rowNodeToChange = gridRef.current?.api?.getRowNode(company?.id);
      Object.entries(updatedCompany).forEach(([key, value]) => {
        if (key === "id" || key === "__typename" || !rowNodeToChange) return;
        rowNodeToChange.setDataValue(key, value);
      });
    }

    toast("Company updated successfully");
    handleClose();
  }

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {loading && <p>Loading...</p>}
            {!loading && !!company && (
              <>
                <SheetHeader>
                  <SheetTitle>Editing {company.name}</SheetTitle>
                  <SheetDescription>
                    Update your company details here.
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
                </div>
              </>
            )}
            <SheetFooter>
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
                  <div>Update company</div>
                </LoadingButton>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
});

DrawerCompany.displayName = "DrawerCompany";
