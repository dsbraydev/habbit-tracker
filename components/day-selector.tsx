"use client";

import { cn } from "@/lib/cn";

const days = [
  { label: "S", name: "Sunday" },
  { label: "M", name: "Monday" },
  { label: "T", name: "Tuesday" },
  { label: "W", name: "Wednesday" },
  { label: "T", name: "Thursday" },
  { label: "F", name: "Friday" },
  { label: "S", name: "Saturday" },
];

type DaySelectorProps = {
  value: number[];
  onChange: (days: number[]) => void;
};

export function DaySelector({ value, onChange }: DaySelectorProps) {
  function toggleDay(day: number) {
    onChange(
      value.includes(day)
        ? value.filter((d) => d !== day)
        : [...value, day].sort((a, b) => a - b)
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between gap-2">
        {days.map(({ label, name }, day) => {
          const selected = value.includes(day);
          return (
            <button
              key={name}
              type="button"
              onClick={() => toggleDay(day)}
              aria-pressed={selected}
              aria-label={name}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                selected
                  ? "border-accent-via bg-accent-via text-text-primary"
                  : "border-border text-text-secondary"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
