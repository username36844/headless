import Image from "next/image";
import parse from "html-react-parser";
import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { getPost } from "@/services/posts";

export const revalidate = 300;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* -------------------------------- */
/* SEO METADATA */
/* -------------------------------- */

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const post = await getPost(slug);

  return {
    title: post.seo?.title || post.title,
    description:
      post.seo?.metaDesc ||
      post.articleSettings?.subtitle ||
      "Read this article on Chronicle",

    alternates: {
      canonical: post.seo?.canonical,
    },

    openGraph: {
      title: post.seo?.opengraphTitle || post.title,
      description:
        post.seo?.opengraphDescription || post.articleSettings?.subtitle,
      images: post.seo?.opengraphImage?.sourceUrl
        ? [{ url: post.seo.opengraphImage.sourceUrl }]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: post.seo?.twitterTitle || post.title,
      description:
        post.seo?.twitterDescription || post.articleSettings?.subtitle,
    },
  };
}

/* -------------------------------- */
/* PAGE */
/* -------------------------------- */

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await getPost(slug);

  return (
    <>
      <Navbar />

      <main className="pb-24">
        <article className="mx-auto max-w-3xl px-6 pt-16">
          <div className="mb-8 text-sm font-medium text-zinc-500">
            The Chronicle Blog
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight leading-[1.02] md:text-6xl">
            {post.title}
          </h1>

          {post.articleSettings?.subtitle && (
            <p className="mt-6 text-xl text-zinc-600">
              {post.articleSettings.subtitle}
            </p>
          )}

          <div className="mt-10 flex items-center justify-between border-y py-5">
            <div className="text-sm text-zinc-600">
              {post.articleSettings?.readingTime ?? 0} min read
              {post.articleSettings?.isPremium && (
                <span className="ml-2 font-medium text-violet-700">
                  • Premium
                </span>
              )}
            </div>
          </div>

          {post.featuredImage?.node?.sourceUrl && (
            <div className="mt-12 overflow-hidden rounded-2xl">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                width={1400}
                height={800}
                unoptimized
                className="w-full object-cover"
              />
            </div>
          )}

          {post.articleSettings?.featuredQuote && (
            <blockquote className="mt-14 border-l-2 pl-6 text-xl leading-relaxed italic text-zinc-700">
              {post.articleSettings.featuredQuote}
            </blockquote>
          )}

          <div className="prose mt-16 max-w-none">
            {parse(post.content || "")}
          </div>
        </article>
      </main>
    </>
  );
}
