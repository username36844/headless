import { cache } from "react";
import { Post } from "@/types/post";

/* -------------------------------- */
/* ENV SAFETY CHECK */
/* -------------------------------- */

const GRAPHQL_URL = process.env.WP_GRAPHQL_URL;

if (!GRAPHQL_URL) {
  throw new Error("❌ WP_GRAPHQL_URL is missing in environment variables");
}

/* -------------------------------- */
/* GRAPHQL QUERIES */
/* -------------------------------- */

const POSTS_QUERY = `
query Posts {
  posts {
    nodes {
      title
      slug
      excerpt
      date

      featuredImage {
        node {
          sourceUrl
        }
      }

      articleSettings {
        subtitle
        readingTime
        isPremium
        featuredQuote
      }

      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
        twitterTitle
        twitterDescription
      }
    }
  }
}
`;

/* -------------------------------- */
/* FETCH ALL POSTS */
/* -------------------------------- */

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: POSTS_QUERY,
    }),
    next: {
      revalidate: 120,
    },
  });

  const json = await res.json();

  if (!json?.data?.posts?.nodes) {
    console.error("GRAPHQL ERROR:", json);
    throw new Error("Failed to fetch posts");
  }

  return json.data.posts.nodes;
}

/* -------------------------------- */
/* FETCH SINGLE POST (FIXED VERSION) */
/* -------------------------------- */

const POST_QUERY = `
query Post($slug: String!) {
  postBy(slug: $slug) {
    title
    slug
    content
    excerpt
    date

    featuredImage {
      node {
        sourceUrl
      }
    }

    articleSettings {
      subtitle
      readingTime
      isPremium
      featuredQuote
    }

    seo {
      title
      metaDesc
      canonical
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
      }
      twitterTitle
      twitterDescription
    }
  }
}
`;

export const getPost = cache(async (slug: string): Promise<Post> => {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: POST_QUERY,
      variables: {
        slug,
      },
    }),
    next: {
      revalidate: 300,
    },
  });

  const json = await res.json();

  // full debug if something breaks
  if (json.errors) {
    console.error("GRAPHQL ERRORS:", JSON.stringify(json.errors, null, 2));
  }

  if (!json?.data?.postBy) {
    console.error("GRAPHQL FULL RESPONSE:", JSON.stringify(json, null, 2));
    throw new Error("Post not found or GraphQL failed");
  }

  return json.data.postBy;
});