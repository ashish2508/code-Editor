'use client';

import { useCallback, useEffect } from 'react';
import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

function RunButton() {
 const { user } = useUser();
 const { runCode, language, isRunning } = useCodeEditorStore();
 const saveExecution = useMutation(api.codeExecutions.saveExecution);

const handleRun = useCallback(async () => {
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
}, [runCode, saveExecution, user, language]);

const keyboardRunHandler = useCallback(
  (event: KeyboardEvent) => {
    if (event.altKey && event.code === "KeyR" && !isRunning) {
      event.preventDefault();
      handleRun();
    }
  },
  [handleRun, isRunning] // isRunning to prevent duplicate executions
);

useEffect(() => {
  window.addEventListener("keydown", keyboardRunHandler);
  return () => window.removeEventListener("keydown", keyboardRunHandler);
}, [keyboardRunHandler]);
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
       w-18 h-[2.9rem]
     `}
   >
     <div className="absolute inset-0 bg-green-500 rounded-full opacity-100 border border-cyan-950/30 transition-all duration-200"/>
     <div className="relative flex items-center gap-2">
       {isRunning ? (
         <>
           <div className="relative">
             <Loader2 className="w-4 h-4 animate-spin text-white/70" />
             <div className="absolute inset-0 blur animate-pulse" />
           </div>
           <span className="text-sm font-medium text-white/90">Executing...</span>
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
