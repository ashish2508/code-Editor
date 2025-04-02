import { Check } from "lucide-react";

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
	<div className="flex items-start gap-3 group">
		<div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-stone-700/90 flex items-center justify-center border border-slate-500/20 group-hover:border-stone-600/70 group-hover:bg-stone-600/90 transition-colors">
			<Check className="w-3 h-3 text-green-400" />
		</div>
		<span className="text-gray-400 group-hover:text-gray-300 transition-colors ">
			{children}
		</span>
	</div>
);

export default FeatureItem;
