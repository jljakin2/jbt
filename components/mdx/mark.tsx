/**
 * Highlighter for the key sentence. Yellow on light, blue on dark.
 * The background is cloned per line box, so a sentence that wraps gets one clean stroke per line.
 * Usage in MDX:  But the other way is easier. <Mark>Just reduce your scope.</Mark> And guess what…
 */
export default function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-[3px] bg-[rgba(253,224,71,0.28)] px-[0.12em] text-foreground [box-decoration-break:clone] [-webkit-box-decoration-break:clone] dark:bg-[rgba(56,189,248,0.22)] dark:text-white">
      {children}
    </mark>
  );
}
