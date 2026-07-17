"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";

import MenuBar from "./MenuBar";

interface RichTextEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Placeholder.configure({
        placeholder:
          "Write your professional NewsSphere article here...",
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
      }),

      Image,
    ],

    content,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[500px] rounded-b-2xl border border-t-0 bg-white p-6 focus:outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">

      <MenuBar editor={editor} />

      <EditorContent editor={editor} />

    </div>
  );
}