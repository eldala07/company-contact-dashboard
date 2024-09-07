"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  // error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <Button onClick={() => router.push("/")}>Try again</Button>
      </body>
    </html>
  );
}
