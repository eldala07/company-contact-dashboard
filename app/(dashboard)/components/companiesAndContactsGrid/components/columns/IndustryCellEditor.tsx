import React, { memo } from "react";
import { Company } from "@/app/generated/graphql";

type Props = {
  value?: Company["industry"] | null;
  onValueChange: (value: Company["industry"]) => void;
  id: Company["id"];
  __typename: Company["__typename"];
};
export const IndustryCellEditor = memo(
  ({ value, onValueChange, id, __typename }: Props) => {
    return <div>{value}</div>;
  },
);

IndustryCellEditor.displayName = "IndustryCellEditor";
