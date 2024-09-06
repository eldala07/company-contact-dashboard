import { useMutation } from "@apollo/client";
import { UPDATE_COMPANY_INDUSTRY } from "@/app/(dashboard)/handlers/graphql/mutations/updateCompanyIndustry";

export const useUpdateCompanyIndustryMutation = () => {
  const [updateCompanyIndustry, { loading, error }] = useMutation(
    UPDATE_COMPANY_INDUSTRY,
  );

  return [updateCompanyIndustry, { loading, error }] as const;
};
