import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { faker } from "@faker-js/faker";
import typeDefs from "../../schema.graphql";
import { EntityUnion } from "@/types/entity-union";
import { Company, Contact } from "@/app/generated/graphql";
import { Maybe } from "@graphql-tools/utils";
import { EntityMock } from "./mocks/entity";
import { callAllFunctions } from "@/lib/mockServer/helpers/callAllFunctions/callAllFunctions";

const loadEntities = (): EntityUnion[] => {
  if (typeof window !== 'undefined') {
    const storedEntities = localStorage.getItem('mockEntities');
    return storedEntities ? JSON.parse(storedEntities) : [];
  }
  return [];
};

const saveEntities = (entities: EntityUnion[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockEntities', JSON.stringify(entities));
  }
};

const entities: EntityUnion[] = loadEntities();

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
    phone: () =>
        faker.datatype.boolean()
            ? faker.phone.number({ style: "international" })
            : null,
  }),
  Company: () => ({
    id: () => faker.string.uuid(),
    name: () => faker.company.name(),
    industry: () => faker.company.buzzPhrase(),
    contactEmail: () =>
        faker.datatype.boolean() ? faker.internet.email() : null,
  }),
};

if (entities.length === 0) {
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
  saveEntities(entities);
}

const entityMock = EntityMock(entities, saveEntities);

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

const schema = makeExecutableSchema({ typeDefs, resolvers });

const mockedSchema = addMocksToSchema({
  schema,
  mocks,
  preserveResolvers: true,
});

export { mockedSchema };
