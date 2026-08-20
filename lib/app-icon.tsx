export function AppIconMark({ size }: { size: number }) {
  const weightWidth = size * 0.14;
  const weightHeight = size * 0.34;
  const barWidth = size * 0.34;
  const barHeight = size * 0.08;
  const gap = size * 0.03;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap }}>
        <div
          style={{
            width: weightWidth,
            height: weightHeight,
            borderRadius: weightWidth / 3,
            background: "#f5f5f7",
          }}
        />
        <div
          style={{
            width: barWidth,
            height: barHeight,
            borderRadius: barHeight / 2,
            background: "#f5f5f7",
          }}
        />
        <div
          style={{
            width: weightWidth,
            height: weightHeight,
            borderRadius: weightWidth / 3,
            background: "#f5f5f7",
          }}
        />
      </div>
    </div>
  );
}
