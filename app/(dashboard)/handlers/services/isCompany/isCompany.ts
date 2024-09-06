import { Company } from "@/app/generated/graphql";

export const isCompany = (entity: any): entity is Company => {
  return entity.__typename === "Company";
};
