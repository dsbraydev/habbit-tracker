import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type HabitRowProps = {
  name: string;
  subtitle: string;
  icon: typeof Check;
  badgeClass: string;
  completed: boolean;
  onToggle?: () => void;
  href?: string;
};

export function HabitRow({
  name,
  subtitle,
  icon: Icon,
  badgeClass,
  completed,
  onToggle,
  href,
}: HabitRowProps) {
  const indicatorClass = cn(
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
    completed
      ? "border-accent-via bg-accent-via text-text-primary"
      : "border-border text-transparent"
  );

  const badge = (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
        badgeClass
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
  );

  const text = (
    <div className="flex-1">
      <p className="font-medium text-text-primary">{name}</p>
      <p className="text-sm text-text-secondary">{subtitle}</p>
    </div>
  );

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/80 p-4">
      {href ? (
        <Link href={href} className="flex flex-1 items-center gap-3">
          {badge}
          {text}
        </Link>
      ) : (
        <>
          {badge}
          {text}
        </>
      )}
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={completed}
          aria-label={`Mark ${name} as ${completed ? "not done" : "done"}`}
          className={indicatorClass}
        >
          <Check className="h-4 w-4" />
        </button>
      ) : (
        <div className={indicatorClass} aria-label={completed ? "Done" : "Not done"}>
          <Check className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
