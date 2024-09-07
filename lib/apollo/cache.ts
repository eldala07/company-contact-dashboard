import { InMemoryCache } from "@apollo/experimental-nextjs-app-support";

export const cache = new InMemoryCache({
  typePolicies: {
    Company: {
      keyFields: ["id"],
    },
    Contact: {
      keyFields: ["id"],
    },
    Query: {
      fields: {
        getEntity: {
          read(_, { args, toReference, canRead }) {
            const companyRef = toReference({
              __typename: "Company",
              id: args?.id,
            });
            if (companyRef && canRead(companyRef)) {
              return companyRef;
            }

            const contactRef = toReference({
              __typename: "Contact",
              id: args?.id,
            });
            if (contactRef && canRead(contactRef)) {
              return contactRef;
            }

            return null;
          },
        },
      },
    },
  },
});
