import { Separator } from "@/components/ui/separator";
import { Twitter, Github, Linkedin, FileCode2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="container mx-auto py-8">
      <Separator className="mb-8" />
      <div className="flex flex-col items-center space-y-6">
        <div className="flex space-x-4">
          <a href="#" className="group">
            <div className="w-10 h-10 rounded-full border border-muted-foreground/20 flex items-center justify-center group-hover:border-primary transition-colors duration-300">
              <Twitter
                size={20}
                className="text-muted-foreground group-hover:text-primary"
              />
            </div>
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" className="group">
            <div className="w-10 h-10 rounded-full border border-muted-foreground/20 flex items-center justify-center group-hover:border-primary transition-colors duration-300">
              <Github
                size={20}
                className="text-muted-foreground group-hover:text-primary"
              />
            </div>
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="group">
            <div className="w-10 h-10 rounded-full border border-muted-foreground/20 flex items-center justify-center group-hover:border-primary transition-colors duration-300">
              <Linkedin
                size={20}
                className="text-muted-foreground group-hover:text-primary"
              />
            </div>
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jeff Jakinovich. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
