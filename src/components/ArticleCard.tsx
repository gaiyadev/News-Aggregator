type Props = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: { name: string };
};

const ArticleCard = ({
  title,
  description,
  url,
  urlToImage,
  source,
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
          src={urlToImage}
          alt={title}
          className="w-full h-48 object-cover mb-2 rounded"
        />
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span className="text-xs text-gray-400">Source: {source.name}</span>
    </a>
  );
};

export default ArticleCard;
