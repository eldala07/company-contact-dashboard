import React from "react";
import { Company } from "@/app/generated/graphql";

const CompanyDetails = ({ company }: { company: Company }) => {
  return <div>{company.name}</div>;
};
export default CompanyDetails;
