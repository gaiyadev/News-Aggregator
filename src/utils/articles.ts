export type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt?: string;
  source: { name?: string } | string;
  // other fields...
};
