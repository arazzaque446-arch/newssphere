"use client";

import type { Editor } from "@tiptap/react";

interface MenuBarProps {
  editor: Editor | null;
}

export default function MenuBar({
  editor,
}: MenuBarProps) {
  if (!editor) return null;

  const button =
    "rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-blue-600 hover:text-white";

  const active =
    "bg-blue-600 text-white border-blue-600";

  return (
    <div className="mb-4 flex flex-wrap gap-2 rounded-2xl border bg-white p-4 shadow">

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${button} ${
          editor.isActive("bold") ? active : ""
        }`}
      >
        Bold
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${button} ${
          editor.isActive("italic") ? active : ""
        }`}
      >
        Italic
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${button} ${
          editor.isActive("strike") ? active : ""
        }`}
      >
        Strike
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`${button} ${
          editor.isActive("heading", { level: 1 })
            ? active
            : ""
        }`}
      >
        H1
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`${button} ${
          editor.isActive("heading", { level: 2 })
            ? active
            : ""
        }`}
      >
        H2
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        className={`${button} ${
          editor.isActive("bulletList")
            ? active
            : ""
        }`}
      >
        Bullet List
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
        className={`${button} ${
          editor.isActive("orderedList")
            ? active
            : ""
        }`}
      >
        Number List
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
        className={`${button} ${
          editor.isActive("blockquote")
            ? active
            : ""
        }`}
      >
        Quote
      </button>

      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Enter URL");

          if (!url) return;

          editor
            .chain()
            .focus()
            .setLink({ href: url })
            .run();
        }}
        className={button}
      >
        Link
      </button>

      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Image URL");

          if (!url) return;

          editor
            .chain()
            .focus()
            .setImage({ src: url })
            .run();
        }}
        className={button}
      >
        Image
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().unsetAllMarks().run()
        }
        className={button}
      >
        Clear
      </button>

    </div>
  );
}