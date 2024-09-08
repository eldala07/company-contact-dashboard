import React, { memo } from "react";
import { Contact } from "@/app/generated/graphql";

type Props = {
  value?: Contact["email"] | null;
};
export const EmailCellRenderer = memo(({ value }: Props) => {
  return <div>{value}</div>;
});
