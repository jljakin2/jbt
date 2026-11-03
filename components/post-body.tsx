import type { PortableTextBlock } from "@portabletext/types";
import { codeToHtml } from "shiki";
import PostBodyView from "./post-body-view";

type CodeBlock = PortableTextBlock & { _type: "code"; code?: string; language?: string };

// Same theme the MDX pipeline used (rehype-pretty-code, one-dark-pro). The pre's own background is dropped so the prose styles own it.
async function highlight(code: string, lang: string) {
  const opts = { theme: "one-dark-pro", transformers: [{ pre(node: any) { delete node.properties.style; node.properties.tabindex = "0"; } }] };
  try {
    return await codeToHtml(code, { lang, ...opts });
  } catch {
    return codeToHtml(code, { lang: "text", ...opts });
  }
}

/** Server half: syntax-highlights every code block, then hands the body to the client renderer. */
export default async function PostBody({ value }: { value: PortableTextBlock[] }) {
  const codeBlocks = value.filter((b): b is CodeBlock => b._type === "code");
  const pairs = await Promise.all(codeBlocks.map(async (b) => [b._key, await highlight(b.code ?? "", b.language || "text")] as const));
  return <PostBodyView value={value} codeHtml={Object.fromEntries(pairs)} />;
}
