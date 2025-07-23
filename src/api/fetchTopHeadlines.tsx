import { fetchGuardianArticles } from "./guardianApi";
import { fetchNewsApi } from "./newsApi";
import { fetchNYTArticles } from "./nytApi";

export const fetchTopHeadlines = async (
  query = "",
  category = "",
  from = "",
  source = ""
) => {
  let articles: any[] = [];

  if (!source || source === "newsapi") {
    const newsApiArticles = await fetchNewsApi(query, category, from);
    console.log({ newsApiArticles });
    articles.push(
      ...newsApiArticles.map((a: any) => ({
        title: a.title,
        url: a.url,
        image: a.urlToImage,
        description: a.description,
        source: a.source?.name,
        publishedAt: a.publishedAt,
      }))
    );
  }

  if (!source || source === "guardian") {
    const guardianArticles = await fetchGuardianArticles(query, from);
    console.log({ guardianArticles });

    articles.push(...guardianArticles);
  }

  if (!source || source === "nyt") {
    const nytArticles = await fetchNYTArticles();
    console.log({ nytArticles });
    articles.push(...nytArticles);
  }

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};
