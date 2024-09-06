import { isCompany } from "../isCompany";

describe("isCompany", () => {
  it("returns true for a company", () => {
    const company = {
      __typename: "Company",
      id: "company-id",
      name: "company-name",
      industry: "company-industry",
    };

    expect(isCompany(company)).toBe(true);
  });

  it("returns false for a contact", () => {
    const contact = {
      __typename: "Contact",
      id: "contact-id",
      name: "contact-name",
      email: "contact-email@test.com",
      phone: "+32472765263",
    };

    expect(isCompany(contact)).toBe(false);
  });
});
