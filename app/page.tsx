"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Dumbbell, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";
import backgroundImage from "@/assets/images/purple-main-background.png";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Placeholder — real auth wiring comes with the future Supabase integration.
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-bg">
      <div className="absolute inset-x-0 top-0">
        <Image
          src={backgroundImage}
          alt=""
          priority
          sizes="125vw"
          className="relative left-1/2 h-auto w-[150%] max-w-none -translate-x-1/2"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-6 pt-[max(4rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent-via/60 bg-surface/60 shadow-lg shadow-accent-via/50">
            <Dumbbell className="h-8 w-8 text-text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-[0.3em] text-text-primary">
              HABITUS
            </h1>
            <p className="text-sm text-text-secondary">
              Better habits. Better you.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-4">
          <input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            required
            className="h-14 rounded-2xl border border-border bg-surface/80 px-4 text-text-primary placeholder:text-text-secondary outline-none focus:border-accent-via"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              required
              className="h-14 w-full rounded-2xl border border-border bg-surface/80 px-4 pr-12 text-text-primary placeholder:text-text-secondary outline-none focus:border-accent-via"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            type="button"
            className="self-end text-sm font-medium text-accent-via"
          >
            Forgot password?
          </button>

          <button
            type="submit"
            className={cn(
              "mt-2 h-14 rounded-full bg-gradient-to-r from-accent-from via-accent-via to-accent-to",
              "text-base font-semibold text-text-primary shadow-lg shadow-accent-via/40",
              "transition-opacity active:opacity-90"
            )}
          >
            Log In
          </button>

          <p className="text-center text-sm text-text-secondary">
            Don&apos;t have an account?{" "}
            <span
              aria-disabled="true"
              className="cursor-not-allowed font-medium text-text-secondary/50"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
