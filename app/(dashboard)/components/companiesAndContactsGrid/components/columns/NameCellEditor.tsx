import React, { memo } from "react";
import { EntityUnion } from "@/types/entity-union";

type Props = {
  value?: EntityUnion["name"] | null;
  onValueChange: (value: EntityUnion["name"]) => void;
  id: EntityUnion["id"];
  __typename: EntityUnion["__typename"];
};
export const NameCellEditor = memo(
  ({ value, onValueChange, id, __typename }: Props) => {
    return <div>{value}</div>;
  },
);

NameCellEditor.displayName = "NameCellEditor";
