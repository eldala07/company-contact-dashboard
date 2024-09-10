"use client";

import React, { memo, useEffect, useRef } from "react";
import { EntityUnion } from "@/types/entity-union";
import { Input } from "@/components/ui/input";

type Props = {
  value?: EntityUnion["name"];
  onValueChange: (value: EntityUnion["name"]) => void;
};
export const NameCellEditor = memo(({ value, onValueChange }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.select();
    }
  }, []);

  return (
    <Input
      ref={ref}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full h-full p-0 border-none bg-transparent focus-visible:ring-0"
    />
  );
});

NameCellEditor.displayName = "NameCellEditor";
