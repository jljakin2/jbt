import { getBlogPosts } from "@/components/mdx/utils";
import EssaysHero from "@/components/essays-hero";
import PostItem from "@/app/post-item";
import Talks from "@/components/talks";
import FeaturedProjects from "@/components/featured-projects";
import WidgetNewsletter from "@/components/widget-newsletter";
import WidgetSponsor from "@/components/widget-sponsor";
import WidgetBook from "@/components/widget-book";
import EssayList from "./components/essay-list";
import WidgetPosts from "@/components/widget-posts";

export const metadata = {
  title: "Home - DevSpace",
  description: "Page description",
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
    <>
      {/* Content */}
      <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
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
        <aside className="md:w-[240px] lg:w-[300px] shrink-0">
          <div className="space-y-6">
            <WidgetNewsletter />
            {/* <WidgetSponsor /> */}
            <WidgetPosts />
            {/* <WidgetBook /> */}
          </div>
        </aside>
      </div>
    </>
  );
}
