import { fetchGuardianArticles } from "./guardianApi";
import { fetchNewsApi } from "./newsApi";
import { fetchNYTArticles } from "./nytApi";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";

export const fetchTopHeadlines = async (
  query = "",
  category = "",
  from = "",
  source = ""
) => {
  let articles: any[] = [];
  console.log({ category });

  if (!source || source === "All sources" || source === "nyt") {
    const nytArticles = await fetchNYTArticles();
    articles.push(
      ...nytArticles.map((a: any) => ({
        title: a.title,
        url: a.url,
        urlToImage: a.image || DEFAULT_IMAGE,
        description: a.description,
        source: a.source,
        publishedAt: a.publishedAt,
      }))
    );
  }

  if (!source || source === "All sources" || source === "guardian") {
    const guardianArticles = await fetchGuardianArticles(query, from);
    articles.push(
      ...guardianArticles.map((a: any) => ({
        title: a.title,
        url: a.url,
        urlToImage: a.image || DEFAULT_IMAGE,
        description: a.description,
        source: a.source,
        publishedAt: a.publishedAt,
      }))
    );
  }

  if (!source || source === "All sources" || source === "newsapi") {
    const newsApiArticles = await fetchNewsApi(query, category, from);
    console.log({ newsApiArticles });
    articles.push(
      ...newsApiArticles.map((a: any) => ({
        title: a.title,
        url: a.url,
        image: a.urlToImage || DEFAULT_IMAGE,
        description: a.description,
        source: a.source?.name,
        publishedAt: a.publishedAt,
      }))
    );
  }
  return articles;
};
