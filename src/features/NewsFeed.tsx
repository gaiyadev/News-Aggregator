import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchTopHeadlines } from "../api/fetchTopHeadlines";
import { categories } from "../utils/category";
import { sources } from "../utils/sources";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

const NewsFeed = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTopHeadlines(
          search,
          category,
          fromDate,
          source
        );
        setArticles(data);
      } catch (error) {
        console.error("Error fetching headlines:", error);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, category, fromDate, source]);

  return (
    <div className="p-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {/* <input
          type="text"
          placeholder="Search articles..."
          className="p-2 border rounded"
          onChange={(e) => setSearch(e.target.value)}
        /> */}
        <InputField
          type="text"
          value={search}
          onChange={setSearch}
          placeholder="Search articles..."
        />
        {/* <select
          className="p-2 border rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select> */}
        <SelectField
          value={category}
          onChange={setCategory}
          options={categories}
          placeholder="Choose a categories"
        />
        {/* <input
          type="date"
          className="p-2 border rounded"
          onChange={(e) => setFromDate(e.target.value)}
        /> */}
        <InputField
          value={fromDate}
          type="date"
          onChange={setFromDate}
          placeholder="Search articles..."
        />
        {/* <select
          className="p-2 border rounded"
          onChange={(e) => setSource(e.target.value)}
        >
          {sources.map((source) => {
            return <option value={source}>{source} </option>;
          })}
        </select> */}
        <SelectField
          value={source}
          onChange={setSource}
          options={sources}
          placeholder="Choose a source"
        />
      </div>

      {/* {loading ? (
        <div className="text-center text-gray-500 py-10">
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
          </div>
          <span className="animate-pulse">Loading articles...</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.length ? (
            articles.map((article, i) => <ArticleCard key={i} {...article} />)
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      )} */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
          </div>
          <span className="animate-pulse">Loading articles...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.length ? (
            articles.map((article, i) => <ArticleCard key={i} {...article} />)
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
