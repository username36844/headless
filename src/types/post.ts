export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date?: string;

  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };

  articleSettings?: {
    subtitle?: string;
    readingTime?: number;
    isPremium?: boolean;
    featuredQuote?: string;
  };

  seo?: {
    title?: string;
    metaDesc?: string;
    canonical?: string;

    opengraphTitle?: string;
    opengraphDescription?: string;

    opengraphImage?: {
      sourceUrl?: string;
    };

    twitterTitle?: string;
    twitterDescription?: string;
  };
}