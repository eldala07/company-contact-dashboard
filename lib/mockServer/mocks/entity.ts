import { EntityUnion } from "@/types/entity-union";
import { CreateEntityInput, DeleteEntityInput } from "@/app/generated/graphql";
import { faker } from "@faker-js/faker";

export default (entities: EntityUnion[]) => ({
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
      } as EntityUnion;
      entities.push(newEntity);
      return newEntity;
    },
    updateEntity: (
      _: undefined,
      { input }: { input: Partial<EntityUnion> },
    ) => {
      const index = entities.findIndex((entity) => entity.id === input.id);
      if (index !== -1) {
        entities[index] = { ...entities[index], ...input } as EntityUnion;
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
    __resolveType(obj: EntityUnion): string | null {
      if ("email" in obj) return "Contact";
      if ("industry" in obj) return "Company";
      return null;
    },
  },
});
