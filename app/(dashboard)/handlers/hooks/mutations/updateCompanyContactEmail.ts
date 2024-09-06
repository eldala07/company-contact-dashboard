import { useMutation } from "@apollo/client";
import { UPDATE_COMPANY_CONTACT_EMAIL } from "@/app/(dashboard)/handlers/graphql/mutations/updateCompanyContactEmail";

export const useUpdateCompanyContactEmailMutation = () => {
  const [updateCompanyContactEmail, { loading, error }] = useMutation(
    UPDATE_COMPANY_CONTACT_EMAIL,
  );

  return [updateCompanyContactEmail, { loading, error }] as const;
};
