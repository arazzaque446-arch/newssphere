export function cleanArticle(html: string): string {
  if (!html) return "";

  return html
    // Remove fake AI-generated links but keep the text
    .replace(/<a[^>]*href="http:\/\/[^"]*"[^>]*>(.*?)<\/a>/gi, "$1")

    // Remove javascript links
    .replace(/href="javascript:[^"]*"/gi, "")

    // Remove inline styles
    .replace(/\sstyle="[^"]*"/gi, "")

    // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/gi, "")

    // Remove empty spans
    .replace(/<span>\s*<\/span>/gi, "")

    // Remove all span tags but keep content
    .replace(/<\/?span[^>]*>/gi, "")

    // Collapse multiple blank lines
    .replace(/\n\s*\n/g, "\n")

    .trim();
}