import { useMutation } from "@apollo/client";
import { DELETE_ENTITY } from "@/app/(dashboard)/handlers/graphql/mutations/deleteEntity";

export const useDeleteEntityMutation = () => {
  const [deleteEntity, { loading, error }] = useMutation(DELETE_ENTITY);

  return [deleteEntity, { loading, error }] as const;
};
