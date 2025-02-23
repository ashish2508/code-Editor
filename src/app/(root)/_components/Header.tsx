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
        className="mb-4 flex items-center justify-center
rounded-lg bg-stone-700/30 p-6 backdrop-blur-xl lg:justify-between"
      >
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/" className="group relative flex items-center gap-3">
            <div className="flex flex-col">
              {/* For font-body check tailwind config */}
              <span className="block font-body text-lg font-extrabold text-amber-500">
                Type__dd
              </span>
              <span className="block text-xs font-bold text-pink-400/80">
                Simply type it
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <Link
              href="/snippets"
              className="duration-400 group relative flex items-center gap-2 overflow-hidden rounded-lg border border-slate-800/50 bg-stone-600/80 px-4 py-1.5 text-gray-300 shadow-lg backdrop-blur transition-colors hover:border-zinc-500 hover:bg-stone-900"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-slate-900/10
to-purple-800/10 opacity-0 transition-opacity group-hover:opacity-100"
              />
              <span
                className="relative z-10 font-body text-sm
transition-colors group-hover:text-white"
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
              className="flex items-center gap-2 rounded-lg border border-slate-400/40 bg-fuchsia-600/40 px-4 py-1.5 transition-all
duration-300
hover:border-zinc-500/90 hover:bg-purple-600/70"
            >
              <span className="font-body text-sm text-white">PRO</span>
            </Link>
          )}
          <SignedIn>
            <RunButton />
          </SignedIn>
          <div className="pl-3">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
