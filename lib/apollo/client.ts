import { ApolloLink, HttpLink } from "@apollo/client";
import {
  SSRMultipartLink,
  ApolloClient,
} from "@apollo/experimental-nextjs-app-support";
import { cache } from "./cache";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

export function makeClient() {
  const httpLink = new HttpLink({
    uri: "/api/graphql",
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache,
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}
