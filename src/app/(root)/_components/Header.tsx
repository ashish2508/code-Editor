import { currentUser } from "@clerk/nextjs/server";
import { ConvexClient } from "convex/browser";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";

async function Header() {
  const convex = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
		<div className="relative z-10">
			<div
				className="flex items-center lg:justify-between justify-center
        bg-stone-700/30 backdrop-blur-xl p-6 mb-4 rounded-lg"
			>
				<div className="hidden lg:flex items-center gap-8">
					<Link href="/" className="flex items-center gap-3 group relative">
						<div className="flex flex-col">
							{/* For font-body check tailwind config */}
							<span className="block text-lg font-extrabold text-amber-500 font-body">
								Type__dd
							</span>
							<span className="block text-xs text-pink-400/80 font-bold">
								Simply type it
							</span>
						</div>
					</Link>

					{/* Navigation */}
					<nav className="flex items-center space-x-1">
						<Link
							href="/snippets"
							className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-stone-600/80 hover:bg-stone-900 backdrop-blur border border-slate-800/50 hover:border-zinc-500 shadow-lg overflow-hidden transition-colors duration-400"
						>
							<div
								className="absolute inset-0 bg-gradient-to-r from-slate-900/10
                to-purple-800/10 opacity-0 group-hover:opacity-100 transition-opacity"
							/>
							<span
								className="text-sm  relative z-10 group-hover:text-white
                 transition-colors font-body"
							>
								Snippets
							</span>
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center gap-3">
						<ThemeSelector />
						<LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
					</div>

					{!convexUser?.isPro && (
						<Link
							href="/pricing"
							className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-slate-400/40 hover:border-zinc-500/90 bg-red-900/40
              hover:bg-rose-600/70
                transition-all duration-300"
						>
							<span className="text-sm  text-white font-body">PRO</span>
						</Link>
					)}
					<SignedIn>
						<RunButton />
					</SignedIn>

					<div className="pl-3 ">
						<HeaderProfileBtn />
					</div>
				</div>
			</div>
		</div>
	);
}
export default Header;
