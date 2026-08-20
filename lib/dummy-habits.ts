import { BookOpen, Cookie, Droplet, Dumbbell, Flower2 } from "lucide-react";

export const dummyHabits = [
  {
    id: "workout",
    name: "Morning Workout",
    subtitle: "30 min",
    icon: Dumbbell,
    colorId: "accent-from",
    badgeClass: "bg-accent-from/15 text-accent-from",
  },
  {
    id: "water",
    name: "Drink Water",
    subtitle: "8 glasses",
    icon: Droplet,
    colorId: "accent-via",
    badgeClass: "bg-accent-via/15 text-accent-via",
  },
  {
    id: "meditate",
    name: "Meditate",
    subtitle: "10 min",
    icon: Flower2,
    colorId: "accent-to",
    badgeClass: "bg-accent-to/15 text-accent-to",
  },
  {
    id: "read",
    name: "Read a Book",
    subtitle: "20 min",
    icon: BookOpen,
    colorId: "success",
    badgeClass: "bg-success/15 text-success",
  },
  {
    id: "no-sugar",
    name: "No Sugar",
    subtitle: "All day",
    icon: Cookie,
    colorId: "streak",
    badgeClass: "bg-streak/15 text-streak",
  },
];
