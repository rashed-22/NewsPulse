"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditArticle() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    url: "",
    source: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  // Load existing article
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/news/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title,
          summary: data.summary,
          url: data.url,
          source: data.source,
          image: data.image,
        });
        setLoading(false);
      });
  }, [id]);

  // Update handler
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`http://127.0.0.1:8000/api/news/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Article updated!");
      router.push("/my-articles");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading article...</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Article</h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="w-full p-3 bg-zinc-800 rounded-md"
        />

        <textarea
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          placeholder="Summary"
          className="w-full p-3 bg-zinc-800 rounded-md h-32"
        ></textarea>

        <input
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="URL"
          className="w-full p-3 bg-zinc-800 rounded-md"
        />

        <input
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
          placeholder="Source"
          className="w-full p-3 bg-zinc-800 rounded-md"
        />

        <input
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="Image URL"
          className="w-full p-3 bg-zinc-800 rounded-md"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold"
        >
          Update Article
        </button>
      </form>
    </main>
  );
}
