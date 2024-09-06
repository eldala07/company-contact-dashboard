import { gql as generateGql } from "@/app/generated";

export const UPDATE_ENTITY_NAME = generateGql(/*GraphQL*/ `
    mutation UpdateEntityName($input: UpdateEntityInput!) {
        updateEntity(input: $input) {
            id
            name
        }
    }
`);
