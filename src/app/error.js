'use client';

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8">{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
