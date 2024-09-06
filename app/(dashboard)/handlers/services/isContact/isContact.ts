import { Contact } from "@/app/generated/graphql";

export const isContact = (entity: any): entity is Contact => {
  return entity.__typename === "Contact";
};
