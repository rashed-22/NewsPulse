"use client";

export default function NewsCard({ item }: any) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 
      shadow-lg hover:shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02] 
      transition-all duration-300 cursor-pointer"
    >
      <img
        src={item.urlToImage || "/no-image.jpg"}
        className="w-full h-48 object-cover"
        alt={item.title}
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{item.title}</h2>

        <p className="text-gray-300 text-sm line-clamp-3 mb-3">
          {item.description || "No summary available."}
        </p>

        <div className="text-xs text-gray-500">
          {item.source?.name || "Unknown source"}
        </div>
      </div>
    </a>
  );
}
