import Link from "next/link";

interface PostLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function PostLink({ href, children, ...props }: PostLinkProps) {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link
        href={href}
        {...props}
        className="font-semibold text-primary no-underline hover:underline transition-all duration-300"
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary no-underline hover:underline transition-all duration-300"
    >
      {children}
    </Link>
  );
}
