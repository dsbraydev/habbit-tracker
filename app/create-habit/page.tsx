"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { TextField } from "@/components/text-field";
import { IconPicker, iconOptions } from "@/components/icon-picker";
import { ColorPicker, colorOptions } from "@/components/color-picker";
import { DaySelector } from "@/components/day-selector";
import { cn } from "@/lib/cn";

export default function CreateHabitPage() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [icon, setIcon] = useState<string>(iconOptions[0].id);
  const [color, setColor] = useState<string>(colorOptions[0].id);
  const [days, setDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

  const SelectedIcon =
    iconOptions.find((option) => option.id === icon)?.icon ?? iconOptions[0].icon;
  const badgeClass =
    colorOptions.find((option) => option.id === color)?.badgeClass ??
    colorOptions[0].badgeClass;

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
          type="button"
          className="w-10 text-right text-sm font-medium text-accent-via"
        >
          Save
        </button>
      </div>

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
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <TextField
        label="Note"
        multiline
        placeholder="e.g. 3 litres of water, run 10 km"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-primary">Icon</span>
        <IconPicker value={icon} onChange={setIcon} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-primary">Color</span>
        <ColorPicker value={color} onChange={setColor} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text-primary">Days</span>
        <DaySelector value={days} onChange={setDays} />
      </div>
    </div>
  );
}
