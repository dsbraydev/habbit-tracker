"use client";

import { useId, useMemo } from "react";

const WIDTH = 320;
const HEIGHT = 140;
const PADDING_X = 8;
const PADDING_Y = 16;

type ProgressChartProps = {
  /** Chronological (oldest first), value is 0-100. */
  data: { date: Date; value: number }[];
  cssVar: string;
};

export function ProgressChart({ data, cssVar }: ProgressChartProps) {
  const gradientId = useId();
  const color = `var(${cssVar})`;
  const innerWidth = WIDTH - PADDING_X * 2;
  const innerHeight = HEIGHT - PADDING_Y * 2;

  const points = useMemo(
    () =>
      data.map((point, index) => ({
        x: PADDING_X + (index / (data.length - 1)) * innerWidth,
        y: PADDING_Y + innerHeight - (point.value / 100) * innerHeight,
        value: point.value,
      })),
    [data, innerWidth, innerHeight]
  );

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(" ");

  const baseline = HEIGHT - PADDING_Y;
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${baseline} L ${points[0].x.toFixed(2)} ${baseline} Z`;

  const last = points[points.length - 1];

  return (
    <div className="flex flex-col gap-2">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label={`Progress over time, currently ${Math.round(last.value)}%`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.18} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((fraction) => (
          <line
            key={fraction}
            x1={PADDING_X}
            x2={WIDTH - PADDING_X}
            y1={PADDING_Y + innerHeight * fraction}
            y2={PADDING_Y + innerHeight * fraction}
            stroke="var(--color-border)"
            strokeWidth={1}
          />
        ))}

        <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx={last.x} cy={last.y} r={5} fill={color} stroke="var(--color-bg)" strokeWidth={2} />
      </svg>
      <p className="text-right text-sm font-medium text-text-primary">
        {Math.round(last.value)}% today
      </p>
    </div>
  );
}
