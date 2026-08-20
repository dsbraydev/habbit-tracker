"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useHabits, type Habit } from "@/lib/habits-context";

const DAYS = 90;

export type HistoryDay = {
  date: Date;
  habits: Habit[];
};

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function daysAgo(n: number) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - n);
  return date;
}

export function useHabitHistory() {
  const { habits, loading: habitsLoading } = useHabits();
  const [history, setHistory] = useState<HistoryDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (habitsLoading) return;

    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const start = daysAgo(DAYS - 1);

      const { data: completions } = await supabase
        .from("habit_completions")
        .select("habit_id, completed_on")
        .gte("completed_on", dateKey(start));

      if (cancelled) return;

      const completedByDay = new Map<string, Set<string>>();
      (completions ?? []).forEach((row) => {
        const set = completedByDay.get(row.completed_on) ?? new Set<string>();
        set.add(row.habit_id);
        completedByDay.set(row.completed_on, set);
      });

      const days: HistoryDay[] = Array.from({ length: DAYS }, (_, i) => {
        const date = daysAgo(i);
        const completedIds = completedByDay.get(dateKey(date)) ?? new Set<string>();
        return {
          date,
          habits: habits.map((habit) => ({
            ...habit,
            completed: completedIds.has(habit.id),
          })),
        };
      });

      setHistory(days);
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [habits, habitsLoading]);

  return { history, loading: loading || habitsLoading };
}
