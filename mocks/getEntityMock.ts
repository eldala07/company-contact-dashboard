import {GET_ENTITY} from "@/app/(dashboard)/handlers/graphql/queries/getEntity";

export const getEntityMock =  {
    request: {
        query: GET_ENTITY,
        variables: {
            id: '1',
        },
    },
    result: {
        data: {
            getEntity: {
                id: '1',
                name: 'Alice',
                email: 'alice@example.com',
                __typename: 'Contact',
            },
        },
    },
};