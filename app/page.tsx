"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import { fetchTopNews, searchNews, fetchCategoryNews } from "@/lib/newsapi";

// ⭐ Wrapper required for Vercel SSR
export default function HomeWrapper() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Home />
    </Suspense>
  );
}

function Home() {
  const params = useSearchParams();
  const router = useRouter();

  const isReset = params.get("reset") === "true";
  const categoryFromURL = params.get("category");

  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ⭐ Load news based on URL or reset
  useEffect(() => {
    setIsLoading(true);
    setPage(1);

    // CATEGORY mode
    if (categoryFromURL) {
      setActiveCat(categoryFromURL);

      fetchCategoryNews(categoryFromURL, 1).then((news) => {
        setData(news?.articles || []);
        setHasMore((news?.articles || []).length >= 20);
        setIsLoading(false);
      });

      return;
    }

    // RESET mode
    if (isReset) setActiveCat("");

    // DEFAULT TOP NEWS
    fetchTopNews(1).then((news) => {
      setData(news?.articles || []);
      setHasMore((news?.articles || []).length >= 20);
      setIsLoading(false);
    });
  }, [isReset, categoryFromURL]);

  // ⭐ Search functionality
  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    const result = await searchNews(query, 1);

    setData(result?.articles || []);
    setPage(1);
    setActiveCat("");
    setHasMore((result?.articles || []).length >= 20);
    setIsLoading(false);
  };

  // ⭐ FIXED Load More (works for TOP + CATEGORY)
  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    let moreNews;

    if (activeCat) {
      moreNews = await fetchCategoryNews(activeCat, nextPage);
    } else {
      moreNews = await fetchTopNews(nextPage);
    }

    const articles = moreNews?.articles || [];

    if (!articles.length) {
      setHasMore(false);
      return;
    }

    setData((prev) => [...prev, ...articles]);
  };

  return (
    <main className="px-5 py-10 max-w-6xl mx-auto space-y-8">
      {/* LOGO Reset */}
      <h1
        onClick={() => router.push("/?reset=true")}
        className="text-5xl font-black mb-6 text-center tracking-tight drop-shadow cursor-pointer"
      >
        NewsPulse
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex gap-3 items-center">
        <input
          type="text"
          placeholder="Search latest news…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 pl-4 rounded-xl bg-zinc-900/70 border border-zinc-700 text-white"
        />

        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                     text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          Search
        </button>
      </div>

      {/* Category Bar */}
      <div className="flex gap-3 flex-wrap mb-6 justify-center">
        {["business", "technology", "sports", "health", "science", "entertainment"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCat(cat);
                router.push(`/?category=${cat}`);
              }}
              className={`px-4 py-2 rounded-full text-sm capitalize transition shadow-sm
                ${
                  activeCat === cat
                    ? "bg-blue-600 text-white border-blue-400"
                    : "bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700"
                }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <LoadingCard />
            <LoadingCard />
          </>
        ) : (
          data.map((item: any, index: number) => (
            <NewsCard key={item.url || index} item={item} />
          ))
        )}
      </div>

      {/* Load More */}
      {!isLoading && hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg shadow-md"
          >
            Load More ↓
          </button>
        </div>
      )}

      {/* No More */}
      {!hasMore && (
        <p className="text-center text-gray-400 mt-6">No more news available.</p>
      )}
    </main>
  );
}

// ⭐ Loading Components
function LoadingCard() {
  return (
    <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900 animate-pulse">
      <div className="h-48 bg-zinc-800 rounded mb-4"></div>
      <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-zinc-800 rounded w-full"></div>
    </div>
  );
}

function LoadingScreen() {
  return <div className="text-center text-gray-400 p-10">Loading…</div>;
}
