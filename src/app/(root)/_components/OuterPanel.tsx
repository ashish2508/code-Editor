"use client"

import { useCodeEditorStore } from "@/store/useCodeEditorStore"

function OuterPanel() {
  useCodeEditorStore();
  return (
    <div>OuterPanel</div>
  )
}

export default OuterPanel

