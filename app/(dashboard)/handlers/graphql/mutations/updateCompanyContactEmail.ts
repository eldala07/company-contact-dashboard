import { gql as generateGql } from "@/app/generated";

export const UPDATE_COMPANY_CONTACT_EMAIL = generateGql(/*GraphQL*/ `
    mutation UpdateCompanyContactEmail($input: UpdateEntityInput!) {
        updateEntity(input: $input) {
            id
            ... on Company {
                contactEmail
            }
        }
    }
`);
