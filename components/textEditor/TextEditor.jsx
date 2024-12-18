"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import './textEditor.css'
const TextEditor = ({ placeholder, className }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Add useEffect to ensure that the editor component only runs client-side
  useEffect(() => {
    // This will run only on the client side
    if (typeof window !== "undefined") {
      // Your logic that requires access to `window` or `self`
    }
  }, []); // Empty dependency array to run only on mount

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
      onChange={(newContent) => {console.log(newContent)}}
    />
  );
};

export default TextEditor;
