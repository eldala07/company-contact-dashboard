import { atom } from "jotai";

export const entityTypeInInlineCreationAtom = atom<
  "Contact" | "Company" | null
>(null);
