"use client";

import NavigationHeader from "@/components/NavigationHeader";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Grid,
  Layers2Icon,
  Search,
  Tag,
  X,
} from "lucide-react";
import SnippetCard from "./_components/SnippetCard";
function SnippetsPage() {
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  //loading state
  if (snippets === undefined) {
    return (
      <div className="min-h-screen">
        <SnippetsPageSkeleton />
        <NavigationHeader />
      </div>
    );
  }
  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.includes(searchQuery) ||
      snippet.language.includes(searchQuery) ||
      snippet.userName.includes(searchQuery);

    const matchesLanguage =
      !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-700/30 to-zinc-900/40 text-gray-100 flex flex-col scrollbar-normal">
      <NavigationHeader />
      <div className="relative max-w-7xl mx-auto px-4 py-12 ">
        {/* Hero Section or the home page*/}
        <div className="text-center max-w-3xl mx-auto mb-16 shadow-inner shadow-lime-800/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-950/20 text-sm text-gray-400 mb-6 pointer-events-none"
          >
            <BookOpen className="size-4" />
            Shared Snippets Library
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-teal-400/80 to-teal-500/80 text-transparent bg-clip-text mb-6"
          >
            Discover and share Snippets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-medium  bg-gradient-to-r from-green-400/80 to-green-500/80 text-transparent bg-clip-text mb-12"
          >
            Find and share code snippets, scripts, or commands to help you with
            your development tasks.
          </motion.p>
        </div>
        {/*Filters Section*/}
        <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
          {/*Search */}
          <div className="relative group">
            <div className="absolute inset-0" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 size-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Snippets by title, language, or owner..."
                className="w-full pl-12 pr-4 py-4 bg-zinc-900/40 hover:bg-zinc-800 text-white
                  rounded-xl border border-blue-900/40 hover:border-[#414155] transition-all duration-200
                  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-950/30"
              />
            </div>
          </div>
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-stone-600/40 rounded-lg ring-1 ring-gray-800">
              <Tag className="size-4 text-gray-400" />
              <span className="text-sm text-gray-500">Languages:</span>
            </div>

            {popularLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() =>
                  setSelectedLanguage(lang === selectedLanguage ? null : lang)
                }
                className={`
                    group relative px-3 py-1.5 rounded-lg transition-all duration-200
                    ${
                      selectedLanguage === lang
                        ? "text-gray-600 bg-stone-500/10 ring-2 ring-teal-700/50"
                        : "text-gray-400 hover:text-gray-300 bg-zinc-700 hover:bg-zinc-800 ring-1 ring-gray-800"
                    }
                  `}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={`/${lang}.png`}
                    alt={lang}
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-sm">{lang}</span>
                </div>
              </button>
            ))}

            {selectedLanguage && (
              <button
                onClick={() => setSelectedLanguage(null)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}

            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {filteredSnippets.length} snippets found
              </span>
              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-stone-700 rounded-lg ring-1 ring-gray-800">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-md transition-all ${
                    view === "grid"
                      ? "bg-stone-500/20 text-emerald-500/70"
                      : "text-emerald-500/60 hover:text-emerald-500/70 hover:bg-stone-600"
                  }`}
                >
                  <Grid className="size-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-md transition-all ${
                    view === "list"
                      ? "bg-stone-500/20 text-emerald-500/70"
                      : "text-emerald-500/60 hover:text-emerald-500/70 hover:bg-stone-600"
                  }`}
                >
                  <Layers2Icon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Snippets Grid */}
        <motion.div
          className={`grid gap-6 ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* edge case: empty state */}
        {filteredSnippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-md mx-auto mt-20 p-8 rounded-2xl overflow-hidden"
          >
            <div className="text-center">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br
                from-blue-500/10 to-purple-500/10 ring-1 ring-white/10 mb-6"
              >
                <Code className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                No snippets found
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery || selectedLanguage
                  ? "Try adjusting your search query or filters"
                  : "Be the first to share a code snippet with the community"}
              </p>

              {(searchQuery || selectedLanguage) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLanguage(null);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-700 text-gray-300 hover:text-white rounded-lg
                    transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SnippetsPage;
