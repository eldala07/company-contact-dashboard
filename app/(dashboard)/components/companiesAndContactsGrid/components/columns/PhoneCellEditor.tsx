import React, { memo } from "react";
import { Contact } from "@/app/generated/graphql";

type Props = {
  value?: Contact["phone"] | null;
  onValueChange: (value: Contact["phone"]) => void;
  id: Contact["id"];
  __typename: Contact["__typename"];
};
export const PhoneCellEditor = memo(
  ({ value, onValueChange, id, __typename }: Props) => {
    return <div>{value}</div>;
  },
);

PhoneCellEditor.displayName = "PhoneCellEditor";
