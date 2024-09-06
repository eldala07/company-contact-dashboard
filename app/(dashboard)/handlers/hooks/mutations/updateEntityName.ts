import { useMutation } from "@apollo/client";
import { UPDATE_ENTITY_NAME } from "@/app/(dashboard)/handlers/graphql/mutations/updateEntityName";

export const useUpdateEntityNameMutation = () => {
  const [updateEntity, { loading, error }] = useMutation(UPDATE_ENTITY_NAME);

  return [updateEntity, { loading, error }] as const;
};
