import React, { memo } from "react";
import { Contact } from "@/app/generated/graphql";

type Props = {
  value?: Contact["email"] | null;
  onValueChange: (value: Contact["email"]) => void;
  id: Contact["id"];
  __typename: Contact["__typename"];
};
export const EmailCellEditor = memo(
  ({ value, onValueChange, id, __typename }: Props) => {
    return <div>{value}</div>;
  },
);

EmailCellEditor.displayName = "EmailCellEditor";
