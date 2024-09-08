"use client";

import { useGetEntities } from "@/app/(dashboard)/handlers/hooks/queries/getEntities";
import { isDefined } from "@/lib/isDefined/isDefined";
import { Button } from "@/components/ui/button";
import { useCreateEntityMutation } from "@/app/(dashboard)/handlers/hooks/mutations/createEntity";
import { entityTypes } from "@/lib/constants";
import { EntityType } from "@/app/generated/graphql";
import { toast } from "sonner";
import {
  EditIcon,
  TrashIcon,
  EyeIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { useDeleteEntityMutation } from "@/app/(dashboard)/handlers/hooks/mutations/deleteEntity";
import { useAtom } from "jotai";
import { entityIdAtom } from "@/app/(dashboard)/handlers/atoms";
import { useRouter } from "next/navigation";
import { DrawerEntity } from "@/app/entity/[id]/(components)/drawerEntity/DrawerEntity";
import { CompaniesAndContactsGrid } from "@/app/(dashboard)/components/CompaniesAndContactsGrid";

export default function Dashboard() {
  const { data, loading, error } = useGetEntities();
  const entities = (data?.getEntities || []).filter(isDefined);

  const [createEntity, { loading: isCreating }] = useCreateEntityMutation();
  const [deleteEntity] = useDeleteEntityMutation();

  const router = useRouter();
  const [entityIdInEdit, setEntityIdInEdit] = useAtom(entityIdAtom);

  const handleCreateCompany = async () => {
    const { errors } = await createEntity({
      variables: {
        input: {
          entityType: entityTypes.COMPANY as EntityType,
          name: "Company name",
          industry: "Company industry",
          contactEmail: "company@test.com",
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        createEntity: {
          __typename: "Company",
          id: "random-uuid",
          name: "Company name",
          industry: "Company industry",
          contactEmail: "company@test.com",
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
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        createEntity: {
          __typename: "Contact",
          id: "random-uuid",
          name: "Contact name",
          email: "contact@test.com",
          phone: "",
        },
      },
    });

    if (errors?.length) {
      toast.error("Something went wrong adding contact");
    } else {
      toast.success("Contact added");
    }
  };

  const handleDeleteEntity = async (id: string) => {
    const { errors } = await deleteEntity({
      variables: {
        input: {
          id,
        },
      },
      // optimisticResponse: {
      //   __typename: "Mutation",
      //   deleteEntity: {
      //     __typename: "Entity",
      //     id: "random-uuid",
      //   },
      // },
    });

    if (errors?.length) {
      toast.error("Something went wrong deleting entity");
    } else {
      toast.success("Entity deleted");
    }
  };

  const handleEditEntity = async (id: string) => {
    setEntityIdInEdit(id);
  };

  const handleOpenEntity = async (id: string) => {
    router.push(`/entity/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="min-h-screen flex flex-col h-full">
      <div className="px-8 h-16 flex gap-2 items-center bg-slate-50 border-b border-slate-200 text-slate-800">
        <LayoutDashboardIcon />
        <h1 className="text-2xl font-bold">Contacts and companies</h1>
      </div>
      <div className="flex-1 flex flex-col gap-4 p-8 h-full">
        <div className="flex gap-2 items-center">
          <Button onClick={handleCreateCompany} disabled={isCreating}>
            Add company
          </Button>
          <Button onClick={handleCreateContact} disabled={isCreating}>
            Add contact
          </Button>
        </div>
        <CompaniesAndContactsGrid />
        <ul>
          {entities.map((entity) => (
            <li key={entity.id}>
              <div className="flex gap-2">
                <TrashIcon onClick={() => handleDeleteEntity(entity.id)} />
                <EditIcon onClick={() => handleEditEntity(entity.id)} />
                <EyeIcon onClick={() => handleOpenEntity(entity.id)} />
                <div>
                  {entity.name} -
                  {"email" in entity
                    ? `Email: ${entity.email}`
                    : `Industry: ${entity.industry}`}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {entityIdInEdit ? <DrawerEntity /> : null}
    </div>
  );
}
