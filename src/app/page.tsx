import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { PostCard } from "@/components/post-card";
import { getPosts } from "@/services/posts";
import { Metadata } from "next";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Home",
  description:
    "Chronicle explores frontend engineering, system design, and modern web architecture.",

  openGraph: {
    title: "Chronicle",
    description:
      "Modern publishing platform for engineering content.",
    url: "https://your-domain.com",
  },

  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />

      <main className="pb-24">
        {/* HERO */}
        <section className="border-b border-border">
          <Container>
            <div className="max-w-4xl py-24 md:py-32">
              <div className="space-y-8">
                <span className="inline-flex items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-zinc-600">
                  Modern Publishing Platform
                </span>

                <h1 className="text-6xl font-extrabold tracking-tight leading-[0.95] md:text-8xl">
                  Thoughts on engineering, systems, and the modern web.
                </h1>

                <p className="max-w-2xl text-xl leading-relaxed text-zinc-600 md:text-2xl">
                  Chronicle is a headless publishing platform exploring
                  frontend architecture, authentication, performance,
                  and scalable product engineering.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* POSTS */}
        <section>
          <Container>
            <div className="py-16">
              <div className="mb-14">
                <h2 className="text-3xl font-bold tracking-tight">
                  Latest Articles
                </h2>

                <p className="mt-2 text-zinc-600">
                  Editorial writing on Next.js, systems design,
                  authentication, and frontend engineering.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}