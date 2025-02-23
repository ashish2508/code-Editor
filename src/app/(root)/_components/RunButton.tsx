"use client";

import {
  getExecutionResult,
  useCodeEditorStore,
} from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

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
focus:outline-none
disabled:cursor-not-allowed
`}
    >
      <div className="w-15 absolute inset-0 h-10 rounded-lg bg-zinc-700/70 opacity-50" />

      <div className="relative flex items-center gap-1">
        {isRunning ? (
          <>
            <span className="text-stone-400">Executing</span>
          </>
        ) : (
          <>
            <div className="relative flex h-4 w-4 items-center justify-center">
              <Play className="h-4 w-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
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
