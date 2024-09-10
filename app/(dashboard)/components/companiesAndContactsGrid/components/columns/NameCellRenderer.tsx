"use client";

import React, { memo } from "react";
import { EntityUnion } from "@/types/entity-union";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { entityIdAtom } from "@/app/(dashboard)/handlers/atoms";

type Props = {
  value?: EntityUnion["name"] | null;
  id?: EntityUnion["id"];
};
export const NameCellRenderer = memo(({ value, id }: Props) => {
  const router = useRouter();
  const setEntityIdInEdit = useSetAtom(entityIdAtom);

  const handleEditEntity = async (id?: string) => {
    if (!id) return;
    setEntityIdInEdit(id);
  };

  const handleOpenEntity = async (id?: string) => {
    if (!id) return;
    router.push(`/entity/${id}`);
  };

  return (
    <div className="relative">
      {value}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex ag-row-custom-hover-button">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleEditEntity(id)}
        >
          <EditIcon className="h-5 w-5 p-0 text-primary" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleOpenEntity(id)}
        >
          <EyeIcon className="h-5 w-5 p-0 text-primary" />
        </Button>
      </div>
    </div>
  );
});

NameCellRenderer.displayName = "NameCellRenderer";
