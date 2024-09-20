"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../logo";

export default function Navigation() {
  const pathname = usePathname();

  const navigationMenu = [
    { label: "Essays", link: "/essays" },
    // { label: "Tutorials", link: "/tutorials" },
    { label: "Tools", link: "/tools" },
    { label: "Podcast", link: "https://brickbybrick.fm" },
  ];

  return (
    <nav className="flex items-center w-full">
      <ul className="flex items-center space-x-4">
        <li>
          <Link href="/">
            <span className="sr-only">Home</span>
            <Logo className="w-14 h-14" />
          </Link>
        </li>
        {navigationMenu.map((item) => (
          <li className="px-2" key={item.label}>
            <Link
              href={item.link}
              className={`${
                pathname === `${item.link}`
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-primary transition-colors"
              }`}
              target={item.label === "Podcast" ? "_blank" : "_self"}
            >
              <span className="sr-only">{item.label}</span>
              {item.label}
            </Link>
          </li>
        ))}
        {/* <li className="py-2">
          <Link
            href="/projects"
            className={`w-full h-6 flex items-center justify-center relative after:absolute after:w-0.5 after:right-0 after:top-0 after:bottom-0 ${
              pathname === "/projects"
                ? "text-sky-500 after:bg-sky-500"
                : "text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
            }`}
          >
            <span className="sr-only">Projects</span>
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
            >
              <path fillOpacity=".16" d="M1 4h18v10H1z" />
              <path d="M8 3h4V2H8v1ZM6 3V0h8v3h6v12H0V3h6ZM2 5v8h16V5H2Zm14 13v-2h2v4H2v-4h2v2h12Z" />
            </svg>
          </Link>
        </li>
        <li className="py-2">
          <Link
            href="/resume"
            className={`w-full h-6 flex items-center justify-center relative after:absolute after:w-0.5 after:right-0 after:top-0 after:bottom-0 ${
              pathname === "/resume"
                ? "text-sky-500 after:bg-sky-500"
                : "text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
            }`}
          >
            <span className="sr-only">Resume</span>
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="20"
            >
              <path fillOpacity=".16" fillRule="nonzero" d="M1 5h16v14H1z" />
              <path
                fillRule="nonzero"
                d="M2 6v12h14V6H2Zm16-2v16H0V4h18ZM2 2V0h14v2H2Z"
              />
            </svg>
          </Link>
        </li>
        <li className="py-2">
          <Link
            href="/subscribe"
            className={`w-full h-6 flex items-center justify-center relative after:absolute after:w-0.5 after:right-0 after:top-0 after:bottom-0 ${
              pathname === "/subscribe"
                ? "text-sky-500 after:bg-sky-500"
                : "text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
            }`}
          >
            <span className="sr-only">Subscribe</span>
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
            >
              <path fillOpacity=".16" d="m13.4 18-3-7.4-7.4-3L19 2z" />
              <path d="M13.331 15.169 17.37 3.63 5.831 7.669l5.337 2.163 2.163 5.337Zm-3.699-3.801L.17 7.53 20.63.37l-7.161 20.461-3.837-9.463Z" />
            </svg>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}
