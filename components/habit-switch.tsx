"use client";

import { cn } from "@/lib/cn";
import { dummyHabits } from "@/lib/dummy-habits";
import { habitColorThemes, defaultColorId } from "@/lib/habit-colors";

type HabitSwitchProps = {
  value: string | null;
  onChange: (id: string | null) => void;
};

export function HabitSwitch({ value, onChange }: HabitSwitchProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onChange(null)}
        aria-pressed={value === null}
        className={cn(
          "shrink-0 rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors",
          value === null
            ? habitColorThemes[defaultColorId].pillClass
            : "border-border text-text-secondary"
        )}
      >
        All
      </button>
      {dummyHabits.map((habit) => {
        const selected = value === habit.id;
        const theme = habitColorThemes[habit.colorId];
        return (
          <button
            key={habit.id}
            type="button"
            onClick={() => onChange(habit.id)}
            aria-pressed={selected}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors",
              selected ? theme.pillClass : "border-border text-text-secondary"
            )}
          >
            <habit.icon className="h-4 w-4" />
            {habit.name}
          </button>
        );
      })}
    </div>
  );
}
