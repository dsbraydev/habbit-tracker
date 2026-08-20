"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { iconOptions } from "@/components/icon-picker";
import { colorOptions } from "@/components/color-picker";

export type Habit = {
  id: string;
  name: string;
  subtitle: string;
  icon: (typeof iconOptions)[number]["icon"];
  iconId: string;
  colorId: string;
  badgeClass: string;
  days: number[];
  completed: boolean;
};

export type HabitInput = Omit<Habit, "id" | "completed">;

type HabitsContextValue = {
  habits: Habit[];
  loading: boolean;
  toggleHabit: (id: string) => Promise<void>;
  addHabit: (input: HabitInput) => Promise<string | null>;
  updateHabit: (id: string, input: HabitInput) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function resolveIcon(iconId: string) {
  return iconOptions.find((option) => option.id === iconId)?.icon ?? iconOptions[0].icon;
}

function resolveBadgeClass(colorId: string) {
  return (
    colorOptions.find((option) => option.id === colorId)?.badgeClass ??
    colorOptions[0].badgeClass
  );
}

export function HabitsProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadHabits() {
      const supabase = createClient();
      const today = todayString();

      const [{ data: habitRows }, { data: completionRows }] = await Promise.all([
        supabase.from("habits").select("*").order("created_at", { ascending: true }),
        supabase
          .from("habit_completions")
          .select("habit_id")
          .eq("completed_on", today),
      ]);

      if (cancelled) return;

      const completedIds = new Set((completionRows ?? []).map((row) => row.habit_id));

      const merged: Habit[] = (habitRows ?? []).map((row) => ({
        id: row.id,
        name: row.name,
        subtitle: row.note,
        icon: resolveIcon(row.icon_id),
        iconId: row.icon_id,
        colorId: row.color_id,
        badgeClass: resolveBadgeClass(row.color_id),
        days: row.days ?? [],
        completed: completedIds.has(row.id),
      }));

      setHabits(merged);
      setLoading(false);
    }

    loadHabits();

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleHabit = useCallback(
    async (id: string) => {
      const habit = habits.find((item) => item.id === id);
      if (!habit) return;

      const supabase = createClient();
      const today = todayString();

      setHabits((prev) =>
        prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
      );

      if (habit.completed) {
        await supabase
          .from("habit_completions")
          .delete()
          .eq("habit_id", id)
          .eq("completed_on", today);
      } else {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;
        await supabase.from("habit_completions").insert({
          habit_id: id,
          user_id: userData.user.id,
          completed_on: today,
        });
      }
    },
    [habits]
  );

  const addHabit = useCallback(async (input: HabitInput) => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return null;

    const { data, error } = await supabase
      .from("habits")
      .insert({
        user_id: userData.user.id,
        name: input.name,
        note: input.subtitle,
        icon_id: input.iconId,
        color_id: input.colorId,
        days: input.days,
      })
      .select()
      .single();

    if (error || !data) return null;

    setHabits((prev) => [
      ...prev,
      {
        id: data.id,
        name: data.name,
        subtitle: data.note,
        icon: input.icon,
        iconId: input.iconId,
        colorId: input.colorId,
        badgeClass: input.badgeClass,
        days: input.days,
        completed: false,
      },
    ]);

    return data.id as string;
  }, []);

  const updateHabit = useCallback(async (id: string, input: HabitInput) => {
    const supabase = createClient();
    await supabase
      .from("habits")
      .update({
        name: input.name,
        note: input.subtitle,
        icon_id: input.iconId,
        color_id: input.colorId,
        days: input.days,
      })
      .eq("id", id);

    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, ...input } : habit))
    );
  }, []);

  const deleteHabit = useCallback(async (id: string) => {
    const supabase = createClient();
    await supabase.from("habits").delete().eq("id", id);
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }, []);

  const value = useMemo(
    () => ({ habits, loading, toggleHabit, addHabit, updateHabit, deleteHabit }),
    [habits, loading, toggleHabit, addHabit, updateHabit, deleteHabit]
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitsProvider");
  }
  return context;
}
