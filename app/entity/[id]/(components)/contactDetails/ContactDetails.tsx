import React from "react";
import { Contact } from "@/app/generated/graphql";

const ContactDetails = ({ contact }: { contact: Contact }) => {
  return <div>{contact.name}</div>;
};
export default ContactDetails;
