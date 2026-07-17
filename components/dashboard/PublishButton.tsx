"use client";

import { useFormStatus } from "react-dom";

interface PublishButtonProps {
  text?: string;
}

export default function PublishButton({
  text = "Publish Article",
}: PublishButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full rounded-xl px-6 py-4 text-lg font-semibold text-white transition-all duration-300 ${
        pending
          ? "cursor-not-allowed bg-gray-500"
          : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] hover:shadow-xl"
      }`}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-3">
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />

            <path
              className="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          Publishing...
        </span>
      ) : (
        text
      )}
    </button>
  );
}