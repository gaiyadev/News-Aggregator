import axios from "axios";

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

export const guardianApi = axios.create({
  baseURL: "https://content.guardianapis.com",
});

export const fetchGuardianArticles = async (query = "", from = "") => {
  const res = await guardianApi.get("/search", {
    params: {
      q: query || undefined,
      "from-date": from || undefined,
      "api-key": GUARDIAN_API_KEY,
      showFields: "thumbnail,headline,trailText,short-url,byline",
      pageSize: 100,
    },
  });
  return res.data.response.results.map((article: any) => ({
    title: article.webTitle,
    url: article.webUrl,
    image: article.fields?.thumbnail,
    description: article.fields?.trailText,
    source: "The Guardian",
    publishedAt: article.webPublicationDate,
  }));
};
