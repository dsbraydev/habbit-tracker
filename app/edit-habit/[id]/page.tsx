"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { HabitForm, HABIT_FORM_ID } from "@/components/habit-form";
import { useHabits, type HabitInput } from "@/lib/habits-context";
import { cn } from "@/lib/cn";

type EditHabitPageProps = {
  params: Promise<{ id: string }>;
};

export default function EditHabitPage({ params }: EditHabitPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { habits, updateHabit, deleteHabit } = useHabits();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const habit = habits.find((item) => item.id === id);

  async function handleSubmit(input: HabitInput) {
    await updateHabit(id, input);
    router.push("/home");
  }

  async function handleDeleteClick() {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    await deleteHabit(id);
    router.push("/home");
  }

  if (!habit) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
        <p className="text-text-secondary">Habit not found.</p>
        <Link href="/home" className="text-sm font-medium text-accent-via">
          Back to Home
        </Link>
      </div>
    );
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
          Edit Habit
        </h1>
        <button
          type="submit"
          form={HABIT_FORM_ID}
          className="w-10 text-right text-sm font-medium text-accent-via"
        >
          Save
        </button>
      </div>

      <HabitForm
        initialValues={{
          name: habit.name,
          subtitle: habit.subtitle,
          iconId: habit.iconId,
          colorId: habit.colorId,
          days: habit.days,
        }}
        onSubmit={handleSubmit}
      />

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleDeleteClick}
          className={cn(
            "rounded-full border-2 px-6 py-3 text-sm font-medium transition-colors",
            confirmingDelete
              ? "border-transparent bg-danger text-text-primary"
              : "border-danger/40 text-danger"
          )}
        >
          {confirmingDelete ? "Tap again to confirm delete" : "Delete Habit"}
        </button>
        {confirmingDelete && (
          <button
            type="button"
            onClick={() => setConfirmingDelete(false)}
            className="text-sm font-medium text-text-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
