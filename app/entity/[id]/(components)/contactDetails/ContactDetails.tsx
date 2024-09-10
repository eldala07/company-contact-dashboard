"use client";

import React, { memo } from "react";
import { Contact } from "@/app/generated/graphql";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, UserRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const ContactDetails = memo(({ contact }: { contact: Contact }) => {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/");
  };

  return (
    <Card className="relative w-[380px]">
      <CardHeader>
        <CardTitle>{contact.name}</CardTitle>
        <CardDescription>{contact.email}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {contact.phone && (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary/70"></div>
            </div>
            <div className="text-sm font-bold text-primary/70">
              {contact.phone}
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
        <UserRoundIcon width={"200px"} height={"200px"} opacity={0.05} />
      </div>
    </Card>
  );
});

ContactDetails.displayName = "ContactDetails";
