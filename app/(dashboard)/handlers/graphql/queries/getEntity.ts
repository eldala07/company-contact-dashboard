import { gql as generateGql } from "@/app/generated";

export const GET_ENTITY = generateGql(/*GraphQL*/ `
    query GetEntity($id: ID!) {
        getEntity(id: $id) {
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
