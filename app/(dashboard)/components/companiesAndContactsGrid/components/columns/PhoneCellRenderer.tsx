import React, { memo } from "react";
import { Contact } from "@/app/generated/graphql";

type Props = {
  value?: Contact["phone"] | null;
};
export const PhoneCellRenderer = memo(({ value }: Props) => {
  return <div>{value}</div>;
});

PhoneCellRenderer.displayName = "PhoneCellRenderer";
