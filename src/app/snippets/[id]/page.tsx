"use client";

import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import NavigationHeader from "@/components/NavigationHeader";
import { Editor } from "@monaco-editor/react";
import { useQuery } from "convex/react";
import { Clock, Code, MessageSquare, User } from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import CopyButton from "./_components/CopyButton";
import Comments from "./_components/Comments";

function SnippetDetailPage() {
	const snippetId = useParams().id;

	const snippet = useQuery(api.snippets.getSnippetById, {
		snippetId: snippetId as Id<"snippets">,
	});
	const comments = useQuery(api.snippets.getComments, {
		snippetId: snippetId as Id<"snippets">,
	});

	if (snippet === undefined) return <SnippetLoadingSkeleton />;

	return (
		<div className="min-h-screen bg-gradient-to-r from-stone-800/10 to-stone-900">
			<NavigationHeader />

			<main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
				<div className="max-w-[1200px] mx-auto">
					{/* Header */}
					<div className="bg-stone-500/10 border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center size-12 p-2.5">
									<img
										src={`/${snippet.language}.png`}
										alt={`${snippet.language} logo`}
										className="w-full h-full object-contain"
									/>
								</div>
								<div className="font-code">
									<h1 className="text-xl sm:text-2xl font-code text-white mb-2">
										{snippet.title.toUpperCase()}{" "}
									</h1>
									<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
										<div className="flex items-center gap-2 text-[#8b8b8d]">
											<User className="w-4 h-4" />
											<span>{snippet.userName.toUpperCase()}</span>
										</div>
										<div className="flex items-center gap-2 text-[#8b8b8d]">
											<Clock className="w-4 h-4" />
											<span>
												{new Date(snippet._creationTime).toLocaleDateString()}
											</span>
										</div>
										<div className="flex items-center gap-2 text-[#8b8b8d]">
											<MessageSquare className="w-4 h-4" />
											<span>{comments?.length} comments</span>
										</div>
									</div>
								</div>
							</div>
							<div className="inline-flex items-center px-3 py-1.5 bg-[#ffffff08] text-[#808086] rounded-lg text-sm font-medium">
								{snippet.language.toUpperCase()}
							</div>
						</div>
					</div>

					{/* Code Editor */}
					<div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-gray-950/30">
						<div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
							<div className="flex items-center gap-2 text-white/60">
								<Code className="size-6" />
								<span className="text-lg font-medium">Source Code</span>
							</div>
							<CopyButton code={snippet.code} />
						</div>
						<Editor
							height="600px"
							language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
							value={'\n'+snippet.code+'\n'}
							theme="dracula"
							beforeMount={defineMonacoThemes}
							options={{
								minimap: { enabled: false },
								fontSize: 16,
								readOnly: true,
								automaticLayout: true,
								scrollBeyondLastLine: false,
								padding: { top: 16 },
								renderWhitespace: "selection",
								fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
								fontLigatures: false,
                smoothScrolling: true,
                cursorBlinking: "phase",
                scrollbar: {
                  verticalScrollbarSize: 4,
                  horizontalScrollbarSize: 4,
                },
							}}
						/>
					</div>

					<Comments snippetId={snippet._id} />
				</div>
			</main>
		</div>
	);
}
export default SnippetDetailPage;
