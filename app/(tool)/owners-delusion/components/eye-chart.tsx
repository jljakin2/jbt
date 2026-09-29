// Snellen-style eye chart; the punchline sits in the smallest row.
const ROWS: { text: string; cls: string }[] = [
  { text: "E", cls: "text-5xl sm:text-6xl tracking-[0.3em]" },
  { text: "SEE", cls: "text-3xl sm:text-4xl tracking-[0.35em]" },
  { text: "IT LIKE", cls: "text-xl sm:text-2xl tracking-[0.4em]" },
  { text: "THEY ACTUALLY", cls: "text-sm sm:text-base tracking-[0.45em]" },
  { text: "DO, NOT LIKE YOU DO", cls: "text-[10px] sm:text-xs tracking-[0.5em]" },
];

export default function EyeChart() {
  return (
    <div
      aria-hidden
      className="flex select-none flex-col items-center gap-3 font-courier font-bold text-gray-900"
    >
      {ROWS.map((row) => (
        <div key={row.text} className={row.cls}>
          {row.text}
        </div>
      ))}
    </div>
  );
}
