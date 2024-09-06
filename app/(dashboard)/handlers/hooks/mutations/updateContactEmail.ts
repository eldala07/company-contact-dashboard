import { useMutation } from "@apollo/client";
import { UPDATE_CONTACT_EMAIL } from "@/app/(dashboard)/handlers/graphql/mutations/updateContactEmail";

export const useUpdateContactEmailMutation = () => {
  const [updateContactEmail, { loading, error }] =
    useMutation(UPDATE_CONTACT_EMAIL);

  return [updateContactEmail, { loading, error }] as const;
};
