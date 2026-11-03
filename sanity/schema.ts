import { defineArrayMember, defineField, defineType } from "sanity";
import { CATEGORIES } from "../app/(main)/blog/lib/categories";

/**
 * A blog post. The body is Portable Text: standard blocks plus one object type per device the
 * site already renders (figure, code, pull quote, callout, divider, sidenote). Rendered by
 * components/post-body.tsx. Drafts stay private until Publish; the site reads only published docs.
 */
/** Languages offered in the code block's picker. Values are shiki language ids. */
const LANGS = [
  { title: "Plain text", value: "text" },
  { title: "JavaScript", value: "js" },
  { title: "TypeScript", value: "ts" },
  { title: "TSX", value: "tsx" },
  { title: "JSON", value: "json" },
  { title: "HTML", value: "html" },
  { title: "CSS", value: "css" },
  { title: "Shell", value: "bash" },
  { title: "Python", value: "python" },
  { title: "YAML", value: "yaml" },
  { title: "SQL", value: "sql" },
];

const body = defineField({
  name: "body",
  title: "Body",
  type: "array",
  validation: (r) => r.required(),
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Small heading", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullets", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
          { title: "Highlight", value: "highlight" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [defineField({ name: "href", title: "URL", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }) })],
          }),
        ],
      },
      of: [
        defineArrayMember({
          name: "sidenote",
          title: "Sidenote",
          type: "object",
          description: "A numbered aside in the margin. Place it right after the sentence it belongs to.",
          fields: [
            defineField({ name: "n", title: "Number", type: "number", validation: (r) => r.required().integer().positive() }),
            defineField({ name: "note", title: "Note", type: "text", rows: 2, validation: (r) => r.required() }),
          ],
          preview: { select: { n: "n", note: "note" }, prepare: ({ n, note }) => ({ title: `${n}. ${note}` }) },
        }),
      ],
    }),
    defineArrayMember({
      name: "figure",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string", description: "What's in the picture, for people who can't see it." }),
        defineField({ name: "caption", title: "Caption", type: "string", description: "Optional. One line on why it's here." }),
      ],
    }),
    defineArrayMember({ type: "code", options: { withFilename: false, languageAlternatives: LANGS } }),
    defineArrayMember({
      name: "pullQuote",
      title: "Pull quote",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Text", type: "text", rows: 2, validation: (r) => r.required() }),
        defineField({ name: "by", title: "Attribution", type: "string" }),
      ],
      preview: { select: { title: "text", subtitle: "by" } },
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      description: "The takeaway, in a quiet card.",
      fields: [defineField({ name: "text", title: "Text", type: "text", rows: 2, validation: (r) => r.required() })],
      preview: { select: { title: "text" }, prepare: ({ title }) => ({ title, subtitle: "Callout" }) },
    }),
    defineArrayMember({
      name: "divider",
      title: "Divider",
      type: "object",
      fields: [defineField({ name: "style", type: "string", hidden: true, initialValue: "rule" })],
      preview: { prepare: () => ({ title: "———" }) },
    }),
  ],
});

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [{ name: "seo", title: "SEO" }],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "The URL: /blog/<slug>. Don't change it after publishing.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tag",
      title: "Category",
      type: "string",
      description: "Unlisted posts stay reachable by URL but are not shown on the blog index.",
      options: { list: [...CATEGORIES.map((c) => ({ title: c.label, value: c.tag })), { title: "Unlisted", value: "unlisted" }], layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published on",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", title: "Summary", description: "One or two sentences. Shows in the index and in link previews.", type: "text", rows: 3 }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    body,
    defineField({ name: "ogImageUrl", title: "Social image URL", description: "Optional. Falls back to the cover image.", type: "url", group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", tag: "tag", publishedAt: "publishedAt", media: "cover" },
    prepare: ({ title, tag, publishedAt, media }) => ({
      title,
      subtitle: [CATEGORIES.find((c) => c.tag === tag)?.label, publishedAt].filter(Boolean).join(" · "),
      media,
    }),
  },
});

export const schemaTypes = [post];
