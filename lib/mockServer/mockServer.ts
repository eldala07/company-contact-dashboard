import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { faker } from "@faker-js/faker";
import typeDefs from "../../schema.graphql";
import { EntityUnion } from "@/types/entity-union";
import { Company, Contact } from "@/app/generated/graphql";
import { Maybe } from "@graphql-tools/utils";
import EntityMock from "./mocks/entity";
import { callAllFunctions } from "@/lib/mockServer/helpers/callAllFunctions/callAllFunctions";

// In-memory storage for our "database"
const entities: EntityUnion[] = [];
const entityMock = EntityMock(entities);

const resolvers = {
  Query: {
    ...entityMock.Query,
  },
  Mutation: {
    ...entityMock.Mutation,
  },
  Entity: {
    ...entityMock.Model,
  },
};

type MockField<T> = T extends Maybe<infer U> ? () => U | null : () => T;

type MockFunction<T> = () => {
  [K in keyof T]: T[K] extends Maybe<infer U>
    ? MockField<U>
    : MockField<NonNullable<T[K]>>;
};

type Mocks = {
  Contact: MockFunction<Omit<Contact, "__typename">>;
  Company: MockFunction<Omit<Company, "__typename">>;
};

const mocks: Mocks = {
  Contact: () => ({
    id: () => faker.string.uuid(),
    name: () => faker.person.fullName(),
    email: () => faker.internet.email(),
    phone: () => (faker.datatype.boolean() ? faker.phone.number() : null),
  }),
  Company: () => ({
    id: () => faker.string.uuid(),
    name: () => faker.company.name(),
    industry: () => faker.company.buzzPhrase(),
    contactEmail: () =>
      faker.datatype.boolean() ? faker.internet.email() : null,
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
  entities.push({
    __typename: "Contact",
    ...callAllFunctions(mocks.Contact()),
  } as Contact);

  entities.push({
    __typename: "Company",
    ...callAllFunctions(mocks.Company()),
  } as Company);
}

export { mockedSchema };
