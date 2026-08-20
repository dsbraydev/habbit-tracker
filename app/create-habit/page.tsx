"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { HabitForm, HABIT_FORM_ID } from "@/components/habit-form";
import { useHabits, type HabitInput } from "@/lib/habits-context";

export default function CreateHabitPage() {
  const router = useRouter();
  const { addHabit } = useHabits();

  async function handleSubmit(input: HabitInput) {
    await addHabit(input);
    router.push("/home");
  }

  return (
    <div className="flex min-h-dvh flex-col gap-6 bg-bg px-6 pb-8 pt-[max(2rem,env(safe-area-inset-top))]">
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
        <button
          type="submit"
          form={HABIT_FORM_ID}
          className="w-10 text-right text-sm font-medium text-accent-via"
        >
          Save
        </button>
      </div>

      <HabitForm onSubmit={handleSubmit} />
    </div>
  );
}
