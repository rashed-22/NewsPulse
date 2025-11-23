"use client";
import { useState } from "react";

export default function AddArticle() {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    url: "",
    source: "",
    published_at: "",
    image_url: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/news/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setMsg(res.ok ? "Article added successfully!" : "Failed to add article.");
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add News Article</h1>

      {msg && <p className="mb-4 text-green-400">{msg}</p>}

      <form onSubmit={submit} className="space-y-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={(form as any)[key]}
            onChange={handleChange}
            placeholder={key.replace("_", " ").toUpperCase()}
            type={key === "published_at" ? "datetime-local" : "text"}
            className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded text-white"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-md"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
