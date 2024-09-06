import { useMutation } from "@apollo/client";
import { CREATE_ENTITY } from "@/app/(dashboard)/handlers/graphql/mutations/createEntity";

export const useCreateEntityMutation = () => {
  const [createEntity, { loading, error }] = useMutation(CREATE_ENTITY, {
    update(cache, { data }) {
      const createEntity = data?.createEntity;
      if (!createEntity) return;

      cache.modify({
        fields: {
          getEntities(existingEntitiesRefs = []) {
            return [
              ...existingEntitiesRefs,
              { __typename: createEntity.__typename, ...createEntity },
            ];
          },
        },
      });
    },
  });

  return [createEntity, { loading, error }] as const;
};
