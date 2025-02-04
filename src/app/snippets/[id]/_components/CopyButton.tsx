"use client";

import { ClipboardCopy, LucideClipboardCheck } from "lucide-react";
import { useState } from "react";

function CopyButton({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<button
			onClick={copyToClipboard}
			type="button"
			className="p-2 hover:bg-white/10 hover:text-slate-500 rounded-lg transition-all duration-200 group relative text-background"
		>
			{copied ? (
				<LucideClipboardCheck className="size-5 text-emerald-400" />
			) : (
				<ClipboardCopy className=" size-5 text-slate-400 group-hover:text-gray-300" />
			)}
		</button>
	);
}

export default CopyButton;
