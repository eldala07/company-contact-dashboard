"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import { HotkeyItem, useHotkeys } from "@/lib/hooks/useHotKeys";
import { useAtom } from "jotai";
import { entityIsInlineCreationAtom } from "@/app/(dashboard)/handlers/atoms";
import { NewContactForm } from "@/app/(dashboard)/components/footerNewLine/components/newContactForm/NewContactForm";
import { NewCompanyForm } from "@/app/(dashboard)/components/footerNewLine/components/newCompanyForm/NewCompanyForm";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Building2Icon, UserRoundIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const FooterNewLine = memo(() => {
  const [formShown, setFormShown] = useState<"Company" | "Contact">("Company");
  const [isInInsertion, setIsInInsertion] = useAtom(entityIsInlineCreationAtom);

  const openForm = useCallback(() => {
    setIsInInsertion(true);
  }, []);

  const handleInsertNewLine = useCallback(async () => {
    if (isInInsertion) return;
    openForm();
  }, [openForm, isInInsertion]);

  const hotKeys: HotkeyItem[] = useMemo(
    () => [
      ["ctrl + l", () => handleInsertNewLine()],
      ["Meta + L", () => handleInsertNewLine()],
    ],
    [handleInsertNewLine],
  );

  useHotkeys(hotKeys, []);

  const handleCategoryChange = (value: "Company" | "Contact") => {
    setFormShown(value);
  };

  if (!isInInsertion) return null;

  return (
    <div className="flex gap-2 w-full">
      <ToggleGroup
        type="single"
        onValueChange={handleCategoryChange}
        size={"sm"}
        className="flex flex-col gap-0.5 mr-6"
      >
        <ToggleGroupItem value="Company" aria-label="Toggle company">
          <Building2Icon
            className={cn(
              "h-4 w-4",
              formShown === "Company" ? "text-primary" : "text-zinc-700",
            )}
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="Contact" aria-label="Toggle contact">
          <UserRoundIcon
            className={cn(
              "h-4 w-4",
              formShown === "Contact" ? "text-primary" : "text-zinc-700",
            )}
          />
        </ToggleGroupItem>
      </ToggleGroup>
      {formShown === "Company" && <NewCompanyForm />}
      {formShown === "Contact" && <NewContactForm />}
    </div>
  );
});
