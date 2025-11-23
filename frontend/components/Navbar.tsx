"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // RESET HOME HANDLER
  const handleResetHome = () => {
    router.push("/?reset=true"); // send reset trigger
    setOpen(false); // close mobile menu
  };

  return (
    <nav className="border-b border-zinc-800 px-6 py-4 sticky top-0 bg-black/80 backdrop-blur-lg z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* LOGO → RESET HOME */}
        <button
          onClick={handleResetHome}
          className="text-2xl font-bold"
        >
          NewsPulse
        </button>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <span className="text-3xl font-bold">✕</span>
          ) : (
            <span className="text-3xl">☰</span>
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {/* HOME → RESET */}
          <button
            onClick={handleResetHome}
            className="hover:text-blue-400 duration-200"
          >
            Home
          </button>

          <Link href="/add-article" className="hover:text-blue-400 duration-200">
            Add News
          </Link>

          <Link href="/my-articles" className="hover:text-blue-400 duration-200">
            My Articles
          </Link>

          <Link href="/categories" className="hover:text-blue-400 duration-200">
            Categories
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="mt-4 flex flex-col gap-4 md:hidden text-center">

          {/* HOME → RESET */}
          <button
            onClick={handleResetHome}
            className="hover:text-blue-400 duration-200"
          >
            Home
          </button>

          <Link
            href="/add-article"
            onClick={() => setOpen(false)}
            className="hover:text-blue-400 duration-200"
          >
            Add News
          </Link>

          <Link
            href="/my-articles"
            onClick={() => setOpen(false)}
            className="hover:text-blue-400 duration-200"
          >
            My Articles
          </Link>

          <Link
            href="/categories"
            onClick={() => setOpen(false)}
            className="hover:text-blue-400 duration-200"
          >
            Categories
          </Link>
        </div>
      )}
    </nav>
  );
}
