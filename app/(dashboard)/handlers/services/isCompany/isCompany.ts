import { Company } from "@/app/generated/graphql";
import { EntityUnion } from "@/types/entity-union";

export const isCompany = (entity?: EntityUnion | null): entity is Company => {
  return entity?.__typename === "Company";
};
