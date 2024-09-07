import { EntityUnion } from "@/types/entity-union";
import {
  Company,
  Contact,
  CreateEntityInput,
  DeleteEntityInput,
  UpdateEntityInput,
} from "@/app/generated/graphql";
import { faker } from "@faker-js/faker";

export default function (entities: EntityUnion[]) {
  return {
    Query: {
      getEntities: () => entities,
      getEntity: (_: undefined, { id }: { id: string }) =>
        entities.find((entity) => entity.id === id),
    },
    Mutation: {
      createEntity: (_: undefined, { input }: { input: CreateEntityInput }) => {
        const newEntity = {
          id: faker.string.uuid(),
          ...input,
        };
        entities.push(
          input.entityType === "CONTACT"
            ? ({
                ...newEntity,
                phone: newEntity?.phone ?? "",
                __typename: "Contact",
              } as Contact)
            : ({
                ...newEntity,
                contactEmail: newEntity?.contactEmail ?? "",
                __typename: "Company",
              } as Company),
        );
        return newEntity;
      },
      updateEntity: (
        _: undefined,
        { input }: { input: Partial<UpdateEntityInput> },
      ) => {
        const index = entities.findIndex((entity) => entity.id === input.id);
        if (index !== -1) {
          if (input.entityType === "CONTACT") {
            entities[index] = {
              ...entities[index],
              ...{ __typename: "Contact" },
              ...input,
            } as Contact;
          } else {
            entities[index] = {
              ...entities[index],
              ...{ __typename: "Company" },
              ...input,
            } as Company;
          }
          return entities[index];
        }
        return null;
      },
      deleteEntity: (_: undefined, { input }: { input: DeleteEntityInput }) => {
        const index = entities.findIndex((entity) => entity.id === input.id);
        if (index !== -1) {
          const [deletedEntity] = entities.splice(index, 1);
          return deletedEntity.id;
        }
        return null;
      },
    },
    Model: {
      __resolveType(
        obj: EntityUnion | CreateEntityInput | UpdateEntityInput,
      ): string | null {
        if ((obj as EntityUnion)?.__typename) {
          if ((obj as EntityUnion).__typename === "Contact") return "Contact";
          if ((obj as EntityUnion).__typename === "Company") return "Company";
        }
        if ((obj as CreateEntityInput)?.entityType) {
          if ((obj as CreateEntityInput).entityType === "CONTACT")
            return "Contact";
          if ((obj as CreateEntityInput).entityType === "COMPANY")
            return "Company";
        }
        if ((obj as UpdateEntityInput)?.entityType) {
          if ((obj as UpdateEntityInput).entityType === "CONTACT")
            return "Contact";
          if ((obj as UpdateEntityInput).entityType === "COMPANY")
            return "Company";
        }
        return null;
      },
    },
  };
}
