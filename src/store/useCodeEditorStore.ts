import { Monaco } from "@monaco-editor/react";
import { create } from "zustand";

import { CodeEditorState } from "./../types/index";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
const DEFAULT = {
  language: "javascript",
  theme: "vs-dark",
  fontSize: 16
}
const getInitialState = () => {
  // Check for server-side rendering
  if (typeof window === "undefined") {
    return {
      language: DEFAULT.language,
      fontSize: DEFAULT.fontSize,
      theme: DEFAULT.theme,
    }
  }

  // Retrieve saved language from localStorage or use default
  const savedLanguage = localStorage.getItem("editor-language") || DEFAULT.language;
  const savedTheme = localStorage.getItem("editor-theme") || DEFAULT.theme;
  const savedFontSize = localStorage.getItem("editor-font-size") || DEFAULT.fontSize;
  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  }

}
export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();
  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => {
      const editor = get()?.editor;
      if (editor) {
        return editor.getValue();
      }
      return "";
    },
    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language || DEFAULT.language}`);
      if (savedCode) {
        editor.setValue(savedCode);
      }
      set({ editor });
    },
    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },
    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", String(fontSize));
      set({ fontSize });
    },
    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }
      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null });
    },
    runCode: async () => {
      const {language,getCode} =get()
      const code=getCode()
      if(!code){
        set({error: "Please Enter Some Code"})
        return;
      }
      set({isRunning:true, error:null, output:""})
      try {
const runtime=LANGUAGE_CONFIG[language].pistonRuntime
const repsonse=await fetch("https://emkc.org/api/v2/piston/execute",{
  method: "POST",
  headers:{
    "Content-type":"application/json",
  },
  body: JSON.stringify({
    language: runtime.language,
    version: runtime.version,
    files:[{content:code}]
  })
})

const data= await repsonse.json();
console.log("from piston",data)

//interpreted errors?
if(data.message){
set({error: data.message, executionResult: {code,output:"",error:data.message}})
return
}
//compilation errors
  if(data.compile && data.compile.code!==0){
    const error =data.complile.stderr || data.compile.output;
    set({
      error,
      executionResult:{
        code,
        output:"",
        error
      }
    })
    return
  }
//run time errors
if(data.run && data.run.code !==0){
    const error = data.run.stderr || data.run.output;
		set({
			error,
			executionResult: {
				code,
				output: "",
				error,
			},
		});
		return;
}
//No errors found <->

      } catch (error) {

      }
    },
  };
});
