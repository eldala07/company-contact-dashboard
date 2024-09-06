import { gql as generateGql } from "@/app/generated";

export const GET_ENTITIES = generateGql(/*GraphQL*/ `
    query GetEntities {
        getEntities {
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
