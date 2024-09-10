import React, { memo, useEffect, useRef } from "react";
import { Contact } from "@/app/generated/graphql";
import { Input } from "@/components/ui/input";

type Props = {
  value?: Contact["email"];
  onValueChange: (value: Contact["email"]) => void;
};
export const EmailCellEditor = memo(({ value, onValueChange }: Props) => {
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

EmailCellEditor.displayName = "EmailCellEditor";
