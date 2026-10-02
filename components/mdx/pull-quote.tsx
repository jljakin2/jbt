/**
 * A line lifted from the post and set large, centered, with an optional attribution.
 * Usage in MDX:  <PullQuote by="Jeff, on scope">Just reduce your scope.</PullQuote>
 */
export default function PullQuote({ by, children }: { by?: string; children: React.ReactNode }) {
  return (
    <figure className="not-prose my-12 px-6 text-center">
      <blockquote className="text-[1.5em] italic leading-snug text-foreground [text-wrap:balance]">“{children}”</blockquote>
      {by && <figcaption className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">— {by}</figcaption>}
    </figure>
  );
}
