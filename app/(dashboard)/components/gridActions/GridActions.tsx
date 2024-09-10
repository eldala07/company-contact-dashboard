"use client";

import React, { ChangeEvent, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquareSlashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGridRefContext } from "@/app/(dashboard)/handlers/context/GridRefContext";
import { entityTypeInInlineCreationAtom } from "@/app/(dashboard)/handlers/atoms";
import { useAtom } from "jotai";

export const GridActions = memo(() => {
  const gridRef = useGridRefContext();

  const [typeInInsertion, setTypeInInsertion] = useAtom(
    entityTypeInInlineCreationAtom,
  );

  const handleCreateCompany = async () => {
    setTypeInInsertion("Company");
  };

  const handleCreateContact = async () => {
    setTypeInInsertion("Contact");
  };

  const onFilterTextBoxChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!gridRef?.current) return;

      gridRef?.current.api.setGridOption(
        "quickFilterText",
        e.target.value.toLowerCase().trim(),
      );
    },
    [gridRef],
  );

  if (!!typeInInsertion) return null;

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Button onClick={handleCreateCompany}>Add company</Button>
        <Button onClick={handleCreateContact}>Add contact</Button>
      </div>
      <div className="flex gap-2 items-center">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <SquareSlashIcon className="h-6 w-6" />
          </TooltipTrigger>
          <TooltipContent>
            <div>Ctrl + L to create a new entity</div>
          </TooltipContent>
        </Tooltip>
        <Input
          type={"search"}
          onChange={onFilterTextBoxChanged}
          placeholder={"Search"}
          className="max-w-80"
        />
      </div>
    </div>
  );
});

GridActions.displayName = "GridActions";
