import axios from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "X-Api-Key": NEWS_API_KEY,
  },
});

export const fetchNewsApi = async (query = "", category = "", from = "") => {
  try {
    const res = await newsApi.get("/everything", {
      params: {
        q: query || category || "news",
        from: from || undefined,
        sortBy: "publishedAt",
        pageSize: 100,
        language: "en",
      },
    });
    return res.data.articles;
  } catch (error) {
    throw error;
  }
};
