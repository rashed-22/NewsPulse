export default function Categories() {
  const items = ["Technology", "Politics", "Sports", "Business", "Entertainment"];

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((cat: string) => (
          <div
            key={cat}
            className="border border-zinc-800 p-6 rounded-lg bg-zinc-900 text-center hover:bg-zinc-800 cursor-pointer duration-200"
          >
            {cat}
          </div>
        ))}
      </div>
    </main>
  );
}
