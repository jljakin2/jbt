import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// New component to avoid duplicating preview markup
export function PreviewContent({ markdown }: { markdown: string }) {
  return (
    <div
      className="rounded-md bg-white p-4 prose max-w-none
          [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-0 [&>h1]:mb-3
          [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-4 [&>h2]:mb-2
          [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mt-3 [&>h3]:mb-2
          [&>p]:my-2 [&>p]:leading-relaxed
          [&>ul]:my-2 [&>ul>li]:my-1 [&>ul]:ml-4
          [&>ol]:my-2 [&>ol>li]:my-1 [&>ol]:ml-4
          [&>blockquote]:pl-4 [&>blockquote]:border-l-4 [&>blockquote]:border-gray-200 [&>blockquote]:italic [&>blockquote]:my-2
          [&_mark]:bg-yellow-100 [&_mark]:px-1 [&_mark]:rounded-md [&_mark]:-rotate-2
          [&_strong]:font-bold
          [&_em]:italic"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            const text = String(children);
            const parts = text.split(/(==.*?==)/g);

            return (
              <p>
                {parts.map((part, i) => {
                  if (part.startsWith("==") && part.endsWith("==")) {
                    return <mark key={i}>{part.slice(2, -2)}</mark>;
                  }
                  return part;
                })}
              </p>
            );
          },
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
