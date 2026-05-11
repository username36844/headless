import Link from "next/link";
import Image from "next/image";

import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export function PostCard({
  post,
}: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
    >
      <article className="">
        {/* Image */}

        {post.featuredImage?.node?.sourceUrl && (
          <div className="overflow-hidden rounded-2xl bg-zinc-100">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              width={1400}
              height={800}
              unoptimized
              className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Content */}

        <div className="mt-4 max-w-3xl">
          <h2 className="text-2xl line-clamp-2 font-bold text-foreground transition-opacity duration-200 group-hover:opacity-80">
            {post.title}
          </h2>

          <p className="mt-3 leading-relaxed line-clamp-2 text-zinc-600">
            {post.articleSettings?.subtitle}
          </p>

          {/* Meta */}

          <div className="mt-6 flex items-center gap-3 text-sm text-zinc-500">
            <div className="h-7 w-7 rounded-full bg-zinc-200" />

            <span className="font-medium text-zinc-700">
              Chronicle Staff
            </span>

            <span>·</span>

            <span>
              {post.articleSettings?.readingTime} min read
            </span>

            {post.articleSettings?.isPremium && (
              <>
                <span className="w-2 h-2 bg-violet-700 rounded-full"></span>

                <span className="font-medium text-violet-700">
                  Premium
                </span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}