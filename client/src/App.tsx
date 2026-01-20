import { useEffect, useState } from "react";

type TimeLeft = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const targetMs = target.getTime();
  const diff = Math.max(0, targetMs - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { totalMs: diff, days, hours, minutes, seconds };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function App() {
  // April 15, 2026 at 00:00:00 PST Time
  const targetDate = new Date("2026-04-15T00:00:00-07:00");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(id);
  }, [targetDate]);

  const done = timeLeft.totalMs === 0;

  return (
    <div
      style={{
      minHeight: "100vh",
      minWidth: "100vw",
      display: "grid",
      placeItems: "center",
      fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      padding: "12px", // smaller padding on mobile
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520, // desktop cap
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: "20px 16px", // tighter horizontal padding
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          Countdown to "Bye bye 22 yr old 👋" 
        </h1>
        <h1>April 15, 2026</h1>
        <p style={{ marginTop: 8, marginBottom: 20, color: "#4b5563" }}>
          Target: {targetDate.toLocaleString()}
        </p>

        {done ? (
          <div style={{ fontSize: 28, fontWeight: 700 }}>🎉 It’s April 15, 2026!</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}
          >
            <TimeBox label="Days" value={String(timeLeft.days)} />
            <TimeBox label="Hours" value={pad2(timeLeft.hours)} />
            <TimeBox label="Minutes" value={pad2(timeLeft.minutes)} />
            <TimeBox label="Seconds" value={pad2(timeLeft.seconds)} />
          </div>
        )}
      </div>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: 16,
        textAlign: "center",
        background: "#",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: "#6b7280" }}>{label}</div>
    </div>
  );
}

