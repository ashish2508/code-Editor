"use client";
import useMounted from "@/hooks/useMounted";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useClerk } from "@clerk/nextjs";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import ShareSnippetDialog from "./ShareSnippetDialog";

function EditorPanel() {

  const clerk = useClerk();

  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();
  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`)
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode
    if (editor) editor.setValue(newCode);
  }, [language, editor])

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size")
    if (savedFontSize) setFontSize(Number(savedFontSize))
  }, [setFontSize])



  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  }

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", String(size));
  }
  if (!mounted) return null

  return (
    <div className="relative">
      <div className="relative bg-gray-700/[0.1] backdrop:blur rounded-xl border border-emerald-700/10 p-6">
        {/*Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-fit rounded-lg bg-gray-800/50 ring-1 ring-white">
              <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24} className="rounded-lg" />
            </div>
            <div>
              <h2 className=" font-semibold text-white text-pretty text-sm">Text Editor</h2>
              <p className="text-xs text-gray-300 font-body underline">Write your code in your way</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/*Font Size Slider */}
            <div className="flex items-center gap-3 px-3 py-2 bg-emerald-700/[0.05] rounded-lg ring-1 ring-white/5">
              <TypeIcon className="size-4 text-emerald-500 " />
              <div className="flex items-center gap-3 ">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="w-20 h-1 rounded-lg cursor-pointer accent-emerald-800/60 hover:accent-green-700"
                />
                <span className="text-sm font-medium text-emerald-400 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-inherit hover:bg-inherit/100 rounded-lg ring-1 ring-white/5  bg-gradient-to-r
               from-lime-800/30 to-lime-900/30 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="size-5 " />
            </motion.button>
            {/*Share button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsShareDialogOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r
               from-teal-800/50 to-teal-900/70 opacity-80 hover:opacity-100 transition-opacity"
            >
              <ShareIcon className="size-5 text-white" />
              <span className="text-sm font-code text-white font-semibold ">Share</span>
            </motion.button>
          </div>
        </div>
        {/*Editor */}
        <div className="relative group rounded-none overflow-hidden ring-1 ring-emerald-700/[0.05]">
          {clerk.loaded && (
            <Editor
              height="700px"
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}

              options={{
                minimap: { enabled: false },
                fontSize,
                wordWrap:"off",
                automaticLayout: true,
                scrollBeyondLastLine: true,
                padding: { top: 12 },
                renderWhitespace: "selection",
                fontFamily: '"Jet Brains Mono", "Cascadia Code", Consolas, monospace',
                fontLigatures: false,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                insertSpaces: true,
                hover: {
                  enabled: true,
                },
                folding: true,
                scrollbar: {
                  verticalScrollbarSize: 0,
                  horizontalScrollbarSize: 0,
                },
                autoClosingBrackets: 'languageDefined',
                autoIndent: "advanced",
                autoClosingQuotes: "languageDefined",
                autoSurround: "languageDefined",
                tabSize: 2,

              }} />
          )}

          {!clerk.loaded && <EditorPanelSkeleton />}
        </div>
      </div>
      {isShareDialogOpen && <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />}
    </div>
  )
}

export default EditorPanel;
