"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import News from "./News";

export default function RightSidebar() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search/${input}`);
  };

  return (
    <div className="p-4 w-full  flex flex-col gap-4">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 pt-2 pb-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 bg-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </form>
      </div>

      {/* News Feed */}
      <News />
    </div>
  );
}
