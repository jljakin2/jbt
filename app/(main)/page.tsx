import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import WidgetNewsletter from "@/components/widget-newsletter";
import WidgetSponsor from "@/components/widget-sponsor";
import AboutImg from "@/public/images/jbt_hero.svg";
import Experience from "@/components/experience";
import WidgetConnect from "@/components/widget-connect";
import { Button } from "@/components/ui/button";
import { Github, LinkedIn, X } from "@/components/brand-icons";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Talks from "@/components/posts";
import FeaturedProjects from "@/components/featured-projects";
import { Metadata } from "next/types";
import ShineBorder from "@/components/ui/shine-border";
import Posts from "@/components/posts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jeffbuildstech.com/"),
  title: "Jeff Builds Tech - Dev and Marketer",
  alternates: {
    canonical: "./",
  },
  description:
    "Helpful content and tools for developers and entrepreneurs to accomplish more with less stress.",
  openGraph: {
    title: "Jeff Builds Tech - Dev and Marketer",
    description:
      "Helpful content and tools for developers and entrepreneurs to accomplish more with less stress.",
    type: "website",
    locale: "en_US",
    url: "https://www.jeffbuildstech.com/",
    siteName: "Jeff Builds Tech",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Home() {
  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-6 md:pt-16 pb-16 md:pb-20">
      {/* Middle area */}
      <div className="grow">
        <div className="max-w-[700px]">
          <section className="mb-8 flex flex-col justify-center items-center gap-4 p-2 md:p-8 relative border-b border-border">
            <Image
              className="w-full md:w-1/2 mb-8"
              src={AboutImg}
              width={600}
              height={450}
              alt="Jeff working on a project on his laptop"
            />
            <div className="flex flex-col gap-2 items-center text-center justify-center w-full">
              <h1 className="h1 font-aspekta mb-2">
                Hi, I'm{" "}
                <span className="inline-flex relative text-sky-500 before:absolute before:inset-0 before:bg-sky-200 dark:before:bg-sky-500 before:opacity-30 before:-z-10 -before:rotate-2 before:translate-y-1/5">
                  @jeffbuildstech
                </span>{" "}
                👋
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Full-stack dev | Digital marketer | Product person
              </p>
              <div className="flex items-center gap-2 mb-8">
                <Link
                  href="https://github.com/jljakin2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon" className="group">
                    <Github className="!h-4 !w-4 group-hover:fill-primary" />
                  </Button>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/jeff-jakinovich/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon" className="group">
                    <LinkedIn className="!h-4 !w-4 group-hover:fill-primary" />
                  </Button>
                </Link>
                <Link
                  href="https://twitter.com/jeffbuildstech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon" className="group">
                    <X className="!h-4 !w-4 group-hover:fill-primary" />
                  </Button>
                </Link>
              </div>
            </div>
            {/* Page title */}
          </section>
          {/* <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-5 shadow-md">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white w-[36px] h-[36px]"
            >
              <g clip-path="url(#clip0_1032_3590)">
                <path d="M22.64 6.31C21.8287 4.96163 20.8171 3.74439 19.64 2.7C18.0117 1.22739 15.9618 0.303866 13.78 0.0600042C11.6238 -0.119949 9.45819 0.269725 7.49999 1.19C5.82919 1.94913 4.35981 3.0897 3.20999 4.52C2.08284 5.93742 1.28369 7.58694 0.869988 9.35C0.859647 9.39271 0.857938 9.43704 0.864959 9.48041C0.871981 9.52378 0.887593 9.56532 0.910878 9.60257C0.934164 9.63983 0.964655 9.67206 1.00056 9.69738C1.03647 9.7227 1.07707 9.74059 1.11999 9.75C1.20331 9.76503 1.28921 9.74746 1.35994 9.70093C1.43067 9.6544 1.48081 9.58247 1.49999 9.5C1.92727 7.84345 2.72383 6.30505 3.82999 5C4.90769 3.69814 6.27844 2.67007 7.82999 2C9.66264 1.19973 11.67 0.882964 13.66 1.08C15.6254 1.33006 17.4639 2.18643 18.92 3.53C19.9932 4.5046 20.9195 5.62963 21.67 6.87C22.44 8.07382 22.9066 9.44635 23.03 10.87C23.1604 12.4576 22.9735 14.0554 22.48 15.57C21.9768 17.0717 21.0579 18.3998 19.83 19.4C19.0319 20.073 18.0969 20.5643 17.09 20.84C15.5473 21.2832 13.9545 21.5285 12.35 21.57C12.2722 21.5752 12.1994 21.6104 12.1472 21.6683C12.0949 21.7261 12.0672 21.8021 12.07 21.88C12.07 21.9189 12.0778 21.9575 12.093 21.9933C12.1082 22.0292 12.1304 22.0616 12.1584 22.0887C12.1864 22.1157 12.2196 22.1369 12.2559 22.1509C12.2923 22.1648 12.3311 22.1713 12.37 22.17C14.0328 22.1614 15.6884 21.9499 17.3 21.54C18.3928 21.2575 19.4146 20.75 20.3 20.05C21.6927 18.9847 22.754 17.5454 23.36 15.9C23.9354 14.2712 24.1835 12.5449 24.09 10.82C23.9824 9.22079 23.4845 7.67231 22.64 6.31Z" />
                <path d="M16.42 15.92C17.099 15.6262 17.6668 15.1237 18.0408 14.4853C18.4149 13.8469 18.5757 13.106 18.5 12.37C18.4716 12.2018 18.4006 12.0437 18.2938 11.9106C18.1871 11.7776 18.048 11.6741 17.89 11.61C17.4371 11.4872 16.963 11.4633 16.5 11.54C15.28 11.61 13.45 11.92 11.96 12.08C11.56 12.13 11.18 12.16 10.85 12.18C10.7811 12.1927 10.7188 12.2292 10.6739 12.2831C10.6291 12.337 10.6045 12.4049 10.6045 12.475C10.6045 12.5451 10.6291 12.613 10.6739 12.6669C10.7188 12.7207 10.7811 12.7572 10.85 12.77L16.51 12.59H17.34C17.3728 13.0929 17.2504 13.5937 16.9892 14.0247C16.7281 14.4558 16.3409 14.7962 15.88 15C15.4301 15.3065 14.9194 15.5125 14.3828 15.604C13.8461 15.6954 13.296 15.6702 12.77 15.53C12.3598 15.3573 11.9812 15.1173 11.65 14.82C11.3148 14.5425 11.0364 14.203 10.83 13.82C10.8116 13.7793 10.7854 13.7426 10.7528 13.712C10.7203 13.6814 10.682 13.6575 10.6402 13.6417C10.5984 13.6259 10.5539 13.6185 10.5093 13.62C10.4646 13.6214 10.4207 13.6316 10.38 13.65C10.3396 13.6673 10.3031 13.6926 10.2727 13.7242C10.2422 13.7558 10.2183 13.7932 10.2025 13.8342C10.1866 13.8752 10.1791 13.9189 10.1804 13.9629C10.1817 14.0068 10.1918 14.05 10.21 14.09C10.4211 14.5869 10.7307 15.0359 11.12 15.41C11.4985 15.7911 11.9337 16.1116 12.41 16.36C13.0691 16.5889 13.771 16.6682 14.4646 16.5921C15.1582 16.516 15.8262 16.2864 16.42 15.92Z" />
                <path d="M8.81998 11C9.0425 11.0613 9.27746 11.0613 9.49998 11C9.67651 10.9382 9.83495 10.8336 9.9611 10.6956C10.0872 10.5575 10.1771 10.3902 10.2227 10.2089C10.2683 10.0275 10.2682 9.83762 10.2223 9.6563C10.1765 9.47499 10.0863 9.30789 9.95998 9.17C8.95998 7.93 6.95998 9.99 8.21998 10.89C8.40688 10.9786 8.61379 11.0166 8.81998 11Z" />
                <path d="M19.65 10.36C19.8747 10.4001 20.106 10.3794 20.32 10.3C20.4983 10.2389 20.6586 10.1342 20.7861 9.99535C20.9136 9.8565 21.0044 9.68795 21.0501 9.50506C21.0958 9.32216 21.0951 9.13073 21.0479 8.94821C21.0007 8.76568 20.9086 8.59786 20.78 8.46003C19.78 7.23003 17.78 9.29003 19.04 10.19C19.2238 10.3017 19.4349 10.3605 19.65 10.36Z" />
                <path d="M10.12 20.11C10.0176 19.9059 9.86219 19.7332 9.66998 19.61C9.86627 19.2865 9.94073 18.9035 9.87998 18.53C9.83826 18.1765 9.7224 17.8357 9.53998 17.53C9.40501 17.3302 9.22741 17.1629 9.01998 17.04C9.0621 16.9448 9.08909 16.8436 9.09998 16.74C9.15323 16.4123 9.12648 16.0765 9.02201 15.7614C8.91754 15.4462 8.73844 15.161 8.49997 14.93C7.98569 14.5993 7.38058 14.4384 6.76997 14.47C6.02025 14.448 5.27519 14.595 4.58997 14.9C4.64979 14.0003 4.39918 13.1072 3.87997 12.37C2.97997 11.37 1.33997 12.24 1.16997 13.73C1.15265 14.3416 1.23024 14.9522 1.39997 15.54C1.67997 16.54 1.62997 16.49 1.87997 16.87C1.65996 17.1095 1.4748 17.3788 1.32997 17.67C1.22997 18.01 1.04997 18.41 1.20997 18.67C1.36997 18.93 1.50997 18.9 1.67997 18.73C1.84997 18.56 1.76997 18.29 1.81997 18.13C1.89426 17.8434 2.04254 17.5813 2.24997 17.37C2.40997 17.16 2.52997 17.15 2.71997 16.97C4.56997 15.2 7.33997 15 7.83997 15.69C8.68997 16.85 6.67997 16.98 4.93997 18.06C4.90173 18.071 4.86626 18.0899 4.83592 18.1157C4.80559 18.1414 4.78109 18.1733 4.76406 18.2093C4.74703 18.2453 4.73785 18.2844 4.73715 18.3242C4.73644 18.364 4.74423 18.4035 4.75997 18.44C4.77225 18.4774 4.792 18.5118 4.81802 18.5413C4.84404 18.5708 4.87579 18.5947 4.91134 18.6116C4.94689 18.6284 4.98549 18.6378 5.02479 18.6393C5.0641 18.6407 5.10328 18.6342 5.13997 18.62C5.54997 18.56 5.90998 18.56 6.25997 18.51C7.25997 18.34 7.50997 17.85 8.41997 18C8.57571 18.1269 8.68271 18.3038 8.72281 18.5007C8.76292 18.6976 8.73365 18.9023 8.63998 19.08C8.18004 19.3949 7.6641 19.619 7.11997 19.74C6.75062 19.9165 6.3932 20.1169 6.04997 20.34C6.01199 20.3503 5.97649 20.3682 5.94564 20.3926C5.91479 20.417 5.88924 20.4474 5.87053 20.4821C5.85182 20.5167 5.84035 20.5547 5.83681 20.5939C5.83328 20.6331 5.83776 20.6726 5.84997 20.71C5.86024 20.748 5.87813 20.7835 5.90255 20.8143C5.92697 20.8452 5.95742 20.8707 5.99203 20.8894C6.02664 20.9082 6.0647 20.9196 6.10389 20.9232C6.14308 20.9267 6.18257 20.9222 6.21997 20.91C6.581 20.9069 6.94157 20.8836 7.29997 20.84C7.45659 20.8188 7.61069 20.7819 7.75997 20.73C8.12404 20.5142 8.55583 20.4428 8.96997 20.53C9.00284 20.5362 9.03404 20.5492 9.0616 20.5681C9.08915 20.587 9.11244 20.6115 9.12997 20.64C9.1601 20.7172 9.1601 20.8028 9.12997 20.88C9.07721 21.1342 8.95621 21.3693 8.77997 21.56C8.57792 21.7892 8.3497 21.9939 8.09997 22.17C7.43128 22.6307 6.65763 22.916 5.84997 23C5.04927 23.1178 4.23159 22.996 3.49997 22.65C2.96602 22.3675 2.54316 21.9129 2.29997 21.36C2.02952 20.7744 1.87016 20.1437 1.82997 19.5C1.82872 19.4558 1.81858 19.4123 1.80016 19.372C1.78175 19.3318 1.75543 19.2957 1.72278 19.2658C1.69013 19.236 1.65181 19.213 1.6101 19.1983C1.56839 19.1835 1.52413 19.1773 1.47997 19.18C1.4353 19.1825 1.39157 19.1939 1.35128 19.2134C1.311 19.2329 1.27496 19.2601 1.24523 19.2936C1.2155 19.327 1.19267 19.366 1.17804 19.4083C1.16341 19.4506 1.15727 19.4953 1.15997 19.54C1.1726 20.4262 1.39537 21.2967 1.80997 22.08C2.11357 22.6253 2.5594 23.0781 3.09997 23.39C3.96938 23.869 4.96067 24.0812 5.94997 24C6.94357 23.9088 7.89723 23.5645 8.71997 23C9.13068 22.726 9.49522 22.3884 9.79998 22C10.0272 21.7059 10.1845 21.3639 10.26 21C10.309 20.696 10.26 20.3843 10.12 20.11ZM2.30997 16.39L2.21997 15.39C2.21997 14.64 2.08997 13.66 2.58997 13.2C2.68997 13.2 3.03997 12.61 3.46997 13.42C3.70747 13.8631 3.85369 14.3494 3.89997 14.85C3.89958 14.9005 3.91115 14.9504 3.93375 14.9956C3.95634 15.0408 3.98932 15.08 4.02997 15.11C3.39431 15.4458 2.81418 15.8775 2.30997 16.39Z" />
              </g>
              <defs>
                <clipPath id="clip0_1032_3590">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div> */}

          <section className="mb-12">
            <h2 className="h3 font-aspekta text-foreground mb-4">About Me</h2>
            <p className="text-muted-foreground mb-6">
              Before 2018, I did anything and everything related to marketing.
            </p>
            <p className="text-muted-foreground mb-6">
              Social, SEO, events, influencer, you name it. Then I picked up a
              book called{" "}
              <a
                className="font-semibold text-primary no-underline hover:underline transition-all duration-300"
                href="https://www.amazon.com/Learn-Python-Hard-Way-Introduction/dp/0134692888/ref=sr_1_1?crid=CSRKAKUXFENG&dib=eyJ2IjoiMSJ9.Jsi9FEra3XWdrQnZX3Mt5QElFFIXBcRk2NWUPdIwjU27HCp6f40Yc3nCUS72X4HY.Hhigpfrs7GEJMyZs9DEyEvVu_PHWXtSw8pWYHYhvuMM&dib_tag=se&keywords=learn+python+the+hardway&qid=1727639174&sprefix=learn+python+the+hardwa%2Caps%2C140&sr=8-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Python The Hard Way
              </a>{" "}
              and everything changed.
            </p>

            <p className="text-muted-foreground mb-6">
              Since 2018, I've been obsessed with building stuff with code. I've
              built in-house apps for companies, automated hundreds of
              processes, and built more side-projects than I can count.
            </p>
            <p className="text-muted-foreground mb-6">
              Currently, I'm leading the development efforts at{" "}
              <a
                href="https://www.stitch3d.io"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary no-underline hover:underline transition-all duration-300"
              >
                Stitch3D
              </a>
              , where we're revolutionizing the 3D LIDAR industry by moving
              their work from the desktop to the cloud.
            </p>
            <p className="text-muted-foreground mb-6">
              I have a hard time sitting still and love to work on new ideas. If
              you have anything you want to chat about, don't be shy. Say hello
              on any of my channels. 👋
            </p>
          </section>

          <section className="my-16 md:my-12">
            <Posts />
          </section>

          <section className="my-16 md:my-12">
            <FeaturedProjects />
          </section>
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="!mt-20 md:!mt-0 md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <WidgetNewsletter />
          <WidgetConnect />
          {/* <WidgetSponsor /> */}
        </div>
      </aside>
    </div>
  );
}
