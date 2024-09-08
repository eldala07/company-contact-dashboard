"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAtom } from "jotai";
import { entityIdAtom } from "@/app/(dashboard)/handlers/atoms";
import { useGetEntity } from "@/app/(dashboard)/handlers/hooks/queries/getEntity";

const DrawerCompany = () => {
  const [entityIdInEdit, setEntityIdInEdit] = useAtom(entityIdAtom);

  const { data, loading } = useGetEntity({
    variables: { id: entityIdInEdit! },
    skip: !entityIdInEdit,
  });

  const company = data?.getEntity;

  return (
    <Sheet open={true} onOpenChange={() => setEntityIdInEdit(null)}>
      <SheetContent>
        {loading && <p>Loading...</p>}
        {!loading && !!company && (
          <SheetHeader>
            <SheetTitle>Editing {company.name}</SheetTitle>
            <SheetDescription>
              Update your company details here.
            </SheetDescription>
          </SheetHeader>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default DrawerCompany;
