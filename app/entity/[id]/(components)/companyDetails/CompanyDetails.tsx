"use client";

import React, { memo } from "react";
import { Company } from "@/app/generated/graphql";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, Building2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export const CompanyDetails = memo(({ company }: { company: Company }) => {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/");
  };

  return (
    <Card className="relative w-[380px]">
      <CardHeader>
        <CardTitle>{company.name}</CardTitle>
        <CardDescription>{company.industry}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {company.contactEmail && (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary/70"></div>
            </div>
            <div className="text-sm font-bold text-primary/70">
              {company.contactEmail}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="z-10 relative">
        <Button className="w-full" onClick={handleBackToDashboard}>
          <CheckIcon className="mr-2 h-4 w-4" /> Back to dashboard
        </Button>
      </CardFooter>
      <div className="absolute top-0 right-0 z-0">
        <Building2Icon width={"150px"} height={"150px"} opacity={0.05} />
      </div>
    </Card>
  );
});

CompanyDetails.displayName = "CompanyDetails";
