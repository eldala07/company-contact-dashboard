import { useMutation } from "@apollo/client";
import { DELETE_ENTITY } from "@/app/(dashboard)/handlers/graphql/mutations/deleteEntity";

export const useDeleteEntityMutation = () => {
  const [deleteEntity, { loading, error }] = useMutation(DELETE_ENTITY, {
    update(cache, { data }) {
      const deleteEntity = data?.deleteEntity;
      if (!deleteEntity) return;

      const identification = cache.identify({
        id: deleteEntity?.id,
        __typename: deleteEntity.__typename,
      });

      cache.evict({ id: identification });
      cache.gc();
    },
  });

  return [deleteEntity, { loading, error }] as const;
};
