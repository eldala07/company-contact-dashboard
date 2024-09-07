"use client";

import { useGetEntities } from "@/app/(dashboard)/handlers/hooks/queries/getEntities";
import { isDefined } from "@/lib/isDefined/isDefined";
import { Button } from "@/components/ui/button";
import { useCreateEntityMutation } from "@/app/(dashboard)/handlers/hooks/mutations/createEntity";
import { entityTypes } from "@/lib/constants";
import { EntityType } from "@/app/generated/graphql";
import { toast } from "sonner";

export default function Home() {
  const { data, loading, error } = useGetEntities();
  const entities = (data?.getEntities || []).filter(isDefined);

  const [createEntity, { loading: isCreating }] = useCreateEntityMutation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleCreateCompany = async () => {
    const { errors } = await createEntity({
      variables: {
        input: {
          entityType: entityTypes.COMPANY as EntityType,
          name: "Company name",
          industry: "Company industry",
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        createEntity: {
          __typename: "Company",
          id: "random-uuid",
          name: "Company name",
          industry: "Company industry",
        },
      },
    });

    if (errors?.length) {
      toast.error("Something went wrong adding company");
    } else {
      toast.success("Company added");
    }
  };

  const handleCreateContact = async () => {
    const { errors } = await createEntity({
      variables: {
        input: {
          entityType: entityTypes.CONTACT as EntityType,
          name: "Contact name",
          email: "contact@test.com",
          phone: "+32472765263",
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        createEntity: {
          __typename: "Contact",
          id: "random-uuid",
          name: "Contact name",
          email: "contact@test.com",
          phone: "+32472765263",
        },
      },
    });

    if (errors?.length) {
      toast.error("Something went wrong adding contact");
    } else {
      toast.success("Contact added");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Contacts and companies</h1>
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>
            {entity.name} -
            {"email" in entity
              ? `Email: ${entity.email}`
              : `Industry: ${entity.industry}`}
          </li>
        ))}
      </ul>
      <div className="flex gap-2 items-center">
        <Button onClick={handleCreateCompany} disabled={isCreating}>
          Add company
        </Button>
        <Button onClick={handleCreateContact} disabled={isCreating}>
          Add contact
        </Button>
      </div>
    </div>
  );
}
