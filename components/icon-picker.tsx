"use client";

import {
  BookOpen,
  Cookie,
  Droplet,
  Dumbbell,
  Flower2,
  Moon,
  Sun,
  Target,
} from "lucide-react";
import { cn } from "@/lib/cn";

export const iconOptions: { id: string; icon: typeof Dumbbell }[] = [
  { id: "dumbbell", icon: Dumbbell },
  { id: "droplet", icon: Droplet },
  { id: "flower", icon: Flower2 },
  { id: "book", icon: BookOpen },
  { id: "cookie", icon: Cookie },
  { id: "moon", icon: Moon },
  { id: "sun", icon: Sun },
  { id: "target", icon: Target },
];

type IconPickerProps = {
  value: string;
  onChange: (id: string) => void;
};

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {iconOptions.map(({ id, icon: Icon }) => {
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={selected}
            aria-label={id}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-colors",
              selected
                ? "border-accent-via bg-accent-via/15 text-accent-via"
                : "border-border text-text-secondary"
            )}
          >
            <Icon className="h-5 w-5" />
          </button>
        );
      })}
    </div>
  );
}
