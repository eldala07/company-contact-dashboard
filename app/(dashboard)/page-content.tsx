"use client";

import React, { memo } from "react";
import { useAtomValue } from "jotai";
import { entityIdAtom } from "@/app/(dashboard)/handlers/atoms";
import { LayoutDashboardIcon } from "lucide-react";

import { CompaniesAndContactsGrid } from "./components/companiesAndContactsGrid/CompaniesAndContactsGrid";
import { NewLine } from "./components/newLine/NewLine";
import { GridActions } from "./components/gridActions/GridActions";
import { DrawerEntity } from "@/app/entity/[id]/(components)/drawerEntity/DrawerEntity";

export const PageContent = memo(() => {
  const entityIdInEdit = useAtomValue(entityIdAtom);

  return (
    <div className="min-h-screen flex flex-col h-full w-full max-w-screen-2xl">
      <div className="px-8 h-16 flex gap-2 items-center bg-zinc-50 border-b border-zinc-200 text-zinc-800">
        <LayoutDashboardIcon />
        <h1 className="text-2xl font-bold">Contacts and companies</h1>
      </div>
      <div className="flex-1 flex flex-col gap-4 p-8 h-full">
        <GridActions />
        <NewLine />
        <CompaniesAndContactsGrid />
        {entityIdInEdit ? <DrawerEntity /> : null}
      </div>
    </div>
  );
});

PageContent.displayName = "PageContent";
