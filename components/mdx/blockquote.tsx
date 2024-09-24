import React from "react";

interface BlockQuoteProps {
  children: React.ReactNode;
  className?: string;
}

const BlockQuote: React.FC<BlockQuoteProps> = ({
  children,
  className = "",
}) => {
  return (
    <blockquote
      className={`my-6 pl-4 border-l-4 border-primary text-muted-foreground italic ${className}`}
    >
      {children}
    </blockquote>
  );
};

export default BlockQuote;
