import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "./textEditor.css";
import { useAuth } from "@/utils/functions";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({
  placeholder,
  className,
  content = "",
  editor,
  setContent = () => {},
}) => {
  const { auth } = useAuth();
  const [localEditor, setLocalEditor] = useState(null);
  
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      uploader: {
        insertImageAsBase64URI: false,
        url: `${process.env.NEXT_PUBLIC_BASE_API}/file/upload-files`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        paramName: "files",
        process: function (response) {
          if (response?.data?.files) {
            return {
              files: response.data.files.map(file => 
                `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/${file?.url}`
              ),
              path: process.env.NEXT_PUBLIC_IMAGE_API_URL,
              baseurl: process.env.NEXT_PUBLIC_IMAGE_API_URL,
              error: null,
              msg: "Image upload successful",
            };
          }
          throw new Error("Image upload failed");
        },
        defaultHandlerSuccess: function (data) {
          data.files?.forEach(imageUrl => {
            const imageTag = `<img src="${imageUrl}" crossOrigin="anonymous" style="max-height: 500px"/>`;
            this.s?.insertHTML(imageTag);
          });
        },
      },
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      buttons: "bold,italic,underline,strikethrough,ul,fontsize,paragraph,image,hr,table,link,indent,outdent,left,brush,undo,redo",
    }),
    [auth?.accessToken]
  );

  useEffect(() => {
    if (editor?.current) {
      setLocalEditor(editor.current);
    }
    return () => {
      if (localEditor) {
        localEditor.destruct();
        setLocalEditor(null);
      }
    };
  }, [editor]);

  return (
    <JoditEditor
      className={`jodit-editor ${className}`}
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onChange={newContent => {
        if (editor?.current) {
          setContent(newContent);
        }
      }}
    />
  );
};

export default TextEditor;