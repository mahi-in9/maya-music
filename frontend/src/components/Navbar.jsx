import React, { useState, useCallback } from "react";
import { Menu, Search, Mic, Video, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    navigate(`/results?search_query=${encodeURIComponent(query)}`);
  }, [query, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-[#0f0f0f] text-white sticky top-0 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          aria-label="Open menu"
          className="p-2 hover:bg-zinc-800 rounded-full transition"
        >
          <Menu size={24} />
        </button>

        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <img src="/assets/youtube.svg" alt="Logo" className="h-5" />
          <span className="text-[10px] text-zinc-400 ml-1 self-start">IN</span>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-1 items-center justify-center max-w-[720px]">
        <div className="flex w-full items-center">
          <div className="flex flex-1 items-center bg-[#121212] border border-zinc-700 rounded-l-full px-4 py-1.5 focus-within:border-blue-500">
            <input
              aria-label="Search videos"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search"
              className="w-full bg-transparent outline-none text-base placeholder-zinc-500"
            />
          </div>

          <button
            aria-label="Search"
            onClick={handleSearch}
            className="bg-zinc-800 border border-l-0 border-zinc-700 px-5 py-1.5 rounded-r-full hover:bg-zinc-700 transition"
          >
            <Search size={20} />
          </button>
        </div>

        <button
          aria-label="Voice search"
          className="ml-4 p-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-full transition"
        >
          <Mic size={20} />
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <button
          aria-label="Create video"
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-full transition"
        >
          <Video size={20} />
          <span className="text-sm font-medium">Create</span>
        </button>

        <div
          aria-label="Notifications"
          className="relative p-2 hover:bg-zinc-800 rounded-full cursor-pointer transition"
        >
          <Bell size={24} />
          <span className="absolute top-1.5 right-1.5 bg-red-600 text-[10px] px-1 rounded-full border-2 border-[#0f0f0f]">
            1
          </span>
        </div>

        <img
          src="/assets/avatar.png"
          alt="User avatar"
          className="w-8 h-8 rounded-full border border-zinc-700 cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
