import { BASE_URL } from "./constants";

export const fetchNewsArticles = async (query) => {
  const response = await fetch(`${BASE_URL}/api/news?q=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch news articles");
  }
  return response.json();
};

