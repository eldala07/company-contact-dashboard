import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_API_URL || "./schema.graphql",
  documents: "./app/**/*.ts",
  generates: {
    "app/generated/": {
      preset: "client",
      config: {
        documentMode: "documentNode",
        dedupeFragments: true,
      },
      presetConfig: {
        gqlTagName: "gql",
        dedupeFragments: true,
        fragmentMasking: false,
      },
      // plugins: [
      //     "typescript",
      //     "typescript-operations",
      //     "typed-document-node",
      // ],
    },
  },
  hooks: {
    afterOneFileWrite: ["prettier --write"],
  },
};

export default config;
