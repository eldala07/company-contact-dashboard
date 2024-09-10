import React, { memo } from "react";
import { EntityUnion } from "@/types/entity-union";
import { isCompany } from "@/app/(dashboard)/handlers/services/isCompany/isCompany";
import { Building2Icon, UserRoundIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  value?: EntityUnion["__typename"] | null;
};
export const CategoryCellRenderer = memo(({ value }: Props) => {
  return (
    <div className="h-full flex items-center">
      {isCompany({ __typename: value } as EntityUnion) ? (
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Building2Icon width={18} />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>
              <div>Company</div>
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      ) : (
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <UserRoundIcon width={18} />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>
              <div>Contact</div>
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      )}
    </div>
  );
});

CategoryCellRenderer.displayName = "CategoryCellRenderer";
