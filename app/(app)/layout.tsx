import type { ReactNode } from "react";
import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg">
      <main className="relative flex-1 overflow-y-auto overscroll-contain pb-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
