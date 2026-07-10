"use client";

import { Button } from "@/shared/ui";

export function PrintButton({ label = "Print" }: { label?: string }) {
  return (
    <Button type="button" variant="secondary" size="sm" onClick={() => window.print()}>
      {label}
    </Button>
  );
}
