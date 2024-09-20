import Image from "next/image";
import WidgetNewsletter from "@/components/widget-newsletter";
import WidgetSponsor from "@/components/widget-sponsor";
import AboutImg from "@/public/images/jbt_hero.svg";
import Experience from "@/components/experience";

export const metadata = {
  title: "About - DevSpace",
  description: "Page description",
};

export default function About() {
  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
      {/* Middle area */}
      <div className="grow">
        <div className="max-w-[700px]">
          <section>
            {/* Page title */}
            <h1 className="h1 font-aspekta mb-5">
              Hi. I'm{" "}
              <span className="inline-flex relative text-sky-500 before:absolute before:inset-0 before:bg-sky-200 dark:before:bg-sky-500 before:opacity-30 before:-z-10 before:-rotate-2 before:translate-y-1/4">
                @jeffbuildstech
              </span>{" "}
              🤙
            </h1>
            <Image
              className="w-4/5 mx-auto my-8"
              src={AboutImg}
              width={692}
              height={390}
              alt="About"
            />
            {/* Page content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="h3 font-aspekta text-foreground">Short Bio</h2>
              </div>
              <p className="text-muted-foreground">
                I’m a full-stack developer with a digital marketing and PM
                background. I&apos;m on a mission to find curious people in
                motion and build useful things together 🚀.
              </p>
              <p className="text-muted-foreground">
                I'm currently working on{" "}
                <a
                  href="https://www.stitch3d.io"
                  target="_blank"
                  className="link"
                >
                  Stitch3D
                </a>{" "}
                as the lead developer. We are building <i>the</i> place for 3D
                LIDAR tools on the web.
              </p>

              <Experience />

              <div className="space-y-4">
                <h2 className="h3 font-aspekta text-slate-800 dark:text-slate-100">
                  Let's Connect
                </h2>
                <p>
                  I'm excited to connect with others via{" "}
                  <a
                    className="font-medium text-sky-500 hover:underline"
                    href="#0"
                  >
                    email
                  </a>{" "}
                  and{" "}
                  <a
                    className="font-medium text-sky-500 hover:underline"
                    href="#0"
                  >
                    Twitter
                  </a>{" "}
                  to chat about projects and ideas. Currently, I'm not taking on
                  freelance projects, but I am open to hearing about potential
                  opportunities, discussing them with you and then potentially
                  collaborating if it's a good fit.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <WidgetNewsletter />
          {/* <WidgetSponsor /> */}
        </div>
      </aside>
    </div>
  );
}
