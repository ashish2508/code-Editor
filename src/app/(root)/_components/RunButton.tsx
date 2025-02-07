"use client";

import {
	getExecutionResult,
	useCodeEditorStore,
} from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { LoaderPinwheelIcon, Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { LoaderIcon } from "react-hot-toast";

function RunButton() {
	const { user } = useUser();
	const { runCode, language, isRunning } = useCodeEditorStore();
	const saveExecution = useMutation(api.codeExecutions.saveExecution);

	const handleRun = async () => {
		await runCode();
		const result = getExecutionResult();

		if (user && result) {
			await saveExecution({
				language,
				code: result.code,
				output: result.output || undefined,
				error: result.error || undefined,
			});
		}
	};

	return (
		<motion.button
			onClick={handleRun}
			disabled={isRunning}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className={`
        group relative inline-flex items-center gap-2.5 px-5 py-2.5
        disabled:cursor-not-allowed
        focus:outline-none
      `}
		>
			<div className="absolute inset-0 rounded-lg opacity-100 bg-emerald-500/70 w-20 h-10" />

			<div className="relative flex items-center gap-1">
				{isRunning ? (
					<>
						<div className="relative flex items-center gap-5 w-12 h-6" >
							<LoaderIcon className="size-4" />
						</div>
					</>
				) : (
					<>
						<div className="relative flex items-center justify-center w-4 h-4">
							<Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
						</div>
						<span className="text-sm font-medium text-white/90 group-hover:text-white">
							Run
						</span>
					</>
				)}
			</div>
		</motion.button>
	);
}
export default RunButton;
