"use client";

import { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "@/components/dashboard/ImageUpload";
import PublishButton from "@/components/dashboard/PublishButton";

interface Props {
  action: (formData: FormData) => void;
}

export default function ArticleForm({ action }: Props) {
  const [content, setContent] = useState("");

  return (
    <form
      action={action}
      className="space-y-6"
    >
      {/* Title */}

      <div>
        <label className="mb-2 block font-semibold">
          Title
        </label>

        <input
          type="text"
          name="title"
          required
          className="w-full rounded-xl border p-4"
          placeholder="Article title"
        />
      </div>

      {/* Summary */}

      <div>
        <label className="mb-2 block font-semibold">
          Summary
        </label>

        <textarea
          name="summary"
          rows={3}
          required
          className="w-full rounded-xl border p-4"
          placeholder="Short summary"
        />
      </div>

      {/* Rich Text */}

      <div>
        <label className="mb-2 block font-semibold">
          Content
        </label>

        <RichTextEditor
          content={content}
          onChange={setContent}
        />

        <input
          type="hidden"
          name="content"
          value={content}
        />
      </div>

      {/* Image */}

      <div>
        <label className="mb-2 block font-semibold">
          Featured Image
        </label>

        <ImageUpload />
      </div>

      {/* Category */}

      <div>
        <label className="mb-2 block font-semibold">
          Category
        </label>

        <select
          name="category"
          required
          className="w-full rounded-xl border p-4"
        >
          <option>Technology</option>
          <option>Politics</option>
          <option>Business</option>
          <option>Sports</option>
          <option>Health</option>
          <option>Entertainment</option>
          <option>India</option>
          <option>World</option>
          <option>Local</option>
        </select>
      </div>

      {/* Author */}

      <div>
        <label className="mb-2 block font-semibold">
          Author
        </label>

        <input
          type="text"
          name="author"
          defaultValue="Abdur Razzaque"
          className="w-full rounded-xl border p-4"
        />
      </div>

      {/* Location */}

      <div>
        <label className="mb-2 block font-semibold">
          Location
        </label>

        <input
          type="text"
          name="location"
          defaultValue="Guwahati, Assam"
          className="w-full rounded-xl border p-4"
        />
      </div>

      <PublishButton />
    </form>
  );
}