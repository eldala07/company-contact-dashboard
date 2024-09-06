import { QueryHookOptions, useQuery } from "@apollo/client";
import { GET_ENTITY } from "@/app/(dashboard)/handlers/graphql/queries/getEntity";
import {
  GetEntityQuery,
  GetEntityQueryVariables,
} from "@/app/generated/graphql";

export const useGetEntity = (
  options?: QueryHookOptions<GetEntityQuery, GetEntityQueryVariables>,
) => {
  const { data, loading, error } = useQuery(GET_ENTITY, options);
  return { data, loading, error };
};
