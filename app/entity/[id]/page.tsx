"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetEntity } from "@/app/(dashboard)/handlers/hooks/queries/getEntity";
import { isContact } from "@/app/(dashboard)/handlers/services/isContact/isContact";
import { isCompany } from "@/app/(dashboard)/handlers/services/isCompany/isCompany";
import { ContactDetails } from "@/app/entity/[id]/(components)/contactDetails/ContactDetails";
import { CompanyDetails } from "@/app/entity/[id]/(components)/companyDetails/CompanyDetails";
import { toast } from "sonner";
import NotFound from "@/components/shared/not-found";

const EntityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, loading, error } = useGetEntity({
    variables: { id },
    skip: !id,
  });

  const entity = data?.getEntity;

  if (loading) return <p>Loading...</p>;
  if (error) {
    toast.error("Something went wrong loading the entity");
    router.push("/");
    return null;
  }

  if (!entity) return <NotFound />;

  if (isContact(entity)) {
    return <ContactDetails contact={entity} />;
  }
  if (isCompany(entity)) {
    return <CompanyDetails company={entity} />;
  }

  return null;
};

export default EntityDetails;
