import axios from "axios";

const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const fetchNYTArticles = async () => {
  const res = await axios.get(
    "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json",
    {
      params: {
        "api-key": NYT_API_KEY,
      },
    }
  );

  return res.data.results.map((item: any) => ({
    title: item.title,
    description: item.abstract,
    url: item.url,
    urlToImage: item.media?.[0]?.["media-metadata"]?.[2]?.url || "",
    source: { name: "NYT" },
  }));
};
