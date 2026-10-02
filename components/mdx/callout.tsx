/**
 * The takeaway, in a quiet card. No fill, no icon.
 * Usage in MDX:  <Callout>Here's the luxury you get from clear opinions: focus.</Callout>
 */
export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-10 rounded-xl border border-border px-5 py-4">
      <p className="text-[17px] font-medium leading-snug text-foreground [text-wrap:pretty]">{children}</p>
    </aside>
  );
}
