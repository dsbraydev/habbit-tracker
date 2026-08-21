import { useId, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const fieldClass =
  "w-full rounded-card border border-border bg-surface/80 px-4 py-3 text-text-primary placeholder:text-text-secondary outline-none transition-all duration-150 focus:border-accent-via focus:shadow-lg focus:shadow-accent-via/40";

type TextFieldProps = {
  label: string;
  multiline?: boolean;
} & (
  | ({ multiline?: false } & ComponentPropsWithoutRef<"input">)
  | ({ multiline: true } & ComponentPropsWithoutRef<"textarea">)
);

export function TextField({ label, multiline, className, ...props }: TextFieldProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={3}
          className={cn(fieldClass, "resize-none", className)}
          {...(props as ComponentPropsWithoutRef<"textarea">)}
        />
      ) : (
        <input
          id={id}
          className={cn(fieldClass, "h-14", className)}
          {...(props as ComponentPropsWithoutRef<"input">)}
        />
      )}
    </div>
  );
}
