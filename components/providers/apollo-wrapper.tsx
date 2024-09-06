"use client";

import React from "react";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import { makeClient } from "@/lib/apollo/client";

type ApolloWrapperProps = {
  children: React.ReactNode;
};
export function ApolloWrapper({ children }: ApolloWrapperProps) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
