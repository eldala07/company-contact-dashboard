"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { entityIdAtom } from "@/app/(dashboard)/handlers/atoms";
import { useAtom } from "jotai";
import { useGetEntity } from "@/app/(dashboard)/handlers/hooks/queries/getEntity";

const DrawerContact = () => {
  const [entityIdInEdit, setEntityIdInEdit] = useAtom(entityIdAtom);

  const { data, loading, error } = useGetEntity({
    variables: { id: entityIdInEdit! },
    skip: !entityIdInEdit,
  });

  const contact = data?.getEntity;

  return (
    <Sheet open={true} onOpenChange={() => setEntityIdInEdit(null)}>
      <SheetContent>
        {loading && <p>Loading...</p>}
        {!loading && !!contact && (
          <SheetHeader>
            <SheetTitle>Editing {contact.name}</SheetTitle>
            <SheetDescription>
              Update your contact details here.
            </SheetDescription>
          </SheetHeader>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default DrawerContact;
