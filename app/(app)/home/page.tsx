"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Check,
  Cookie,
  Droplet,
  Dumbbell,
  Flower2,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/cn";

const initialHabits = [
  {
    id: "workout",
    name: "Morning Workout",
    subtitle: "30 min",
    icon: Dumbbell,
    badgeClass: "bg-accent-from/15 text-accent-from",
    completed: true,
  },
  {
    id: "water",
    name: "Drink Water",
    subtitle: "8 glasses",
    icon: Droplet,
    badgeClass: "bg-accent-via/15 text-accent-via",
    completed: true,
  },
  {
    id: "meditate",
    name: "Meditate",
    subtitle: "10 min",
    icon: Flower2,
    badgeClass: "bg-accent-to/15 text-accent-to",
    completed: true,
  },
  {
    id: "read",
    name: "Read a Book",
    subtitle: "20 min",
    icon: BookOpen,
    badgeClass: "bg-success/15 text-success",
    completed: false,
  },
  {
    id: "no-sugar",
    name: "No Sugar",
    subtitle: "All day",
    icon: Cookie,
    badgeClass: "bg-streak/15 text-streak",
    completed: false,
  },
];

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
          {habits.map(({ id, name, subtitle, icon: Icon, badgeClass, completed }) => (
            <div
              key={id}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface/80 p-4"
            >
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  badgeClass
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-primary">{name}</p>
                <p className="text-sm text-text-secondary">{subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleHabit(id)}
                aria-pressed={completed}
                aria-label={`Mark ${name} as ${completed ? "not done" : "done"}`}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  completed
                    ? "border-accent-via bg-accent-via text-text-primary"
                    : "border-border text-transparent"
                )}
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
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
