"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export const colorOptions = [
  {
    id: "accent-from",
    swatchClass: "bg-accent-from",
    ringClass: "ring-accent-from",
    badgeClass: "bg-accent-from/15 text-accent-from",
  },
  {
    id: "accent-via",
    swatchClass: "bg-accent-via",
    ringClass: "ring-accent-via",
    badgeClass: "bg-accent-via/15 text-accent-via",
  },
  {
    id: "accent-to",
    swatchClass: "bg-accent-to",
    ringClass: "ring-accent-to",
    badgeClass: "bg-accent-to/15 text-accent-to",
  },
  {
    id: "success",
    swatchClass: "bg-success",
    ringClass: "ring-success",
    badgeClass: "bg-success/15 text-success",
  },
  {
    id: "streak",
    swatchClass: "bg-streak",
    ringClass: "ring-streak",
    badgeClass: "bg-streak/15 text-streak",
  },
] as const;

type ColorPickerProps = {
  value: string;
  onChange: (id: string) => void;
};

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-3">
      {colorOptions.map(({ id, swatchClass, ringClass }) => {
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={selected}
            aria-label={id}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              swatchClass,
              selected && "ring-2 ring-offset-2 ring-offset-bg",
              selected && ringClass
            )}
          >
            {selected && <Check className="h-4 w-4 text-text-primary" />}
          </button>
        );
      })}
    </div>
  );
}
