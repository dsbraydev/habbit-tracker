import { dummyHabits } from "./dummy-habits";

const DAYS = 90;

function daysAgo(n: number) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - n);
  return date;
}

// Deterministic (not Math.random()) so output is reproducible across builds:
// a mild upward trend (fewer completions long ago, more recently) plus a
// two-frequency wobble for day-to-day variety. Centered away from both the 0
// and max-habits ceilings (rather than hugging the max for recent days) so
// "partial" is actually well represented in the visible week/month, not just
// clamped up to "full" — the original single-sine version had a ~7-day period
// that lined up with the week strip and produced long all-full runs.
function completedCountForDay(daysBack: number) {
  const trend = daysBack / DAYS; // 1 = 90 days ago, 0 = today
  const total = dummyHabits.length;
  const center = total * 0.44 + (1 - trend) * total * 0.18;
  const wave =
    Math.sin(daysBack * 0.52) * (total * 0.34) +
    Math.sin(daysBack * 1.17 + 1) * (total * 0.24);
  return Math.max(0, Math.min(total, Math.round(center + wave)));
}

// Rotates which specific habits count as "done" each day (instead of always
// the same leading N), so filtering to one habit still shows real variety.
export const dummyHistory = Array.from({ length: DAYS }, (_, daysBack) => {
  const count = completedCountForDay(daysBack);
  const offset = daysBack % dummyHabits.length;

  return {
    date: daysAgo(daysBack),
    habits: dummyHabits.map((habit, index) => ({
      ...habit,
      completed: (index + offset) % dummyHabits.length < count,
    })),
  };
});
