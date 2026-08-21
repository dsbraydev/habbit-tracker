"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { HabitForm, HABIT_FORM_ID } from "@/components/habit-form";
import { useHabits, type HabitInput } from "@/lib/habits-context";
import { cn } from "@/lib/cn";

export default function CreateHabitPage() {
  const router = useRouter();
  const { addHabit } = useHabits();

  async function handleSubmit(input: HabitInput) {
    await addHabit(input);
    router.push("/home");
  }

  return (
    <div className="flex min-h-dvh flex-col gap-6 bg-bg px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))]">
      <div className="flex items-center">
        <Link
          href="/home"
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary"
        >
          <X className="h-6 w-6" />
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-text-primary">
          Create Habit
        </h1>
        <div className="w-10" aria-hidden="true" />
      </div>

      <HabitForm onSubmit={handleSubmit} />

      <button
        type="submit"
        form={HABIT_FORM_ID}
        className={cn(
          "h-14 rounded-full bg-gradient-to-r from-accent-from via-accent-via to-accent-to",
          "text-base font-semibold text-text-primary shadow-lg shadow-accent-via/40",
          "transition-opacity active:opacity-90"
        )}
      >
        Save Habit
      </button>
    </div>
  );
}
