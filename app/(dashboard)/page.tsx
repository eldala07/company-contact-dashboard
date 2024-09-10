import React from "react";
import { GridRefProvider } from "@/app/(dashboard)/handlers/context/GridRefContext";
import { PageContent } from "./page-content";

export default function Dashboard() {
  return (
    <GridRefProvider>
      <PageContent />
    </GridRefProvider>
  );
}
