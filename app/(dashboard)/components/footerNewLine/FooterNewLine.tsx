"use client";

import React, { memo, useCallback, useMemo } from "react";
import { HotkeyItem, useHotkeys } from "@/lib/hooks/useHotKeys";
import { useAtom } from "jotai";
import { entityIsInlineCreationAtom } from "@/app/(dashboard)/handlers/atoms/entityIsInlineCreationAtom";
import { NewContactForm } from "@/app/(dashboard)/components/footerNewLine/components/newContactForm/NewContactForm";

export const FooterNewLine = memo(() => {
  const [isInInsertion, setIsInInsertion] = useAtom(entityIsInlineCreationAtom);

  const openForm = useCallback(() => {
    setIsInInsertion(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsInInsertion(false);
  }, []);

  const handleCancel = useCallback(async () => {
    if (!isInInsertion) return;
    closeForm();
  }, [isInInsertion, closeForm]);

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

  if (!isInInsertion) return null;

  return (
    <div className="flex gap-2 w-full">
      <NewContactForm />
    </div>
  );
});
