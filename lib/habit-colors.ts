export const habitColorThemes: Record<
  string,
  {
    cssVar: string;
    fullClass: string;
    partialClass: string;
    pillClass: string;
    ringClass: string;
    dotClass: string;
  }
> = {
  "accent-from": {
    cssVar: "--color-accent-from",
    fullClass:
      "border-transparent bg-accent-from text-text-primary shadow-lg shadow-accent-from/50",
    partialClass: "border-accent-from/40 bg-accent-from/10 text-accent-from",
    pillClass: "border-accent-from bg-accent-from/15 text-accent-from",
    ringClass: "ring-accent-from",
    dotClass: "bg-accent-from",
  },
  "accent-via": {
    cssVar: "--color-accent-via",
    fullClass:
      "border-transparent bg-accent-via text-text-primary shadow-lg shadow-accent-via/50",
    partialClass: "border-accent-via/40 bg-accent-via/10 text-accent-via",
    pillClass: "border-accent-via bg-accent-via/15 text-accent-via",
    ringClass: "ring-accent-via",
    dotClass: "bg-accent-via",
  },
  "accent-to": {
    cssVar: "--color-accent-to",
    fullClass:
      "border-transparent bg-accent-to text-text-primary shadow-lg shadow-accent-to/50",
    partialClass: "border-accent-to/40 bg-accent-to/10 text-accent-to",
    pillClass: "border-accent-to bg-accent-to/15 text-accent-to",
    ringClass: "ring-accent-to",
    dotClass: "bg-accent-to",
  },
  success: {
    cssVar: "--color-success",
    fullClass:
      "border-transparent bg-success text-text-primary shadow-lg shadow-success/50",
    partialClass: "border-success/40 bg-success/10 text-success",
    pillClass: "border-success bg-success/15 text-success",
    ringClass: "ring-success",
    dotClass: "bg-success",
  },
  streak: {
    cssVar: "--color-streak",
    fullClass:
      "border-transparent bg-streak text-text-primary shadow-lg shadow-streak/50",
    partialClass: "border-streak/40 bg-streak/10 text-streak",
    pillClass: "border-streak bg-streak/15 text-streak",
    ringClass: "ring-streak",
    dotClass: "bg-streak",
  },
};

export const defaultColorId = "accent-via";
