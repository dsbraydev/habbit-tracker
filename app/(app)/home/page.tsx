"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { HabitRow } from "@/components/habit-row";
import { dummyHabits } from "@/lib/dummy-habits";

const initialHabits = dummyHabits.map((habit, index) => ({
  ...habit,
  completed: index < 3,
}));

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const [habits, setHabits] = useState(initialHabits);

  function toggleHabit(id: string) {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  }

  return (
    <div className="flex flex-col gap-6 px-6 pt-[max(2rem,env(safe-area-inset-top))]">
      <header>
        <h1 className="text-2xl font-bold text-text-primary">
          {getGreeting()}, Bro 👋
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Let&apos;s make today count.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-text-primary">
          Today&apos;s Habits
        </h2>
        <div className="flex flex-col gap-3">
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              name={habit.name}
              subtitle={habit.subtitle}
              icon={habit.icon}
              badgeClass={habit.badgeClass}
              completed={habit.completed}
              onToggle={() => toggleHabit(habit.id)}
            />
          ))}
        </div>
      </section>

      <Link
        href="/create-habit"
        aria-label="Create habit"
        className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-accent-from via-accent-via to-accent-to text-text-primary shadow-lg shadow-accent-via/50 transition-transform active:scale-95"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
  );
}
