import { gql as generateGql } from "@/app/generated";

export const CREATE_ENTITY = generateGql(/*GraphQL*/ `
    mutation CreateEntity($input: CreateEntityInput!) {
        createEntity(input: $input) {
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
