"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { isDeletingEntitiesAtom } from "@/app/(dashboard)/handlers/atoms";
import { useSetAtom } from "jotai";

export const HeaderActions = memo(() => {
  const setIsDeletingEntities = useSetAtom(isDeletingEntitiesAtom);

  const handleDeleteEntity = () => {
    setIsDeletingEntities(true);
  };

  return (
    <motion.div
      className="w-full justify-self-center absolute right-0 top-0 left-0 flex justify-center items-center h-[50px] bg-secondary text-white rounded-tl-[20px] rounded-tr-[20px] z-10 p-2 border border-zinc-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Button
        variant="link"
        className="bg-transparent text-zinc-950 flex items-center gap-0.5"
        onClick={handleDeleteEntity}
      >
        <TrashIcon className="h-4 w-4" />
        <div>Delete selected entities</div>
      </Button>
    </motion.div>
  );
});

HeaderActions.displayName = "HeaderActions";
