"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


export default function MyArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/news/")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  // Delete handler
  const handleDelete = async (id: number) => {
    const confirmDel = confirm("Are you sure you want to delete this article?");
    if (!confirmDel) return;

    const res = await fetch(`http://127.0.0.1:8000/api/news/${id}/delete/`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      setArticles((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-black text-center mb-10">My Articles</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-400">
          No internal articles added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((item) => (
            <div
              key={item.id}
              className="block rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 
      shadow-lg hover:shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02] 
      transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image || "/no-image.jpg"}
                className="w-full h-52 object-cover"
                alt={item.title}
              />

              {/* Content */}
              <div className="p-5 space-y-3">
                <h2 className="text-2xl font-bold line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-gray-300 text-sm line-clamp-3">
                  {item.summary}
                </p>

                <p className="text-xs text-gray-500">Source: {item.source}</p>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <a
                    href={item.url}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    Read More →
                  </a>

                  <div className="flex gap-2">
                    <Link
                      href={`/edit-article/${item.id}`}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white text-sm rounded-md"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-sm rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
