import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Eli Jaramillo, software engineer. Built and runs a real-time multiplayer game with 1,300+ players, solo.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const chips = [
    "1,300+ players",
    "86,000 lines of code",
    "3-tier distributed system",
    "5+ years live, solo",
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#07070a",
          backgroundImage:
            "radial-gradient(120% 80% at 50% -10%, rgba(212,175,55,0.18), transparent 55%), radial-gradient(80% 60% at 90% 120%, rgba(90,209,200,0.10), transparent 60%)",
          fontFamily: "sans-serif",
          color: "#f4f4f5",
          position: "relative",
        }}
      >
        {/* top hairline label */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 2, background: "#d4af37" }} />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#e8c874",
            }}
          >
            Software Engineer
          </div>
        </div>

        {/* main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
            Eli Jaramillo
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 40, lineHeight: 1.25, color: "#d4d4d8", maxWidth: 1000 }}>
            I built a real-time multiplayer game and run it for&nbsp;
            <span style={{ color: "#f4d98a", fontWeight: 600 }}>1,300+ players</span>.
            &nbsp;
            <span style={{ color: "#f4d98a", fontWeight: 600 }}>Built solo</span>.
          </div>
        </div>

        {/* scale chips */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {chips.map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 26,
                color: "#e8e8ea",
                padding: "14px 26px",
                borderRadius: 999,
                border: "1px solid rgba(212,175,55,0.35)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
