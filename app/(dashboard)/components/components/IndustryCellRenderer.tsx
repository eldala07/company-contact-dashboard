import React, { memo } from "react";
import { Company } from "@/app/generated/graphql";

type Props = {
  value?: Company["industry"] | null;
};
export const IndustryCellRenderer = memo(({ value }: Props) => {
  return <div>{value}</div>;
});
