import { useQuery } from "@tanstack/react-query";
import { fetchTopHeadlines } from "../api/fetchTopHeadlines";

const useTopHeadlines = (
  search: string,
  category: string,
  fromDate: string,
  source: string
) => {
  return useQuery({
    queryKey: ["topHeadlines", search, category, fromDate, source],
    queryFn: () => fetchTopHeadlines(search, category, fromDate, source),
    // staleTime: 1000 * 60 * 10, // 10 minutes
    // cacheTime: 1000 * 60 * 30, // 30 minutes
    retry: false, // prevents retrying on 429 rate limit
    enabled: !!source, // optional: only fetch when source is selected
  });
};
