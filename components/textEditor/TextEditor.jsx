"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import './textEditor.css';

// Dynamically import JoditEditor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({ placeholder, className }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      uploader: {
        insertImageAsBase64URI: true,
      },
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      disablePlugins:
        "ai-assistant,about,spellcheck,symbols,sticky,video,print,preview,powered-by-jodit,paste",
      buttons:
        "bold,italic,underline,strikethrough,ul,fontsize,paragraph,image,hr,table,link,indent,outdent,left,brush,undo,redo",
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      className={`jodit-editor ${className}`}
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => console.log(newContent)}
    />
  );
};

export default TextEditor;
