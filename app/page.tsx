"use client";

import { useGetEntities } from "@/app/(dashboard)/handlers/hooks/queries/getEntities";
import { isDefined } from "@/lib/isDefined/isDefined";
export default function Home() {
  const { data, loading, error } = useGetEntities();
  const entities = (data?.getEntities || []).filter(isDefined);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
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
  );
}
