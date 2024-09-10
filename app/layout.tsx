import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ApolloWrapper } from "@/components/providers/apollo-wrapper";
import { Provider as JotaiProvider } from "jotai";
import { Toaster } from "sonner";

import { ClientSideRowModelModule, ModuleRegistry } from "ag-grid-community";

import {
  ClipboardModule,
  ColumnsToolPanelModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  LicenseManager,
  MenuModule,
  RangeSelectionModule,
  SetFilterModule,
  StatusBarModule,
} from "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
import "./ag-grid-theme-builder.css";
import { TooltipProvider } from "@/components/ui/tooltip";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ClipboardModule,
  MenuModule,
  RangeSelectionModule,
  ExcelExportModule,
  StatusBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);
LicenseManager.setLicenseKey(
  process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY || "no_license_key",
);

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DUY - Contacts and companies",
  description: "A dashboard to manage contacts and companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <TooltipProvider>
          <JotaiProvider>
            <ApolloWrapper>
              <div className="flex min-h-screen bg-zinc-50">
                {/*<div className="w-48 bg-zinc-800 rounded-tr-2xl rounded-br-2xl"></div>*/}
                <main className="flex-1 overflow-hidden flex justify-center">
                  {children}
                </main>
              </div>
            </ApolloWrapper>
          </JotaiProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
