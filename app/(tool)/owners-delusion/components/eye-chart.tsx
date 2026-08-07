// A Snellen-style eye chart whose rows spell the tool's whole thesis — and the
// punchline sits in the smallest, hardest-to-read row, exactly like the insight
// most owners can't see.
const ROWS: { text: string; cls: string }[] = [
  { text: "E", cls: "text-5xl sm:text-6xl tracking-[0.3em]" },
  { text: "SEE", cls: "text-3xl sm:text-4xl tracking-[0.35em]" },
  { text: "IT LIKE", cls: "text-xl sm:text-2xl tracking-[0.4em]" },
  { text: "THEY ACTUALLY", cls: "text-sm sm:text-base tracking-[0.45em]" },
  { text: "D O   —   N O T   L I K E   Y O U   D O", cls: "text-[10px] sm:text-xs tracking-[0.35em]" },
];

export default function EyeChart() {
  return (
    <div
      aria-hidden
      className="flex select-none flex-col items-center gap-3 font-mono font-bold text-[#18181b]"
    >
      {ROWS.map((row) => (
        <div key={row.text} className={row.cls}>
          {row.text}
        </div>
      ))}
    </div>
  );
}
