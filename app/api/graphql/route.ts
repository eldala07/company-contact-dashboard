import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { mockedSchema } from "@/lib/mockServer/mockServer";
import { NextRequest } from "next/server";

const server = new ApolloServer({
  schema: mockedSchema,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
