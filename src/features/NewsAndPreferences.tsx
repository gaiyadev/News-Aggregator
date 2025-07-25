import { useEffect, useState } from "react";
import { fetchTopHeadlines } from "../api/fetchTopHeadlines";
import { usePreferences } from "../hooks/usePreferences";
import { categories } from "../utils/category";
import { sources } from "../utils/sources";
import { useDebounce } from "../hooks/useDebounce";
import ArticleCard from "../components/ArticleCard";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Loader from "./Loader";
import type { Article } from "../types/articles";

const NewsAndPreferences = () => {
  const { prefs, updatePrefs } = usePreferences();
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTopHeadlines(
          debouncedSearch,
          prefs.categories[0] || "",
          fromDate,
          prefs.sources[0] || ""
        );
        setArticles(data);
        setError(null);
        localStorage.setItem("lastArticles", JSON.stringify(data));
      } catch (err) {
        setError("Failed to load news. Showing cached data if available.");
        const cached = localStorage.getItem("lastArticles");
        if (cached) setArticles(JSON.parse(cached));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch, prefs, fromDate]);

  const handlePrefChange = (type: "sources" | "categories", value: string) => {
    const updated = prefs[type].includes(value)
      ? prefs[type].filter((v) => v !== value)
      : [...prefs[type], value];

    updatePrefs({ [type]: updated });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold text-center bg-white shadow p-4 mb-4">
        News Aggregator
      </h1>

      {/* Preferences */}
      <div className="p-4 bg-white rounded shadow mb-4">
        <h2 className="font-bold text-lg mb-2">Personalize Feed</h2>

        <div className="mb-2">
          <p className="font-medium">Sources:</p>
          {sources.map((src) => (
            <label key={src} className="block">
              <input
                type="checkbox"
                checked={prefs.sources.includes(src)}
                onChange={() => handlePrefChange("sources", src)}
              />
              <span className="ml-2">{src}</span>
            </label>
          ))}
        </div>

        <div>
          <p className="font-medium">Categories:</p>
          {categories.map((cat) => (
            <label key={cat.value || "all"} className="block">
              <input
                type="checkbox"
                checked={prefs.categories.includes(cat.value)}
                onChange={() => handlePrefChange("categories", cat.value)}
              />
              <span className="ml-2">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/*  Filters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        <InputField
          type="text"
          value={search}
          onChange={setSearch}
          placeholder="Search articles..."
        />
        <SelectField
          value={prefs.categories[0] || ""}
          onChange={(v) => updatePrefs({ categories: [v] })}
          options={categories}
          placeholder="Choose category"
        />
        <InputField
          value={fromDate}
          type="date"
          onChange={setFromDate}
          placeholder="From date"
        />
        <SelectField
          value={prefs.sources[0] || ""}
          onChange={(v) => updatePrefs({ sources: [v] })}
          options={sources}
          placeholder="Choose source"
        />
      </div>

      {/* Articles */}
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

export default NewsAndPreferences;
