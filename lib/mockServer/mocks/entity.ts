import { EntityUnion } from "@/types/entity-union";
import {
  Company,
  Contact,
  CreateEntityInput,
  DeleteEntityInput,
  UpdateEntityInput,
} from "@/app/generated/graphql";
import { faker } from "@faker-js/faker";

export const EntityMock = (
  entities: EntityUnion[],
  saveEntities: (entities: EntityUnion[]) => void,
) => {
  return {
    Query: {
      getEntities: () => entities,
      getEntity: (_: undefined, { id }: { id: string }) => {
        const found = entities.find((entity) => entity.id === id);
        if (!found) return null;
        return found;
      },
    },
    Mutation: {
      createEntity: (_: undefined, { input }: { input: CreateEntityInput }) => {
        const baseEntity = {
          id: faker.string.uuid(),
          name: input.name,
        };

        let newEntity: EntityUnion;

        if (input.entityType === "CONTACT") {
          newEntity = {
            ...baseEntity,
            __typename: "Contact",
            email: input.email || "",
            phone: input.phone || "",
          };
        } else {
          newEntity = {
            ...baseEntity,
            __typename: "Company",
            industry: input.industry || "",
            contactEmail: input.contactEmail || "",
          };
        }

        entities.push(newEntity);
        saveEntities(entities);
        return newEntity;
      },
      updateEntity: (
        _: undefined,
        { input }: { input: Partial<UpdateEntityInput> },
      ) => {
        const index = entities.findIndex((entity) => entity.id === input.id);
        if (index !== -1) {
          const existingEntity = entities[index];

          if (existingEntity.__typename === "Contact") {
            const updatedContact: Contact = {
              ...existingEntity,
              name: input.name ?? existingEntity.name,
              email: input.email ?? existingEntity.email,
              phone: input.phone ?? existingEntity.phone,
            };
            entities[index] = updatedContact;
          } else if (existingEntity.__typename === "Company") {
            const updatedCompany: Company = {
              ...existingEntity,
              name: input.name ?? existingEntity.name,
              industry: input.industry ?? existingEntity.industry,
              contactEmail: input.contactEmail ?? existingEntity.contactEmail,
            };
            entities[index] = updatedCompany;
          }

          saveEntities(entities);
          return entities[index];
        }
        return null;
      },
      deleteEntity: (_: undefined, { input }: { input: DeleteEntityInput }) => {
        const index = entities.findIndex((entity) => entity.id === input.id);
        if (index !== -1) {
          const [deletedEntity] = entities.splice(index, 1);
          saveEntities(entities);
          return deletedEntity;
        }
        return null;
      },
    },
    Model: {
      __resolveType(
        obj: (EntityUnion | CreateEntityInput | UpdateEntityInput) & {
          $ref?: { key: string; typeName: string };
        },
      ): string | null {
        if ((obj as EntityUnion)?.__typename) {
          if ((obj as EntityUnion).__typename === "Contact") return "Contact";
          if ((obj as EntityUnion).__typename === "Company") return "Company";
        }
        if (obj.$ref) {
          return obj.$ref.typeName;
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
};
