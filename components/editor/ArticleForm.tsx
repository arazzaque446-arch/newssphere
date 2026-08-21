"use client";

import { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "@/components/dashboard/ImageUpload";
import PublishButton from "@/components/dashboard/PublishButton";

interface Props {
  action: (formData: FormData) => void | Promise<void>;
  initialData?: any;
}

export default function ArticleForm({ action, initialData }: Props) {
  const [content, setContent] = useState(initialData?.content || "");
  const [isSponsored, setIsSponsored] = useState(initialData?.is_sponsored || false);

  return (
    <form action={action} className="space-y-8">
      {/* TITLE */}
      <div>
        <label className="mb-2 block font-semibold text-slate-900">Title</label>
        <input
          type="text"
          name="title"
          required
          defaultValue={initialData?.title || ""}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500"
          placeholder="Article title"
        />
      </div>

      {/* SUMMARY */}
      <div>
        <label className="mb-2 block font-semibold text-slate-900">Summary</label>
        <textarea
          name="summary"
          rows={3}
          required
          defaultValue={initialData?.summary || ""}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500"
          placeholder="Short summary of the article"
        />
      </div>

      {/* CONTENT */}
      <div>
        <label className="mb-2 block font-semibold text-slate-900">Content</label>
        <RichTextEditor content={content} onChange={setContent} />
        <input type="hidden" name="content" value={content} />
      </div>

      {/* FEATURED IMAGE */}
      <div>
        <label className="mb-2 block font-semibold text-slate-900">Featured Image</label>
        {initialData?.image_url && (
          <div className="mb-4">
            <p className="mb-2 text-sm font-semibold text-slate-600">Current Image:</p>
            <img 
              src={initialData.image_url} 
              alt="Current Featured" 
              className="h-48 w-auto rounded-xl object-cover shadow" 
            />
          </div>
        )}
        <ImageUpload />
        <p className="mt-2 text-sm text-slate-500">Upload a new image to replace the current one.</p>
      </div>

      {/* CATEGORY */}
      <div>
        <label className="mb-2 block font-semibold text-slate-900">Category</label>
        <select
          name="category"
          required
          defaultValue={initialData?.category || "Technology"}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
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

      {/* TAGS */}
      <div>
        <label className="mb-2 block font-semibold text-slate-900">Tags</label>
        <input
          type="text"
          name="tags"
          defaultValue={initialData?.tags?.join(", ") || ""}
          placeholder="Politics, Assam, Flood, India"
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
        />
        <p className="mt-2 text-sm text-slate-500">Separate tags using commas.</p>
      </div>

      {/* AUTHOR */}
      <div>
        <label className="mb-2 block font-semibold text-slate-900">Author</label>
        <input
          type="text"
          name="author"
          defaultValue={initialData?.author || "Abdur Razzaque"}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* LOCATION */}
      <div>
        <label className="mb-2 block font-semibold text-slate-900">Location</label>
        <input
          type="text"
          name="location"
          defaultValue={initialData?.location || "Guwahati, Assam"}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* SPONSORED ARTICLE */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">Sponsored Article</h2>
          <p className="mt-1 text-sm text-slate-600">
            Mark this article as sponsored content and identify the sponsor.
          </p>
        </div>

        <div className="space-y-5">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="isSponsored"
              checked={isSponsored}
              onChange={(event) => setIsSponsored(event.target.checked)}
              className="h-5 w-5 rounded border-slate-300"
            />
            <span className="font-semibold text-slate-900">This is a sponsored article</span>
          </label>

          <div>
            <label className="mb-2 block font-semibold text-slate-900">Sponsor Name</label>
            <input
              type="text"
              name="sponsorName"
              disabled={!isSponsored}
              required={isSponsored}
              defaultValue={initialData?.sponsor_name || ""}
              className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
              placeholder="Example: ABC Technologies"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-900">Sponsor Website</label>
            <input
              type="url"
              name="sponsorUrl"
              disabled={!isSponsored}
              defaultValue={initialData?.sponsor_url || ""}
              className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
              placeholder="https://example.com"
            />
          </div>

          <div className="rounded-xl border border-amber-200 bg-white p-4 text-sm leading-6 text-slate-600">
            Sponsored articles should be clearly identified to readers. Commercial relationships should not be presented as independent editorial reporting.
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="mb-5 text-xl font-bold text-slate-900">SEO</h2>
        <div className="space-y-5">
          <div>
            <label className="mb-2 block font-semibold">SEO Title</label>
            <input
              type="text"
              name="seoTitle"
              defaultValue={initialData?.seo_title || ""}
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
              placeholder="SEO title"
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold">SEO Description</label>
            <textarea
              rows={3}
              name="seoDescription"
              defaultValue={initialData?.seo_description || ""}
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
              placeholder="SEO description"
            />
          </div>
        </div>
      </div>

      {/* PUBLISHING OPTIONS */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Publishing Options</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="published"
              defaultChecked={initialData ? initialData.published : true}
              className="h-5 w-5"
            />
            <span className="font-medium">Publish Immediately</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initialData?.featured || false}
              className="h-5 w-5"
            />
            <span className="font-medium">Featured Article</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="breaking"
              defaultChecked={initialData?.breaking || false}
              className="h-5 w-5"
            />
            <span className="font-medium">Breaking News</span>
          </label>
        </div>
      </div>

      {/* SCHEDULE */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-5 text-xl font-bold text-slate-900">Schedule Publication</h2>
        <input
          type="datetime-local"
          name="publishAt"
          defaultValue={initialData?.published_at ? new Date(initialData.published_at).toISOString().slice(0, 16) : ""}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
        />
        <p className="mt-2 text-sm text-slate-500">Leave empty to publish immediately.</p>
      </div>

      {/* PUBLISH BUTTON */}
      <PublishButton />
    </form>
  );
}