import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "NewsPulse",
  description: "Your AI-powered news portal",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="bg-black text-white">

        <Navbar />

        {children}

        <footer className="mt-16 border-t border-zinc-800 py-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} NewsPulse. All rights reserved.</p>
          <p className="mt-2">
            Built with <span className="text-red-500">❤</span> using Next.js & Django
          </p>
        </footer>

      </body>
    </html>
  );
}
