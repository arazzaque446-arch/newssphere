const categories: Record<string,string> = {
  tech: "Technology",
  technology: "Technology",

  sport: "Sports",
  sports: "Sports",

  politics: "Politics",
  political: "Politics",

  world: "World",

  india: "India",

  business: "Business",

  health: "Health",

  entertainment: "Entertainment",

  science: "Science",
};


export function normalizeCategory(
  value:string
) {

  const key=value
    .toLowerCase()
    .trim();

  return (
    categories[key] ||
    "General"
  );
}