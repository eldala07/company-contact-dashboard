import React, { memo } from "react";
import { Company } from "@/app/generated/graphql";

type Props = {
  value?: Company["contactEmail"] | null;
};
export const ContactEmailCellRenderer = memo(({ value }: Props) => {
  return <div>{value}</div>;
});

ContactEmailCellRenderer.displayName = "ContactEmailCellRenderer";
