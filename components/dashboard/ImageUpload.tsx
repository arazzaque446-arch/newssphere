"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [filename, setFilename] = useState("");

  function handleFile(file: File | null) {
    if (!file) return;

    setFilename(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">

      <label className="block text-lg font-semibold">
        Featured Image
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();

          const file = e.dataTransfer.files[0];

          handleFile(file);

          if (inputRef.current) {
            const dt = new DataTransfer();
            dt.items.add(file);
            inputRef.current.files = dt.files;
          }
        }}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50 p-8 text-center transition hover:border-blue-600 hover:bg-blue-100"
      >

        {preview ? (
          <div className="space-y-4">

            <Image
              src={preview}
              alt="Preview"
              width={600}
              height={350}
              className="mx-auto rounded-xl object-cover"
            />

            <p className="font-medium text-gray-700">
              {filename}
            </p>

          </div>
        ) : (
          <div className="space-y-2">

            <div className="text-6xl">
                🖼️
            </div>

            <p className="text-xl font-semibold">
              Drag & Drop Image Here
            </p>

            <p className="text-gray-500">
              or click to browse
            </p>

          </div>
        )}

      </div>

      <input
        ref={inputRef}
        type="file"
        name="image"
        accept="image/*"
        hidden
        onChange={(e) =>
          handleFile(e.target.files?.[0] || null)
        }
      />

    </div>
  );
}