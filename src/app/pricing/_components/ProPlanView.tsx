import NavigationHeader from "@/components/NavigationHeader";
import { Command, Star } from "lucide-react";
import Link from "next/link";

function ProPlanView() {
	return (
		<div className=" bg-stone-900/30">
			<NavigationHeader />
			<div className="relative px-4 h-[80vh] flex items-center justify-center">
				<div className="relative max-w-xl mx-auto text-center">
					<div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" />
					<div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
					<div className="absolute -inset-0.5 bg-gradient-to-r from-stone-700/30 to-zinc-500/30 blur-2xl opacity-10" />

					<div className="relative bg-stone-800/90 border border-gray-800/50 backdrop-blur-2xl rounded-2xl p-12">
						<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl" />

						<div className="relative">
							<div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 mb-6 ring-1 ring-gray-800/60">
								<Star className="w-8 h-8 text-lime-400" />
							</div>

							<h1 className="text-3xl font-semibold text-gray-300 mb-3">
								Pro Plan is Active
							</h1>
							<p className="text-gray-400/60 mb-8 text-lg">
								Try out the newly unlocked multiple Languages
							</p>

							<Link
								href="/"
								className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-gradient-to-r from-stone-200/10 to-zinc-500/10 hover:from-stone-200/20 hover:to-zinc-500/20 text-white rounded-xl transition-all duration-200 border border-gray-800 hover:border-stone-500/50 group"
							>
								<Command className="w-5 h-5 text-lime-400" />
								<span>Open Editor</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ProPlanView;
