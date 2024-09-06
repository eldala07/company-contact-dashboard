import { gql as generateGql } from "@/app/generated";

export const UPDATE_CONTACT_EMAIL = generateGql(/*GraphQL*/ `
    mutation UpdateContactEmail($input: UpdateEntityInput!) {
        updateEntity(input: $input) {
            id
            ... on Contact {
                email
            }
        }
    }
`);
