import { gql as generateGql } from "@/app/generated";

export const UPDATE_ENTITY = generateGql(/*GraphQL*/ `
    mutation UpdateEntity($input: UpdateEntityInput!) {
        updateEntity(input: $input) {
            id
            name
            ... on Contact {
                email
                phone
            }
            ... on Company {
                industry
                contactEmail
            }
        }
    }
`);
