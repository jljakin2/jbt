import { Separator } from "@/components/ui/separator";
import {
  Github,
  LinkedIn,
  X,
  Hashnode,
  Medium,
  Facebook,
  Devto,
} from "../brand-icons";
export default function Footer() {
  return (
    <footer className="container mx-auto py-8">
      <Separator className="mb-8" />
      <div className="flex flex-col items-center space-y-6">
        <ul className="flex items-center gap-8">
          <li>
            <a
              href="https://twitter.com/jeffbuildstech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <X />
              <span className="sr-only">Twitter</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jeff-jakinovich/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
              <span className="sr-only">LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jljakin2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              <span className="sr-only">GitHub</span>
            </a>
          </li>
          <li>
            <a
              href="https://dev.to/jeffbuildstech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Devto />
              <span className="sr-only">Dev.to</span>
            </a>
          </li>
          <li>
            <a
              href="https://hashnode.com/@jeffbuildstech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Hashnode />
              <span className="sr-only">Hashnode</span>
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@jeff.jakinovich"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Medium />
              <span className="sr-only">Medium</span>
            </a>
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jeff Jakinovich. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
