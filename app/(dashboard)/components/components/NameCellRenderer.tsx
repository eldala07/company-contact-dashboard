import React, { memo } from "react";
import { EntityUnion } from "@/types/entity-union";

type Props = {
  value?: EntityUnion["name"] | null;
};
export const NameCellRenderer = memo(({ value }: Props) => {
  return <div>{value}</div>;
});
