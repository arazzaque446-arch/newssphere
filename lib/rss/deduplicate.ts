export function removeDuplicateArticles(articles: any[]) {

  const seen = new Set<string>();

  return articles.filter((article) => {

    const key =
      (
        article.title +
        article.link
      )
        .toLowerCase()
        .trim();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;

  });

}