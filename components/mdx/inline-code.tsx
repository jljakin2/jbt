import React from "react";

interface InlineCodeProps {
  children: React.ReactNode;
}

const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code className="px-1 py-0.5 rounded-sm bg-muted text-foreground font-mono text-sm before:invisible after:invisible">
      {children}
    </code>
  );
};

export default InlineCode;
