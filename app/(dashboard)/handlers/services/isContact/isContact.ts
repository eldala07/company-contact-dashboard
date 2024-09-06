import { Contact } from "@/app/generated/graphql";
import { EntityUnion } from "@/types/entity-union";

export const isContact = (entity: EntityUnion): entity is Contact => {
  return entity.__typename === "Contact";
};
