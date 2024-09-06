import { useMutation } from "@apollo/client";
import { UPDATE_CONTACT_PHONE } from "@/app/(dashboard)/handlers/graphql/mutations/updateContactPhone";

export const useUpdateContactPhoneMutation = () => {
  const [updateContactPhone, { loading, error }] =
    useMutation(UPDATE_CONTACT_PHONE);

  return [updateContactPhone, { loading, error }] as const;
};
