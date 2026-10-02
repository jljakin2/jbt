/**
 * A numbered aside. In the right margin on desktop, small text under the paragraph on mobile.
 * Wrap the paragraph it belongs to:
 *   <Sidenote n="1" note="The wall tells you faster than the roadmap does.">
 *     The true benefit is the speed you can throw your product against reality…
 *   </Sidenote>
 */
export default function Sidenote({ n, note, children }: { n: number | string; note: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <aside className="not-prose -mt-3 mb-6 text-sm leading-snug text-muted-foreground lg:absolute lg:left-full lg:top-0 lg:mt-0 lg:mb-0 lg:ml-10 lg:w-[180px] lg:text-[13px]">
        <span className="mr-1 font-mono text-xs text-primary tabular-nums">{n}</span>
        {note}
      </aside>
    </div>
  );
}
