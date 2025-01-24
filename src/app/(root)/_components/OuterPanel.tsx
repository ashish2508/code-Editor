"use client"
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal } from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

function OuterPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="relative bg-zinc-950/30 rounded-xl p-4 border border-emerald-600/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-stone-800/40 ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>
        {hasContent &&(
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-slate-800/40 rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all
              ${isCopied ? 'bg-stone-700':'bg-slate-800/40'}
              `}
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 " />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>
      {/*output area*/}
      <div className="relative">
        <div className="relative bg-gray-950/20 backdrop-blur-sm border border-emerald-950/20 rounded-xl p-4 h-[600px] overflow-auto font-mono text-sm">
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ?
            (
              <div className="flex items-start gap-3 text-red-400">
                <AlertTriangle className="size-5 flex-shrink-0 mt-1 pb-1.5" />
                <div className="space-y-1">
                  <div className="font-medium">Execution Error</div>
                  <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
                </div>
              </div>

            ) : output ?
              (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 mb-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Execution Successful</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl  text-emerald-600/30 bg-stone-800/50 ring-1 ring-slate-900/50 mb-4">
                    <Clock className="w-6 h-6 " />
                  </div>
                  <p className="text-center text-zinc-500 font-bold">Run your code to see the output here...</p>
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
}

export default OuterPanel;
