import type { Metadata } from "next";
import { getDocPages } from "@/components/mdx/utils";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx/mdx";
import TopicTitle from "@/components/topic-title";
// import Hamburger from '@/components/hamburger'
import Feedback from "@/components/feedback";
import PageNavigation from "@/components/page-navigation";
import Footer from "@/components/ui/footer";
import SecondaryNav from "@/components/secondary-nav";

export async function generateStaticParams() {
  const allDocs = getDocPages();

  return allDocs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const doc = getDocPages().find((doc) => doc.slug === params.slug);

  if (!doc) {
    return;
  }

  const { title, summary: description } = doc.metadata;

  return {
    title,
    description,
  };
}

export default async function SinglePost({
  params,
}: {
  params: {
    topic: string;
    slug: string;
  };
}) {
  const doc = getDocPages().find((doc) => doc.slug === params.slug);

  if (!doc) notFound();

  return (
    <>
      {/* Page header */}
      {doc.metadata.topicTitle && doc.metadata.topicSlug && (
        <div className="h-16 flex items-center mb-6">
          <TopicTitle
            name={doc.metadata.topicTitle}
            segment={doc.metadata.topicSlug}
          />
        </div>
      )}

      <article className="flex xl:space-x-12">
        {/* Main area */}
        <div className="min-w-0">
          {/* Mobile hamburger + breadcrumbs */}
          <div className="md:hidden flex items-center mb-8">
            {/* <Hamburger /> */}

            {/* Breadcrumbs */}
            <div className="flex items-center text-sm whitespace-nowrap min-w-0 ml-3">
              {doc.metadata.topicTitle && (
                <span className="text-slate-600 dark:text-slate-400">
                  {doc.metadata.topicTitle}
                </span>
              )}
              <svg
                className="fill-slate-400 shrink-0 mx-2 dark:fill-slate-500"
                width="8"
                height="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 2 2.414.586 6.828 5 2.414 9.414 1 8l3-3z" />
              </svg>
              <span className="text-slate-800 font-medium truncate dark:text-slate-200">
                {doc.metadata.title}
              </span>
            </div>
          </div>

          {/* Article content */}
          <div>
            <header className="mb-6">
              <h1 className="h2 text-slate-800 mb-4 dark:text-slate-200">
                {doc.metadata.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {doc.metadata.summary}
              </p>
            </header>
            <article className="prose text-slate-600 dark:text-slate-400 max-w-none prose-p:leading-normal prose-headings:text-slate-800 dark:prose-headings:text-slate-200 prose-a:font-medium prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-code:text-slate-800 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 dark:prose-code:text-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700 prose-headings:scroll-mt-24">
              <CustomMDX source={doc.content} />
            </article>
          </div>

          {/* Feedback */}
          <Feedback />

          {/* Page navigation */}
          <PageNavigation
            prevArticle={[doc.metadata.prevTitle, doc.metadata.prevSlug]}
            nextArticle={[doc.metadata.nextTitle, doc.metadata.nextSlug]}
          />

          {/* Content footer */}
          <Footer />
        </div>

        {/* Secondary navigation */}
        <SecondaryNav />
      </article>
    </>
  );
}
