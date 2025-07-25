import React, { useState } from "react";
import { fetchTopHeadlines } from "../api/fetchTopHeadlines";
import { usePreferences } from "../hooks/usePreferences";
import { categories } from "../utils/category";
import { sources } from "../utils/sources";

const Preferences = () => {
  const { prefs, updatePrefs } = usePreferences();
  const [loading, setLoading] = useState(false);

  const handleChange = async (
    type: "sources" | "categories",
    value: string
  ) => {
    const updated = prefs[type].includes(value)
      ? prefs[type].filter((v) => v !== value)
      : [...prefs[type], value];

    updatePrefs({ [type]: updated });

    setLoading(true); // Start loading

    try {
      await fetchTopHeadlines(
        "",
        type === "categories" ? value : "",
        "",
        type === "sources" ? value : ""
      );

      // Optionally lift data up if you're managing articles here
    } catch (err) {
      console.error("Failed to fetch updated headlines", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="font-bold text-lg mb-2">Personalize Feed</h2>

      {loading && (
        <p className="text-blue-600 text-sm mb-2">Updating feed...</p>
      )}

      <div className="mb-2">
        <p className="font-medium">Sources:</p>
        {sources.map((src) => (
          <label key={src} className="block">
            <input
              type="checkbox"
              checked={prefs.sources.includes(src)}
              onChange={() => handleChange("sources", src)}
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
              onChange={() => handleChange("categories", cat.value)}
            />
            <span className="ml-2">{cat.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Preferences);
