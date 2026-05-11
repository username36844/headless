import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { PostCard } from "@/components/post-card";
import { para } from "@/index";

import { getPosts } from "@/services/posts";
import { Metadata } from "next";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Read articles on Next.js, frontend engineering, authentication, and system design.",

  openGraph: {
    title: "Articles | Chronicle",
    description:
      "Engineering-focused articles and deep dives.",
    url: "https://your-domain.com/blog",
  },

  alternates: {
    canonical: "/blog",
  },
};

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />

      <main className="py-20">
        <Container>
          <div className="mb-20">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              Headless Publishing Platform
            </span>

            <h1 className="mt-6 text-7xl font-extrabold tracking-tight leading-none max-w-4xl">
              Our Blogs
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-600">
              Chronicle explores frontend systems, authentication, performance,
              and scalable Next.js architecture through long-form editorial
              content.
            </p>
          </div>

          <section>
            <Container>
              <div className="py-16">
                <div className="mb-14">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Latest Articles
                  </h2>

                  <p className="mt-2 text-zinc-600">{para}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {posts.map((post) => {
                    const isPremium = post.articleSettings?.isPremium;

                    return (
                      <PostCard
                        key={post.slug}
                        post={{
                          ...post,
                          title: post.title,
                          excerpt: isPremium
                            ? "Login required to read this article"
                            : post.excerpt,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </Container>
          </section>
        </Container>
      </main>
    </>
  );
}
