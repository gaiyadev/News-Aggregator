import { useQuery } from "@tanstack/react-query";
import { fetchTopHeadlines } from "../api/fetchTopHeadlines";

export const useTopHeadlines = (
  search: string,
  category: string,
  fromDate: string,
  source: string
) => {
  return useQuery({
    queryKey: ["topHeadlines", search, category, fromDate, source],
    queryFn: () => fetchTopHeadlines(search, category, fromDate, source),
    retry: false,
    enabled: !!source, // only fetch if source is selected
  });
};
