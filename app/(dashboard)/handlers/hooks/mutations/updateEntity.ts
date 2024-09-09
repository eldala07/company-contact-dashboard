import { useMutation } from "@apollo/client";
import { UPDATE_ENTITY } from "@/app/(dashboard)/handlers/graphql/mutations/updateEntity";

export const useUpdateEntityMutation = () => {
  const [updateEntity, { loading, error }] = useMutation(UPDATE_ENTITY);

  return [updateEntity, { loading, error }] as const;
};
