import Image from "next/image";
import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
  Star,
  Flame,
} from "lucide-react";

import { Article } from "@/types/article";

interface Props {
  article: Article;
}

export default function ArticleRow({
  article,
}: Props) {
  return (
    <tr className="border-b hover:bg-slate-50 transition">

      <td className="p-4">

      <Image
  src={article.image_url}
  alt={article.title}
  width={120}
  height={80}
  style={{
    width: "120px",
    height: "auto",
  }}
  className="rounded-lg"
/>

      </td>

      <td>

        <div className="space-y-2">

          <h3 className="font-semibold">

            {article.title}

          </h3>

          <div className="flex gap-2 flex-wrap">

            {article.featured && (

              <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">

                <Star size={13}/>

                Featured

              </span>

            )}

            {article.breaking && (

              <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">

                <Flame size={13}/>

                Breaking

              </span>

            )}

          </div>

        </div>

      </td>

      <td>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">

          {article.category}

        </span>

      </td>

      <td>

        {article.published ? (

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

            Published

          </span>

        ) : (

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">

            Draft

          </span>

        )}

      </td>

      <td>

        <div className="flex items-center gap-2 text-slate-600">

          <Eye size={16}/>

          {article.views}

        </div>

      </td>

      <td>

        <div className="flex gap-2">

          <Link
            href={`/admin/edit/${article.id}`}
            className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
          >

            <Pencil size={16}/>

          </Link>

          <button
            className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
          >

            <Trash2 size={16}/>

          </button>

        </div>

      </td>

    </tr>
  );
}