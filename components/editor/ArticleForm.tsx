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

      {/* Content */}

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

      {/* Featured Image */}

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
          <option value="Technology">Technology</option>
          <option value="Politics">Politics</option>
          <option value="Business">Business</option>
          <option value="Sports">Sports</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="India">India</option>
          <option value="World">World</option>
          <option value="Local">Local</option>
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

      {/* Publishing Options */}

      <div className="rounded-2xl border bg-slate-50 p-6">

        <h2 className="mb-4 text-xl font-bold">
          Publishing Options
        </h2>

        <div className="space-y-4">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              name="published"
              defaultChecked
              className="h-5 w-5"
            />

            <span className="font-medium">
              Publish Immediately
            </span>

          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              name="featured"
              className="h-5 w-5"
            />

            <span className="font-medium">
              Featured Article
            </span>

          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              name="breaking"
              className="h-5 w-5"
            />

            <span className="font-medium">
              Breaking News
            </span>

          </label>

        </div>

      </div>

      {/* Publish Button */}

      <PublishButton />

    </form>
  );
}