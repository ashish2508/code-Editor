"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";
import NavigationHeader from "@/components/NavigationHeader";

function SnippetsPage() {
	const snippets = useQuery(api.snippets.getSnippets);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
	const [view, setView] = useState<"grid" | "list">("grid");

//loading state
if(snippets===undefined) {
  return (
    <div className="min-h-screen">
<SnippetsPageSkeleton />
<NavigationHeader />
    </div>
  )
}
	return (
		<div className="min-h-screen bg-gradient-to-b from-stone-700/30 to-zinc-900/40 text-gray-100 flex flex-col scrollbar-normal">
<NavigationHeader />
<div className="relative max-w-7xl mx-auto px-4 py-12">

</div>

    </div>
	);
}

export default SnippetsPage;
//3:36:47
