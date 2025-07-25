import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchTopHeadlines } from "../api/fetchTopHeadlines";
import { categories } from "../utils/category";
import { sources } from "../utils/sources";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { useDebounce } from "../hooks/useDebounce";
import type { Article } from "../types/articles";
import Loader from "./Loader";
import { usePreferences } from "../hooks/usePreferences";

const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 500); // 500ms delay
  const { prefs } = usePreferences();

  useEffect(() => {
    if (prefs.categories.length) setCategory(prefs.categories[0]);
    if (prefs.sources.length) setSource(prefs.sources[0]);
    console.log({ prefs });
  }, [prefs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTopHeadlines(
          debouncedSearch,
          category,
          fromDate,
          source
        );

        setArticles(data);
        setError(null);
        localStorage.setItem("lastArticles", JSON.stringify(data)); // Cache
      } catch (error) {
        setError("Something went wrong. Please try again.");
        const cached = localStorage.getItem("lastArticles");
        if (cached) setArticles(JSON.parse(cached));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch, category, fromDate, source]);

  return (
    <div className="p-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        <InputField
          type="text"
          value={search}
          onChange={setSearch}
          placeholder="Search articles..."
        />

        <SelectField
          value={category}
          onChange={setCategory}
          options={categories}
          placeholder="Choose a categories"
        />

        <InputField
          value={fromDate}
          type="date"
          onChange={setFromDate}
          placeholder="Search articles..."
        />

        <SelectField
          value={source}
          onChange={setSource}
          options={sources}
          placeholder="Choose a source"
        />
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.length ? (
            articles.map((article, i) => <ArticleCard key={i} {...article} />)
          ) : (
            <p className="text-center text-gray-500 py-10">
              No articles found. Try changing your filters.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
