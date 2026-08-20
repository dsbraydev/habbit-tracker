import { cn } from "@/lib/cn";
import type { dummyHistory } from "@/lib/dummy-history";
import type { habitColorThemes } from "@/lib/habit-colors";

const dayLetters = ["S", "M", "T", "W", "T", "F", "S"];

type WeekStripProps = {
  /** Most-recent-first, e.g. `dummyHistory.slice(0, 7)`. */
  days: typeof dummyHistory;
  /** Filter to one habit's completion, or `null` for the all-habits ratio. */
  habitId: string | null;
  theme: (typeof habitColorThemes)[string];
};

export function WeekStrip({ days, habitId, theme }: WeekStripProps) {
  const chronological = [...days].reverse();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between gap-2">
        {chronological.map((day, index) => {
          const relevant = habitId
            ? day.habits.filter((habit) => habit.id === habitId)
            : day.habits;
          const completed = relevant.filter((habit) => habit.completed).length;
          const total = relevant.length;
          const isToday = index === chronological.length - 1;
          const level = completed === 0 ? "none" : completed === total ? "full" : "partial";

          return (
            <div
              key={day.date.toISOString()}
              className={cn(
                "flex h-16 w-10 flex-col items-center justify-center gap-1 rounded-xl border-2 text-xs font-medium",
                level === "full" && theme.fullClass,
                level === "partial" && theme.partialClass,
                level === "none" && "border-border text-text-secondary",
                isToday && cn("ring-2 ring-offset-2 ring-offset-bg", theme.ringClass)
              )}
            >
              <span>{dayLetters[day.date.getDay()]}</span>
              <span className="text-sm font-semibold">{day.date.getDate()}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 text-xs text-text-secondary">
        <LegendItem swatchClass={theme.dotClass} label="Full" />
        <LegendItem swatchClass={cn("border", theme.partialClass)} label="Partial" />
        <LegendItem swatchClass="border border-border" label="None" />
      </div>
    </div>
  );
}

function LegendItem({ swatchClass, label }: { swatchClass: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("h-2.5 w-2.5 rounded-full", swatchClass)} />
      {label}
    </span>
  );
}
