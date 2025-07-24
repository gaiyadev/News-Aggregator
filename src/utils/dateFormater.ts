export const formatDate = (publishedAt?: string | Date): string => {
  if (!publishedAt) return "Unknown";

  try {
    return new Date(publishedAt).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch (e) {
    return "Unknown";
  }
};
