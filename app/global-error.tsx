"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html>
      <body>
        <h2>Something went wrong at the top level!</h2>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
