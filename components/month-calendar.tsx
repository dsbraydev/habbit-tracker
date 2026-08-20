import { cn } from "@/lib/cn";
import type { dummyHistory } from "@/lib/dummy-history";
import type { habitColorThemes } from "@/lib/habit-colors";

const dayLetters = ["S", "M", "T", "W", "T", "F", "S"];

type MonthCalendarProps = {
  days: typeof dummyHistory;
  habitId: string | null;
  theme: (typeof habitColorThemes)[string];
};

export function MonthCalendar({ days, habitId, theme }: MonthCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = new Date(year, month, 1).getDay();

  const byDate = new Map(days.map((day) => [day.date.toDateString(), day]));

  const cells = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    const isFuture = date.getTime() > today.getTime();
    const isToday = date.getTime() === today.getTime();
    const entry = byDate.get(date.toDateString());

    let level: "none" | "partial" | "full" | "future" = "future";
    if (entry && !isFuture) {
      const relevant = habitId
        ? entry.habits.filter((habit) => habit.id === habitId)
        : entry.habits;
      const completed = relevant.filter((habit) => habit.completed).length;
      const total = relevant.length;
      level = completed === 0 ? "none" : completed === total ? "full" : "partial";
    }

    return { date, level, isToday };
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-text-secondary">
        {dayLetters.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: leadingBlanks }).map((_, index) => (
          <div key={`blank-${index}`} />
        ))}
        {cells.map(({ date, level, isToday }) => (
          <div
            key={date.toISOString()}
            className={cn(
              "flex aspect-square items-center justify-center rounded-lg border-2 text-xs font-medium",
              level === "full" && theme.fullClass,
              level === "partial" && theme.partialClass,
              level === "none" && "border-border text-text-secondary",
              level === "future" && "border-border/50 text-text-secondary/40",
              isToday && cn("ring-2 ring-offset-2 ring-offset-bg", theme.ringClass)
            )}
          >
            {date.getDate()}
          </div>
        ))}
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
