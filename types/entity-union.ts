import { GetEntitiesQuery } from "@/app/generated/graphql";

export type EntityUnion = NonNullable<
  NonNullable<GetEntitiesQuery["getEntities"]>[number]
>;
