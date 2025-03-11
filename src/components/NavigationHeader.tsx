import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/50  bg-stone-700/30 backdrop-blur-xl backdrop-saturate-150">
      <div className="absolute inset-0  bg-stone-700/30" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}

            <Link href="/" className="flex items-center gap-3 group relative">
              <div className="relative">
                {/* For font-body check tailwind config */}
                <span className="block text-lg font-extrabold text-amber-500 font-body">
                  Type__dd
                </span>
                <span className="block text-xs text-pink-400/80 font-bold">
                  Simply type it
                </span>
              </div>
            </Link>

            {/* snippets Link */}
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
                 transition-colors font-body "
              >
                Snippets
              </span>
            </Link>
          </div>

          {/* right section */}
          <div className="flex items-center gap-4">
            <SignedOut>
              {" "}
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-slate-400/40 hover:border-zinc-500/90 bg-red-900/40
              hover:bg-rose-600/70
                transition-all duration-300"
              >
                <span className="text-sm  text-white font-body">PRO</span>
              </Link>
            </SignedOut>

            {/* profile button */}
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
