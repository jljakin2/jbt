import { Globe, Smile } from "lucide-react";

import { Github, LinkedIn, X, Hashnode, Medium, Devto } from "./brand-icons";
import { Separator } from "./ui/separator";

export default function ProfessionalSocialConnections() {
  return (
    <div className="hidden md:block rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-2">
        <Smile className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Say Hi 👋</h2>
      </div>
      <Separator className="mb-4" />
      <div className="space-y-3">
        <SocialLink
          icon={<Github className="!w-4 !h-4 " />}
          name="GitHub"
          url="https://github.com/jljakin2"
        />
        <SocialLink
          icon={<X className="!w-4 !h-4 " />}
          name="Elon's Thing"
          url="https://twitter.com/jeffbuildstech"
        />
        <SocialLink
          icon={<LinkedIn className="!w-4 !h-4 " />}
          name="LinkedIn"
          url="https://www.linkedin.com/in/jeff-jakinovich/"
        />
        <SocialLink
          icon={<Devto className="!w-4 !h-4 " />}
          name="Dev.to"
          url="https://dev.to/jeffbuildstech"
        />
        <SocialLink
          icon={<Hashnode className="!w-4 !h-4 " />}
          name="Hashnode"
          url="https://hashnode.com/@jeffbuildstech"
        />
        <SocialLink
          icon={<Medium className="!w-4 !h-4 " />}
          name="Medium"
          url="https://medium.com/@jeff.jakinovich"
        />
      </div>
    </div>
  );
}

function SocialLink({
  icon,
  name,
  url,
}: {
  icon: React.ReactNode;
  name: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
    >
      <div>{icon}</div>

      <span className="font-medium">{name}</span>
    </a>
  );
}
