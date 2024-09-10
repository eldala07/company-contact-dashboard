"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetEntity } from "@/app/(dashboard)/handlers/hooks/queries/getEntity";
import { isContact } from "@/app/(dashboard)/handlers/services/isContact/isContact";
import { isCompany } from "@/app/(dashboard)/handlers/services/isCompany/isCompany";
import ContactDetails from "@/app/entity/[id]/(components)/contactDetails/ContactDetails";
import CompanyDetails from "@/app/entity/[id]/(components)/companyDetails/CompanyDetails";

const EntityDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useGetEntity({
    variables: { id },
    skip: !id,
  });

  const entity = data?.getEntity;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (!entity) return <p>Entity not found</p>;

  if (isContact(entity)) {
    return <ContactDetails contact={entity} />;
  }
  if (isCompany(entity)) {
    return <CompanyDetails company={entity} />;
  }

  return null;
};

export default EntityDetails;
