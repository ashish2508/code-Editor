import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyButton from "./CopyButton";

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const trimmedCode = code
    .split("\n") // split into lines
    .map((line) => line.trimEnd()) // remove trailing spaces from each line
    .join("\n"); // join back into a single string

  return (
    <div className="my-4 bg-stone-800/30 rounded-lg overflow-hidden border border-[#ffffff0a]">
      {/* header bar showing language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-stone-800/40 border-2 border-zinc-950/30">
        {/* language indicator with icon */}
        <div className="flex items-center gap-2">
          <img
            src={`/${language}.png`}
            alt={language}
            className="size-4 object-contain"
          />
          <span className="text-sm text-gray-400">
            {language || "plaintext"}
          </span>
        </div>
        {/* button to copy code to clipboard */}
        <CopyButton code={trimmedCode} />
      </div>

      {/* code block with syntax highlighting */}
      <div className="relative">
        <SyntaxHighlighter
          language={language || "plaintext"}
          style={atomOneDarkReasonable}
          customStyle={{
            padding: "1rem",
            margin: 0,
          }}
          background="oklch(0.444 0.011 73.639/0.3);"
          showLineNumbers={true}
          wrapLines={true} // wrap long lines
        >
          {trimmedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
