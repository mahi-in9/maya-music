import React, { useState } from "react";
import { Search, Mic, Bell, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#0f0f0f]/90 backdrop-blur-md text-white z-100 border-b border-white/5 flex items-center justify-between px-4 md:px-6">
      {/* GLOBAL BRAND SECTION (Hidden on mobile when searching) */}
      <AnimatePresence mode="wait">
        {!isMobileSearchActive && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <motion.img
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              src="/vite.svg"
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="text-xl md:text-2xl font-black tracking-tight bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              DROWSY
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CENTER & MOBILE SEARCH SECTION */}
      <div
        className={`flex items-center justify-center transition-all duration-300 ${isMobileSearchActive ? "flex-1" : "md:flex-1"}`}
      >
        {/* Mobile Search Overlay Triggered by State */}
        <AnimatePresence>
          {isMobileSearchActive && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center w-full gap-2 md:hidden"
            >
              <button
                onClick={() => setIsMobileSearchActive(false)}
                className="p-2 hover:bg-zinc-800 rounded-full"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="relative flex-1">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search"
                  className="w-full bg-[#121212] border border-zinc-700 rounded-full px-4 py-2 outline-none focus:border-blue-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DESKTOP SEARCH (Always visible on md+) */}
        <div className="hidden md:flex flex-1 items-center justify-center max-w-150 px-4">
          <div className="relative w-full group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-full blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
            <div className="relative flex w-full">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full bg-[#121212] border border-zinc-700 rounded-l-full px-5 py-2 outline-none focus:border-blue-500 transition-all placeholder:text-zinc-600"
              />
              <button className="bg-zinc-800 border border-l-0 border-zinc-700 px-6 rounded-r-full hover:bg-zinc-700 transition-colors">
                <Search size={20} className="text-zinc-400" />
              </button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#272727" }}
            className="ml-4 p-3 bg-zinc-800 rounded-full text-blue-400"
          >
            <Mic size={20} />
          </motion.button>
        </div>
      </div>

      {/* RIGHT SECTION (Icons & Profile) */}
      <div
        className={`flex items-center gap-2 md:gap-5 ${isMobileSearchActive ? "hidden md:flex" : "flex"}`}
      >
        {/* Mobile Search Button (Triggers the input) */}
        <button
          onClick={() => setIsMobileSearchActive(true)}
          className="p-2 hover:bg-zinc-800 rounded-full md:hidden transition-colors"
        >
          <Search size={24} />
        </button>

        <div className="hidden md:block relative cursor-pointer group">
          <Bell
            size={24}
            className="group-hover:text-blue-400 transition-colors"
          />
          <span className="absolute -top-1 -right-1 bg-blue-500 w-4 h-4 text-[10px] flex items-center justify-center rounded-full animate-bounce">
            2
          </span>
        </div>

        <motion.div
          whileHover={{ y: -2 }}
          className="flex items-center gap-2 cursor-pointer bg-zinc-800/50 p-1 md:pr-3 rounded-full border border-white/10 hover:border-blue-500/50 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-400 to-purple-600 flex items-center justify-center font-bold">
            M
          </div>
          <span className="text-sm font-medium hidden md:block">Mahi</span>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
