import React, { memo } from "react";
import { Company } from "@/app/generated/graphql";

type Props = {
  value?: Company["contactEmail"] | null;
  onValueChange: (value: Company["contactEmail"]) => void;
  id: Company["id"];
  __typename: Company["__typename"];
};
export const ContactEmailCellEditor = memo(
  ({ value, onValueChange, id, __typename }: Props) => {
    return <div>{value}</div>;
  },
);

ContactEmailCellEditor.displayName = "ContactEmailCellEditor";
