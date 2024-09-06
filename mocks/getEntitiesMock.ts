import {GET_ENTITIES} from "@/app/(dashboard)/handlers/graphql/queries/getEntities";

export const getEntitiesMock =  {
    request: {
        query: GET_ENTITIES,
    },
    result: {
        data: {
            getEntities: [
                { id: '1', name: 'Alice', email: 'alice@example.com', __typename: 'Contact' },
                { id: '2', name: 'Company X', industry: 'Tech', __typename: 'Company' },
                { id: '3', name: 'Bob', email: 'bob@example.com', __typename: 'Contact' },
                { id: '4', name: 'Company Y', industry: 'Finance', __typename: 'Company' },
                { id: '5', name: 'Company Z', industry: 'Finance', __typename: 'Company' },
                { id: '6', name: 'Charlie', email: 'charlie@example.com', __typename: 'Contact' },
            ],
        },
    },
};