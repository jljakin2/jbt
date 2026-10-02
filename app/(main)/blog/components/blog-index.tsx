"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PostDate from "@/components/post-date";
import BlogMark from "@/components/blog-mark";
import { CATEGORIES } from "../lib/categories";
import CategoryTag from "./category-tag";

export type Essay = {
  slug: string;
  metadata: { title: string; publishedAt: string; summary?: string; image?: string; tag?: string };
};

/** Rows shown per category before "Show more". */
const CAP = 10;

/** Featured + New header, then every post grouped by category. */
export default function BlogIndex({ essays }: { essays: Essay[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  return (
    <>
      <FeaturedPlusNew essays={essays} />
      <Grouped essays={essays} expanded={expanded} onToggle={(tag) => setExpanded({ ...expanded, [tag]: !expanded[tag] })} />
    </>
  );
}

/* ---------- shared ---------- */

/** The site's existing list arrow, reused so the index stays in the family. */
function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} xmlns="http://www.w3.org/2000/svg" width="14" height="12" aria-hidden>
      <path d="M9.586 5 6.293 1.707 7.707.293 13.414 6l-5.707 5.707-1.414-1.414L9.586 7H0V5h9.586Z" />
    </svg>
  );
}

function Thumb({ e, sizes, className = "" }: { e: Essay; sizes: string; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-lg bg-muted shadow-[inset_0_0_0_1px_rgb(0_0_0/0.06)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] ${className}`}>
      {e.metadata.image && (
        <Image src={e.metadata.image} alt="" fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
      )}
    </div>
  );
}

/* ---------- header ---------- */

function BlogTitle() {
  // Badge is sized in em inside the heading so it equals the heading's height at every breakpoint.
  return (
    <h1 className="h1 font-aspekta mb-8 flex items-center gap-[0.35em] !leading-none">
      <BlogMark className="h-[1em] w-[1em]" />
      Blog
    </h1>
  );
}

function FeaturedPlusNew({ essays }: { essays: Essay[] }) {
  const [first, ...rest] = essays;
  const news = rest.slice(0, 3);
  return (
    <header className="mb-12">
      <BlogTitle />
      {first && (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 sm:grid-cols-[1.35fr_1fr]">
          <Link href={`/blog/${first.slug}`} className="group block min-w-0">
            <Thumb e={first} sizes="400px" className="aspect-[16/10] w-full" />
            <p className="mt-4 flex items-center gap-1.5 text-xs uppercase text-muted-foreground">
              <CategoryTag tag={first.metadata.tag} /> · <PostDate dateString={first.metadata.publishedAt} />
            </p>
            <h2 className="mt-1 font-aspekta text-2xl font-[650] leading-snug text-foreground group-hover:text-primary transition-colors [text-wrap:balance]">
              {first.metadata.title}
            </h2>
          </Link>

          {news.length > 0 && (
            <div className="min-w-0 sm:border-l sm:border-border sm:pl-8">
              {/* Eyebrow on mobile so it can't be mistaken for a group label; heading on desktop. */}
              <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground sm:mb-4 sm:font-aspekta sm:text-lg sm:normal-case sm:tracking-normal sm:font-[650] sm:text-foreground">
                New
              </p>
              <ul className="divide-y divide-border">
                {news.map((e) => (
                  <li key={e.slug} className="py-4 first:pt-0">
                    <Link href={`/blog/${e.slug}`} className="group flex items-center gap-4">
                      <Thumb e={e} sizes="80px" className="h-14 w-20 sm:hidden" />
                      <span className="min-w-0">
                        <CategoryTag tag={e.metadata.tag} className="mb-0.5" />
                        <span className="mt-0.5 block font-medium leading-snug text-foreground group-hover:text-primary transition-colors [text-wrap:pretty]">
                          {e.metadata.title}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

/* ---------- grouped index ---------- */

function Row({ e }: { e: Essay }) {
  return (
    <li>
      <Link href={`/blog/${e.slug}`} className="group flex items-start gap-4">
        <span className="min-w-0 grow">
          <span className="block font-medium leading-snug text-foreground group-hover:text-primary transition-colors [text-wrap:pretty]">{e.metadata.title}</span>
          <span className="mt-0.5 block text-sm text-muted-foreground tabular-nums"><PostDate dateString={e.metadata.publishedAt} /></span>
        </span>
        {/* Optically centered on the title's first line: (line-height − glyph height) / 2 ≈ 5px. */}
        <Arrow className="mt-[5px] hidden shrink-0 text-sky-500 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none sm:block" />
      </Link>
    </li>
  );
}

function Grouped({ essays, expanded, onToggle }: { essays: Essay[]; expanded: Record<string, boolean>; onToggle: (tag: string) => void }) {
  return (
    <div className="sm:border-t sm:border-border">
      {CATEGORIES.map((c) => {
        const all = essays.filter((e) => e.metadata.tag === c.tag);
        const open = expanded[c.tag];
        const items = open ? all : all.slice(0, CAP);
        const hidden = all.length - items.length;
        return (
          <section key={c.tag} id={c.tag} className="grid gap-3 border-b border-border py-7 scroll-mt-24 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-8 sm:py-9">
            <h2 className="sm:sticky sm:top-24 sm:self-start"><CategoryTag tag={c.tag} variant="header" /></h2>
            {all.length === 0 ? (
              <p className="pt-[2px] text-sm text-muted-foreground">First one coming.</p>
            ) : (
              <div>
                <ul className="space-y-5">{items.map((e) => <Row key={e.slug} e={e} />)}</ul>
                {(hidden > 0 || open) && (
                  <button type="button" onClick={() => onToggle(c.tag)} aria-expanded={!!open}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                    {open ? <>Show fewer <span className="inline-block rotate-180">↓</span></> : <>Show {hidden} more <span>↓</span></>}
                  </button>
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
