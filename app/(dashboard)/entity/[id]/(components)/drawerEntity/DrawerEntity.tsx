"use client";

import React from "react";
import { isCompany } from "@/app/(dashboard)/handlers/services/isCompany/isCompany";
import { isContact } from "@/app/(dashboard)/handlers/services/isContact/isContact";
import DrawerCompany from "@/app/(dashboard)/entity/[id]/(components)/drawerEntity/(components)/DrawerCompany";
import DrawerContact from "@/app/(dashboard)/entity/[id]/(components)/drawerEntity/(components)/DrawerContact";
import { entityIdAtom } from "@/app/(dashboard)/handlers/atoms";
import { useAtomValue } from "jotai";
import { useGetEntity } from "@/app/(dashboard)/handlers/hooks/queries/getEntity";

const DrawerEntity = () => {
  const entityIdInEdit = useAtomValue(entityIdAtom);

  const { data, loading, error } = useGetEntity({
    variables: { id: entityIdInEdit! },
    skip: !entityIdInEdit,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const entity = data?.getEntity;

  if (entity && isCompany(entity)) {
    return <DrawerCompany />;
  }
  if (entity && isContact(entity)) {
    return <DrawerContact />;
  }
  return null;
};
export default DrawerEntity;
