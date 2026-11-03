"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/client";
import { transformToSlug } from "./mdx/mdx";
import PostLink from "./mdx/link";
import BlockQuote from "./mdx/blockquote";
import InlineCode from "./mdx/inline-code";
import PullQuote from "./mdx/pull-quote";
import Callout from "./mdx/callout";
import Mark from "./mdx/mark";
import ModalImage from "./mdx/modal-image";

/** Anchored heading, same id scheme the MDX posts used so old #links keep working. */
function heading(level: 2 | 3 | 4) {
  const Tag = `h${level}` as const;
  return function Heading({ children }: { children?: React.ReactNode }) {
    const text = String(Array.isArray(children) ? children.join("") : children ?? "");
    const id = transformToSlug(text);
    return (
      <Tag id={id}>
        <a href={`#${id}`} className="anchor-link" />
        {children}
      </Tag>
    );
  };
}

type Figure = { asset?: { _id: string; metadata?: { dimensions?: { width: number; height: number } } }; alt?: string; caption?: string };
type Sidenote = { n: number; note: string };

function components(codeHtml: Record<string, string>): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => <p className="relative">{children}</p>,
      h2: heading(2),
      h3: heading(3),
      h4: heading(4),
      blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      code: ({ children }) => <InlineCode>{children}</InlineCode>,
      highlight: ({ children }) => <Mark>{children}</Mark>,
      link: ({ value, children }) => <PostLink href={value?.href ?? "#"}>{children}</PostLink>,
    },
    types: {
      figure: ({ value }: { value: Figure }) => {
        if (!value.asset) return null;
        const dims = value.asset.metadata?.dimensions;
        const width = Math.min(dims?.width ?? 1600, 1600);
        const height = dims ? Math.round((dims.height / dims.width) * width) : 1000;
        const src = urlFor(value).width(width).url();
        return (
          <figure className="not-prose my-8">
            <ModalImage src={src as any} alt={value.alt ?? ""} width={width} height={height} className="w-full rounded-md" />
            {value.caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground [text-wrap:pretty]">{value.caption}</figcaption>}
          </figure>
        );
      },
      code: ({ value }: { value: { _key: string; code?: string } }) => {
        const html = codeHtml[value._key];
        if (html) return <div dangerouslySetInnerHTML={{ __html: html }} />;
        return <pre><code>{value.code}</code></pre>;
      },
      pullQuote: ({ value }: { value: { text: string; by?: string } }) => <PullQuote by={value.by}>{value.text}</PullQuote>,
      callout: ({ value }: { value: { text: string } }) => <Callout>{value.text}</Callout>,
      divider: () => <hr />,
      // Inline. Margin note on desktop; a small muted aside inline on smaller screens.
      sidenote: ({ value }: { value: Sidenote }) => (
        <>
          <sup className="ml-0.5 font-mono text-xs text-primary tabular-nums">{value.n}</sup>
          <span role="note" className="not-prose ml-1 text-sm leading-snug text-muted-foreground lg:absolute lg:left-full lg:top-0 lg:ml-10 lg:w-[180px] lg:text-[13px]">
            <span className="mr-1 hidden font-mono text-xs text-primary tabular-nums lg:inline">{value.n}</span>
            {value.note}
          </span>
        </>
      ),
    },
    list: {
      bullet: ({ children }) => <ul>{children}</ul>,
      number: ({ children }) => <ol>{children}</ol>,
    },
    hardBreak: () => <br />,
  };
}

/** Client half: renders Portable Text with the site's post components. Code arrives pre-highlighted. */
export default function PostBodyView({ value, codeHtml }: { value: PortableTextBlock[]; codeHtml: Record<string, string> }) {
  return <PortableText value={value} components={components(codeHtml)} />;
}
