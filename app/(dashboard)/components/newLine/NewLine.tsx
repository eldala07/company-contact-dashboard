"use client";

import React, { memo, useCallback, useMemo } from "react";
import { HotkeyItem, useHotkeys } from "@/lib/hooks/useHotKeys";
import { useAtom } from "jotai";
import { entityTypeInInlineCreationAtom } from "@/app/(dashboard)/handlers/atoms";
import { NewContactForm } from "./components/newContactForm/NewContactForm";
import { NewCompanyForm } from "./components/newCompanyForm/NewCompanyForm";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Building2Icon, UserRoundIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const NewLine = memo(() => {
  const [typeInInsertion, setTypeInInsertion] = useAtom(
    entityTypeInInlineCreationAtom,
  );

  const openForm = useCallback(() => {
    setTypeInInsertion("Contact");
  }, []);

  const handleInsertNewLine = useCallback(async () => {
    if (!!typeInInsertion) return;
    openForm();
  }, [openForm, typeInInsertion]);

  const hotKeys: HotkeyItem[] = useMemo(
    () => [
      ["ctrl + l", () => handleInsertNewLine()],
      ["Meta + L", () => handleInsertNewLine()],
    ],
    [handleInsertNewLine],
  );

  useHotkeys(hotKeys, []);

  const handleCategoryChange = (value: "Company" | "Contact") => {
    setTypeInInsertion(value);
  };

  if (!typeInInsertion) return null;

  return (
    <div className="flex gap-2 w-full">
      <ToggleGroup
        type="single"
        onValueChange={handleCategoryChange}
        size={"sm"}
        className="flex flex-col gap-0.5 mr-6"
      >
        <ToggleGroupItem value="Company" aria-label="Toggle company">
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Building2Icon
                className={cn(
                  "h-4 w-4",
                  typeInInsertion === "Company"
                    ? "text-primary"
                    : "text-zinc-700",
                )}
              />
            </TooltipTrigger>
            <TooltipContent>
              <div>Company</div>
            </TooltipContent>
          </Tooltip>
        </ToggleGroupItem>
        <ToggleGroupItem value="Contact" aria-label="Toggle contact">
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <UserRoundIcon
                className={cn(
                  "h-4 w-4",
                  typeInInsertion === "Contact"
                    ? "text-primary"
                    : "text-zinc-700",
                )}
              />
            </TooltipTrigger>
            <TooltipContent>
              <div>Contact</div>
            </TooltipContent>
          </Tooltip>
        </ToggleGroupItem>
      </ToggleGroup>
      {typeInInsertion === "Company" && <NewCompanyForm />}
      {typeInInsertion === "Contact" && <NewContactForm />}
    </div>
  );
});

NewLine.displayName = "NewLine";
