import { gql as generateGql } from "@/app/generated";

export const DELETE_ENTITY = generateGql(/*GraphQL*/ `
    mutation DeleteEntity($input: DeleteEntityInput!) {
        deleteEntity(input: $input) 
    }
`);
