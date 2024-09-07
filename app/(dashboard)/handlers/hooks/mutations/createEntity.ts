import { gql, useMutation } from "@apollo/client";
import { CREATE_ENTITY } from "@/app/(dashboard)/handlers/graphql/mutations/createEntity";

export const useCreateEntityMutation = () => {
  const [createEntity, { loading, error }] = useMutation(CREATE_ENTITY, {
    update(cache, { data }) {
      const createEntity = data?.createEntity;
      if (!createEntity) return;

      cache.modify({
        fields: {
          getEntities(existingEntitiesRefs = []) {
            const newRef = cache.writeFragment({
              data: createEntity,
              fragment: gql`
                fragment NewEntity on Entity {
                  id
                }
              `,
            });
            return [...existingEntitiesRefs, newRef];
          },
        },
      });
    },
  });

  return [createEntity, { loading, error }] as const;
};
