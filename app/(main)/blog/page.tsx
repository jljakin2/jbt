import { getBlogPosts } from "@/components/mdx/utils";
import EssaysHero from "@/components/essays-hero";
import PostItem from "@/app/post-item";
import Talks from "@/components/posts";
import FeaturedProjects from "@/components/featured-projects";
import WidgetNewsletter from "@/components/widget-newsletter";
import WidgetSponsor from "@/components/widget-sponsor";
import WidgetBook from "@/components/widget-book";
import EssayList from "./components/essay-list";
import WidgetPosts from "@/components/widget-posts";

export const metadata = {
  metadataBase: new URL("https://www.jeffbuildstech.com/"),
  title: "Blog",
  alternates: {
    canonical: "/blog",
  },
  description:
    "Helpful content and tutorials for web dev, product management, and career help for busy business builders.",
  openGraph: {
    title: "Blog",
    description:
      "Helpful content and tutorials for web dev, product management, and career help for busy business builders.",

    type: "website",
    locale: "en_US",
    url: "https://www.jeffbuildstech.com/",
    siteName: "Jeff Builds Tech",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function Home() {
  const allBlogs = getBlogPosts();

  // Sort posts by date
  allBlogs.sort((a, b) => {
    return new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
      ? -1
      : 1;
  });

  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-6 md:pt-16 pb-16 md:pb-20">
      {/* Middle area */}
      <div className="grow">
        <div className="max-w-[700px]">
          <EssaysHero />
          <div className="space-y-10">
            <EssayList essays={allBlogs} />
            {/* <Talks />
              <FeaturedProjects /> */}
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="!mt-20 md:!mt-0 md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <WidgetNewsletter />
          {/* <WidgetSponsor /> */}
          <WidgetPosts />
          {/* <WidgetBook /> */}
        </div>
      </aside>
    </div>
  );
}
