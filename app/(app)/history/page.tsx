"use client";

import { useMemo, useState } from "react";
import { HabitSwitch } from "@/components/habit-switch";
import { WeekStrip } from "@/components/week-strip";
import { MonthCalendar } from "@/components/month-calendar";
import { ProgressChart } from "@/components/progress-chart";
import { useHabits } from "@/lib/habits-context";
import { useHabitHistory } from "@/lib/use-habit-history";
import { habitColorThemes, defaultColorId } from "@/lib/habit-colors";

export default function HistoryPage() {
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const { habits } = useHabits();
  const { history, loading } = useHabitHistory();

  const selectedHabit = habits.find((habit) => habit.id === selectedHabitId);
  const theme = habitColorThemes[selectedHabit?.colorId ?? defaultColorId];

  const chartData = useMemo(() => {
    return [...history].reverse().map((day) => {
      const relevant = selectedHabitId
        ? day.habits.filter((habit) => habit.id === selectedHabitId)
        : day.habits;
      const completed = relevant.filter((habit) => habit.completed).length;
      const value = relevant.length ? (completed / relevant.length) * 100 : 0;
      return { date: day.date, value };
    });
  }, [history, selectedHabitId]);

  return (
    <div className="flex flex-col gap-8 px-6 pt-[max(2rem,env(safe-area-inset-top))]">
      <header>
        <h1 className="text-2xl font-bold text-text-primary">History</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {selectedHabit ? selectedHabit.name : "All habits"}
        </p>
      </header>

      <HabitSwitch value={selectedHabitId} onChange={setSelectedHabitId} />

      {loading ? (
        <p className="text-sm text-text-secondary">Loading history...</p>
      ) : (
        <>
          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">This Week</h2>
            <WeekStrip
              days={history.slice(0, 7)}
              habitId={selectedHabitId}
              theme={theme}
            />
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">This Month</h2>
            <MonthCalendar days={history} habitId={selectedHabitId} theme={theme} />
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">
              All-Time Progress
            </h2>
            <ProgressChart data={chartData} cssVar={theme.cssVar} />
          </section>
        </>
      )}
    </div>
  );
}
