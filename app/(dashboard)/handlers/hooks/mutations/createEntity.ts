import { useMutation } from "@apollo/client";
import { CREATE_ENTITY } from "@/app/(dashboard)/handlers/graphql/mutations/createEntity";

export const useCreateEntityMutation = () => {
  const [createEntity, { loading, error }] = useMutation(CREATE_ENTITY);

  return [createEntity, { loading, error }] as const;
};
