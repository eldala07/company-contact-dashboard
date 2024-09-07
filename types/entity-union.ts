import { GetEntitiesQuery, GetEntityQuery } from "@/app/generated/graphql";

export type EntityUnion = NonNullable<
  | NonNullable<GetEntitiesQuery["getEntities"]>[number]
  | NonNullable<GetEntityQuery["getEntity"]>
>;
