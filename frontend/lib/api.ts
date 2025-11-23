const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getNews() {
  const res = await fetch(`${BASE_URL}/news/proxy/`, { cache: "no-store" });
  return res.json();
}
