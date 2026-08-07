import { ArrowUpRight } from "lucide-react";

interface AttributionChipProps {
  source: { name: string; url: string };
  /** Label prefix, e.g. "Lens" -> "Lens by Erik Kennedy". */
  kind?: string;
}

/**
 * The signature credit element. Every idea in this tool is someone else's; the
 * chip sends traffic to them by default. Small, clinical, always present.
 */
export default function AttributionChip({
  source,
  kind = "Lens",
}: AttributionChipProps) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 rounded-full border border-[#d8d8d2] bg-white/70 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-[#57534e] transition-colors hover:border-[#2f9e6b] hover:text-[#1c7a52]"
    >
      <span className="text-[#a3a29c]">{kind} by</span>
      <span className="font-medium">{source.name}</span>
      <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
    </a>
  );
}
