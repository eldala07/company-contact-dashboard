import React, { memo } from "react";
import { EntityUnion } from "@/types/entity-union";
import { isCompany } from "@/app/(dashboard)/handlers/services/isCompany/isCompany";
import { Building2Icon, UserRoundIcon } from "lucide-react";

type Props = {
  value?: EntityUnion["__typename"] | null;
};
export const CategoryCellRenderer = memo(({ value }: Props) => {
  return (
    <div className="h-full flex items-center">
      {isCompany({ __typename: value } as EntityUnion) ? (
        <Building2Icon width={18} />
      ) : (
        <UserRoundIcon width={18} />
      )}
    </div>
  );
});
