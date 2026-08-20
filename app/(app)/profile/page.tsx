"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronRight, LogOut, Settings, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const settingsRows = [
  { icon: User, label: "Account" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Preferences" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        setLoading(false);
        return;
      }

      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      setDisplayName(profile?.display_name ?? "New User");
      setLoading(false);
    }

    load();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const initial = (displayName || email || "?").charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-6 px-6 pt-[max(2rem,env(safe-area-inset-top))]">
      <header className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-accent-from via-accent-via to-accent-to text-2xl font-bold text-text-primary shadow-lg shadow-accent-via/50">
          {initial}
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary">
            {loading ? "Loading..." : displayName}
          </h1>
          <p className="text-sm text-text-secondary">{email}</p>
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

      <button
        type="button"
        onClick={handleSignOut}
        className="flex items-center justify-center gap-2 rounded-2xl border border-danger/40 p-4 text-sm font-medium text-danger"
      >
        <LogOut className="h-5 w-5" />
        Sign Out
      </button>
    </div>
  );
}
