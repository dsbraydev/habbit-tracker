"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { dummyHabits } from "./dummy-habits";

export type Habit = (typeof dummyHabits)[number] & { completed: boolean };

export type HabitInput = Omit<Habit, "id" | "completed">;

type HabitsContextValue = {
  habits: Habit[];
  toggleHabit: (id: string) => void;
  addHabit: (input: HabitInput) => string;
  updateHabit: (id: string, input: HabitInput) => void;
  deleteHabit: (id: string) => void;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

const initialHabits: Habit[] = dummyHabits.map((habit, index) => ({
  ...habit,
  completed: index < 3,
}));

export function HabitsProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  const toggleHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  }, []);

  const addHabit = useCallback((input: HabitInput) => {
    const id = `${input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    setHabits((prev) => [...prev, { ...input, id, completed: false }]);
    return id;
  }, []);

  const updateHabit = useCallback((id: string, input: HabitInput) => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, ...input } : habit))
    );
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }, []);

  const value = useMemo(
    () => ({ habits, toggleHabit, addHabit, updateHabit, deleteHabit }),
    [habits, toggleHabit, addHabit, updateHabit, deleteHabit]
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
