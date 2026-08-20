"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Flame, History, Home, User } from "lucide-react";
import { cn } from "@/lib/cn";

const navItems = [
  {
    href: "/home",
    label: "Home",
    icon: Home,
    activeClass:
      "bg-gradient-to-b from-accent-via/25 to-accent-via/10 text-accent-via shadow-lg shadow-accent-via/50",
    iconGlowClass: "drop-shadow-[0_0_6px_var(--color-accent-via)]",
  },
  {
    href: "/history",
    label: "History",
    icon: History,
    activeClass:
      "bg-gradient-to-b from-accent-from/25 to-accent-from/10 text-accent-from shadow-lg shadow-accent-from/50",
    iconGlowClass: "drop-shadow-[0_0_6px_var(--color-accent-from)]",
  },
  {
    href: "/streaks",
    label: "Streaks",
    icon: Flame,
    activeClass:
      "bg-gradient-to-b from-streak/25 to-streak/10 text-streak shadow-lg shadow-streak/50",
    iconGlowClass: "drop-shadow-[0_0_6px_var(--color-streak)]",
  },
  {
    href: "/stats",
    label: "Stats",
    icon: BarChart3,
    activeClass:
      "bg-gradient-to-b from-success/25 to-success/10 text-success shadow-lg shadow-success/50",
    iconGlowClass: "drop-shadow-[0_0_6px_var(--color-success)]",
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
    activeClass:
      "bg-gradient-to-b from-accent-to/25 to-accent-to/10 text-accent-to shadow-lg shadow-accent-to/50",
    iconGlowClass: "drop-shadow-[0_0_6px_var(--color-accent-to)]",
  },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 bg-surface/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-via/40 to-transparent" />
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {navItems.map(({ href, label, icon: Icon, activeClass, iconGlowClass }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-16 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition-all duration-150 active:scale-95",
                active ? activeClass : "text-text-secondary"
              )}
            >
              <Icon className={cn("h-5 w-5", active && iconGlowClass)} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
