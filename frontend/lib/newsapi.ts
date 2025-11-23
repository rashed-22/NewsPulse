const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function fetchTopNews(page = 1) {
  const res = await fetch(`${BASE_URL}/news/proxy/?page=${page}`);
  return res.json();
}

export async function searchNews(query: string, page = 1) {
  const res = await fetch(`${BASE_URL}/news/proxy/?q=${query}&page=${page}`
  );
  return res.json();
}

export async function fetchCategoryNews(category: string, page = 1) {
  const res = await fetch(`${BASE_URL}/news/proxy/?category=${category}&page=${page}`
  );
  return res.json();
}
