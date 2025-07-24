import React from "react";
import type { Props } from "../types/article";
import { formatDate } from "../utils/dateFormater";

const ArticleCard = ({
  title,
  description,
  url,
  urlToImage,
  source,
  publishedAt,
}: Props) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border p-4 rounded hover:shadow"
    >
      {urlToImage && (
        <img
          loading="lazy"
          src={urlToImage}
          alt={title}
          className="w-full h-48 object-cover mb-2 rounded"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://via.placeholder.com/400x200?text=No+Image";
          }}
        />
      )}
      <h3 className="text-lg font-semibold">
        {title.length > 100 ? title.slice(0, 100) + "..." : title}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 mt-1">
          {description.length > 150
            ? description.slice(0, 150) + "..."
            : description}
        </p>
      )}
      <div className="text-xs text-gray-400 mt-2">
        <span className="pr-3">
          Source: {typeof source === "string" ? source : source?.name}
        </span>
        <span>Published: {formatDate(publishedAt)}</span>
      </div>
    </a>
  );
};

export default React.memo(ArticleCard);
