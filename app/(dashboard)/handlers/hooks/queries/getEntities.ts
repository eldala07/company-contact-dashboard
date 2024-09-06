import { QueryHookOptions, useQuery } from "@apollo/client";
import { GET_ENTITIES } from "@/app/(dashboard)/handlers/graphql/queries/getEntities";
import {
  GetEntitiesQuery,
  GetEntitiesQueryVariables,
} from "@/app/generated/graphql";

export const useGetEntities = (
  options?: QueryHookOptions<GetEntitiesQuery, GetEntitiesQueryVariables>,
) => {
  const { data, loading, error } = useQuery(GET_ENTITIES, options);
  return { data, loading, error };
};
