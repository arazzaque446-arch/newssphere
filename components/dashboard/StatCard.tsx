"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Newspaper,
  Star,
  FolderOpen,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: "file" | "news" | "star" | "folder";
  color: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  const icons = {
    file: FileText,
    news: Newspaper,
    star: Star,
    folder: FolderOpen,
  };

  const Icon = icons[icon];

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl bg-white p-6 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div className={`rounded-2xl p-5 text-white ${color}`}>
          <Icon size={34} />
        </div>
      </div>
    </motion.div>
  );
}