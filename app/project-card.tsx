import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, Zap } from "lucide-react";

interface Item {
  id: number;
  icon: any;
  slug: string;
  title: string;
  excerpt: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface ItemProps {
  item: Item;
}

export default function ProjectCard({ item }: ItemProps) {
  return (
    <a
      className="rounded-lg border border-border hover:border-muted-foreground transition-color ease-in-out p-5 group"
      href={item.slug}
    >
      <div className="flex flex-col h-full">
        <div className="grow">
          <div className="flex items-center justify-between space-x-2 mb-2">
            <div className="h-10 w-10 flex items-center justify-center border border-border rounded-full ">
              {item.icon}
            </div>
            <div className="flex items-center space-x-2">
              {item.isNew && (
                <Badge className="bg-gradient-to-r border-none from-teal-400 to-teal-500 text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  New
                </Badge>
              )}
              {item.isPopular && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 border-none text-white">
                  <Flame className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
          </div>
          <div className="text-lg font-aspekta font-[650] mb-1">
            {item.title}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{item.excerpt}</p>
        </div>
        <div className="text-primary flex justify-end">
          <svg
            className="fill-current -rotate-45 group-hover:rotate-0 transition-transform ease-out"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
          >
            <path d="M9.586 5 6.293 1.707 7.707.293 13.414 6l-5.707 5.707-1.414-1.414L9.586 7H0V5h9.586Z" />
          </svg>
        </div>
      </div>
    </a>
  );
}
