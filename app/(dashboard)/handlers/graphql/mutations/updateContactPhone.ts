import { gql as generateGql } from "@/app/generated";

export const UPDATE_CONTACT_PHONE = generateGql(/*GraphQL*/ `
    mutation UpdateContactPhone($input: UpdateEntityInput!) {
        updateEntity(input: $input) {
            id
            ... on Contact {
                phone
            }
        }
    }
`);
