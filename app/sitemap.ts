import type { MetadataRoute } from "next";

const baseUrl = "https://newssphere-beta.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/latest`,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/government`,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jobs`,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/ai-disclosure`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/advertise`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}