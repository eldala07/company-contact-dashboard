import { gql as generateGql } from "@/app/generated";

export const UPDATE_COMPANY_INDUSTRY = generateGql(/*GraphQL*/ `
    mutation UpdateCompanyIndustry($input: UpdateEntityInput!) {
        updateEntity(input: $input) {
            id
            ... on Company {
                industry
            }
        }
    }
`);
