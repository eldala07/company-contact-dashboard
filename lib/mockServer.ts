import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { faker } from "@faker-js/faker";
import typeDefs from "../schema.graphql";

// In-memory storage for our "database"
let entities: any[] = [];

const resolvers = {
  Query: {
    getEntities: () => entities,
    getEntity: (_: any, { id }: { id: string }) =>
      entities.find((entity) => entity.id === id),
  },
  Mutation: {
    createEntity: (_: any, { input }: { input: any }) => {
      const newEntity = {
        id: faker.string.uuid(),
        ...input,
      };
      entities.push(newEntity);
      return newEntity;
    },
    updateEntity: (_: any, { input }: { input: any }) => {
      const index = entities.findIndex((entity) => entity.id === input.id);
      if (index !== -1) {
        entities[index] = { ...entities[index], ...input };
        return entities[index];
      }
      return null;
    },
    deleteEntity: (_: any, { input }: { input: any }) => {
      const index = entities.findIndex((entity) => entity.id === input.id);
      if (index !== -1) {
        const [deletedEntity] = entities.splice(index, 1);
        return deletedEntity.id;
      }
      return null;
    },
  },
  Entity: {
    __resolveType(obj: any) {
      if (obj.email) return "Contact";
      if (obj.industry) return "Company";
      return null;
    },
  },
};

const mocks = {
  Contact: () => ({
    id: () => faker.string.uuid(),
    name: () => faker.person.fullName(),
    email: () => faker.internet.email(),
    phone: () => faker.phone.number(),
  }),
  Company: () => ({
    id: () => faker.string.uuid(),
    name: () => faker.company.name(),
    industry: () => faker.company.buzzPhrase(),
    contactEmail: () => faker.internet.email(),
  }),
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const mockedSchema = addMocksToSchema({
  schema,
  mocks,
  preserveResolvers: true,
});

// Generate some initial data
for (let i = 0; i < 5; i++) {
  entities.push(mocks.Contact());
  entities.push(mocks.Company());
}

export { mockedSchema };
