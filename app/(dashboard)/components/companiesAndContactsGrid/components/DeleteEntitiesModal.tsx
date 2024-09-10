"use client";

import React, { memo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAtom } from "jotai";
import { isDeletingEntitiesAtom } from "@/app/(dashboard)/handlers/atoms";
import { Button } from "@/components/ui/button";
import { useDeleteEntityMutation } from "@/app/(dashboard)/handlers/hooks/mutations/deleteEntity";
import { LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

type Props = {
  checked?: string[];
  setChecked: (checked: string[]) => void;
};
export const DeleteEntitiesModal = memo(
  ({ checked = [], setChecked }: Props) => {
    const [deleteEntity] = useDeleteEntityMutation();
    const [isDeletingEntities, setIsDeletingEntities] = useAtom(
      isDeletingEntitiesAtom,
    );

    const [isActionOngoing, setIsActionOngoing] = useState(false);

    const handleOnClose = () => {
      if (isActionOngoing) return;

      setChecked([]);
      setIsActionOngoing(false);
      setIsDeletingEntities(false);
    };

    const handleOnDelete = async () => {
      if (isActionOngoing) return;

      setIsActionOngoing(true);
      await Promise.all(
        //INFO: should be changed to deleteEntities
        checked.map(async (id) => {
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
        }),
      );
      handleOnClose();
    };

    return (
      <Dialog open={isDeletingEntities} onOpenChange={handleOnClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure to delete these entities?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              entities and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleOnClose}>
              Cancel
            </Button>
            <Button
              onClick={handleOnDelete}
              variant="destructive"
              className="flex gap-0.5"
            >
              {isActionOngoing ? (
                <LoaderCircleIcon className="h-4 w-4 animate-spin" />
              ) : null}
              <div>{isActionOngoing ? "Deleting..." : "Delete"}</div>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

DeleteEntitiesModal.displayName = "DeleteEntitiesModal";
