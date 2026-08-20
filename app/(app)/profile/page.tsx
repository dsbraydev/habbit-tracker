import Link from "next/link";
import { Bell, ChevronRight, LogOut, Settings, User } from "lucide-react";

const settingsRows = [
  { icon: User, label: "Account" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Preferences" },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 px-6 pt-[max(2rem,env(safe-area-inset-top))]">
      <header className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-accent-from via-accent-via to-accent-to text-2xl font-bold text-text-primary shadow-lg shadow-accent-via/50">
          B
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary">Bro</h1>
          <p className="text-sm text-text-secondary">bro@example.com</p>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        {settingsRows.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface/80 p-4"
          >
            <Icon className="h-5 w-5 text-text-secondary" />
            <span className="flex-1 font-medium text-text-primary">{label}</span>
            <ChevronRight className="h-5 w-5 text-text-secondary" />
          </div>
        ))}
      </section>

      <Link
        href="/"
        className="flex items-center justify-center gap-2 rounded-2xl border border-danger/40 p-4 text-sm font-medium text-danger"
      >
        <LogOut className="h-5 w-5" />
        Sign Out
      </Link>
    </div>
  );
}
