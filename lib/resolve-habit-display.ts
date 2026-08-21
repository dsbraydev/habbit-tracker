import { iconOptions } from "@/components/icon-picker";
import { colorOptions } from "@/components/color-picker";

export function resolveHabitIcon(iconId: string) {
  return iconOptions.find((option) => option.id === iconId)?.icon ?? iconOptions[0].icon;
}

export function resolveHabitBadgeClass(colorId: string) {
  return (
    colorOptions.find((option) => option.id === colorId)?.badgeClass ??
    colorOptions[0].badgeClass
  );
}
