"use client";

import React, { memo } from "react";
import { isCompany } from "@/app/(dashboard)/handlers/services/isCompany/isCompany";
import { isContact } from "@/app/(dashboard)/handlers/services/isContact/isContact";
import { DrawerCompany } from "./(components)/DrawerCompany";
import { DrawerContact } from "./(components)/DrawerContact";
import { entityIdAtom } from "@/app/(dashboard)/handlers/atoms";
import { useAtomValue } from "jotai";
import { useGetEntity } from "@/app/(dashboard)/handlers/hooks/queries/getEntity";
import { toast } from "sonner";

export const DrawerEntity = memo(() => {
  const entityIdInEdit = useAtomValue(entityIdAtom);

  const { data, loading, error } = useGetEntity({
    variables: { id: entityIdInEdit! },
    skip: !entityIdInEdit,
  });

  if (loading || !entityIdInEdit) return null;
  if (error) {
    toast.error("Something went wrong loading the entity");
    return null;
  }

  const entity = data?.getEntity;

  if (entity && isCompany(entity)) {
    return <DrawerCompany />;
  }
  if (entity && isContact(entity)) {
    return <DrawerContact />;
  }
  return null;
});

DrawerEntity.displayName = "DrawerEntity";
