"use client";

import { useState, type FormEvent } from "react";
import { TextField } from "@/components/text-field";
import { IconPicker, iconOptions } from "@/components/icon-picker";
import { ColorPicker, colorOptions } from "@/components/color-picker";
import { DaySelector } from "@/components/day-selector";
import { cn } from "@/lib/cn";
import type { HabitInput } from "@/lib/habits-context";

export const HABIT_FORM_ID = "habit-form";

type HabitFormValues = {
  name: string;
  subtitle: string;
  iconId: string;
  colorId: string;
  days: number[];
};

type HabitFormProps = {
  initialValues?: HabitFormValues;
  onSubmit: (input: HabitInput) => void;
};

const defaultValues: HabitFormValues = {
  name: "",
  subtitle: "",
  iconId: iconOptions[0].id,
  colorId: colorOptions[0].id,
  days: [0, 1, 2, 3, 4, 5, 6],
};

export function HabitForm({ initialValues, onSubmit }: HabitFormProps) {
  const [name, setName] = useState(initialValues?.name ?? defaultValues.name);
  const [subtitle, setSubtitle] = useState(
    initialValues?.subtitle ?? defaultValues.subtitle
  );
  const [iconId, setIconId] = useState(initialValues?.iconId ?? defaultValues.iconId);
  const [colorId, setColorId] = useState(
    initialValues?.colorId ?? defaultValues.colorId
  );
  const [days, setDays] = useState(initialValues?.days ?? defaultValues.days);

  const SelectedIcon =
    iconOptions.find((option) => option.id === iconId)?.icon ?? iconOptions[0].icon;
  const badgeClass =
    colorOptions.find((option) => option.id === colorId)?.badgeClass ??
    colorOptions[0].badgeClass;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const icon = iconOptions.find((option) => option.id === iconId)?.icon;
    if (!icon) return;

    onSubmit({ name, subtitle, icon, iconId, colorId, badgeClass, days });
  }

  return (
    <form id={HABIT_FORM_ID} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex justify-center">
        <div
          className={cn(
            "flex h-20 w-20 items-center justify-center rounded-2xl",
            badgeClass
          )}
        >
          <SelectedIcon className="h-8 w-8" />
        </div>
      </div>

      <TextField
        label="Title"
        placeholder="Morning Workout"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <TextField
        label="Note"
        multiline
        placeholder="e.g. 3 litres of water, run 10 km"
        value={subtitle}
        onChange={(event) => setSubtitle(event.target.value)}
      />

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-primary">Icon</span>
        <IconPicker value={iconId} onChange={setIconId} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-primary">Color</span>
        <ColorPicker value={colorId} onChange={setColorId} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-primary">Days</span>
        <DaySelector value={days} onChange={setDays} />
      </div>
    </form>
  );
}
