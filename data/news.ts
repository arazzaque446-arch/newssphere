import type { Article, CategoryCard } from "@/types/news";

export const breakingHeadlines: string[] = [
  "Parliament passes landmark digital privacy bill with bipartisan support",
  "Monsoon advances across Kerala; IMD issues orange alert for coastal districts",
  "Global markets rally as central banks signal coordinated rate pause",
  "India's cricket team secures historic Test series win in England",
];

export const articles: Article[] = [
  {
    id: "1",
    title:
      "Inside India's Green Energy Revolution: How Solar Farms Are Transforming Rural Economies",
    excerpt:
      "From Rajasthan's Thar Desert to Tamil Nadu's coastal plains, massive solar installations are creating jobs, stabilizing grids, and reshaping how villages access power for the first time.",
    category: "India",
    author: "Priya Sharma",
    publishedAt: "2026-07-06T08:30:00Z",
    readTime: 8,
    imageUrl: "/images/solar-energy.svg",
    imageAlt: "Solar panels stretching across a rural landscape at sunset",
    featured: true,
    trending: true,
  },
  {
    id: "2",
    title:
      "Supreme Court Ruling Sets New Precedent on Digital Free Speech Boundaries",
    excerpt:
      "In a unanimous decision, the court clarified how intermediary platforms must handle user-generated content while protecting constitutional rights in the digital age.",
    category: "Politics",
    author: "Arjun Mehta",
    publishedAt: "2026-07-06T07:15:00Z",
    readTime: 6,
    imageUrl: "/images/supreme-court.svg",
    imageAlt: "Supreme court building with columns",
    trending: true,
    breaking: true,
  },
  {
    id: "3",
    title:
      "Bangalore Metro Phase 3 Opens, Connecting Tech Corridors to City Center",
    excerpt:
      "The new 42-kilometer line cuts commute times by half for thousands of IT professionals and is expected to reduce peak-hour traffic by 18% within six months.",
    category: "Local",
    author: "Kavya Reddy",
    publishedAt: "2026-07-06T06:45:00Z",
    readTime: 4,
    imageUrl: "/images/metro-train.svg",
    imageAlt: "Modern metro train arriving at a station",
    trending: true,
  },
  {
    id: "4",
    title:
      "AI Chip Shortage Eases as Global Foundries Expand Production Capacity",
    excerpt:
      "Semiconductor manufacturers report a 30% increase in output, signaling relief for smartphone makers and data center operators facing prolonged supply constraints.",
    category: "Technology",
    author: "Rohan Patel",
    publishedAt: "2026-07-06T05:20:00Z",
    readTime: 5,
    imageUrl: "/images/computer-chip.svg",
    imageAlt: "Close-up of a computer chip on a circuit board",
    trending: true,
  },
  {
    id: "5",
    title:
      "UN Climate Summit Reaches Breakthrough Agreement on Carbon Border Tax",
    excerpt:
      "After two weeks of negotiations, 140 nations agreed on a framework to price imported goods based on their carbon footprint, a move analysts call transformative for trade policy.",
    category: "World",
    author: "Elena Vasquez",
    publishedAt: "2026-07-05T22:10:00Z",
    readTime: 7,
    imageUrl: "/images/climate-summit.svg",
    imageAlt: "Delegates at an international climate conference",
    breaking: true,
  },
  {
    id: "6",
    title:
      "RBI Holds Repo Rate Steady, Signals Cautious Optimism on Inflation",
    excerpt:
      "The central bank kept its key lending rate unchanged at 6.5%, citing moderating food prices while warning of global headwinds from energy markets.",
    category: "Business",
    author: "Sanjay Gupta",
    publishedAt: "2026-07-05T18:30:00Z",
    readTime: 4,
    imageUrl: "/images/stock-market.svg",
    imageAlt: "Stock market charts on multiple screens",
  },
  {
    id: "7",
    title:
      "Indian Women's Hockey Team Clinches Bronze at World Championship",
    excerpt:
      "A dramatic penalty shootout victory over Germany marks the team's best finish in tournament history and sparks celebrations across the country.",
    category: "Sports",
    author: "Meera Iyer",
    publishedAt: "2026-07-05T16:00:00Z",
    readTime: 3,
    imageUrl: "/images/hockey.svg",
    imageAlt: "Field hockey players celebrating a goal",
    trending: true,
  },
  {
    id: "8",
    title:
      "Breakthrough Gene Therapy Shows Promise in Treating Rare Blood Disorders",
    excerpt:
      "Clinical trials at AIIMS Delhi report a 78% remission rate among patients with sickle cell disease, offering hope for thousands of families nationwide.",
    category: "Health",
    author: "Dr. Ananya Bose",
    publishedAt: "2026-07-05T14:20:00Z",
    readTime: 6,
    imageUrl: "/images/medical-lab.svg",
    imageAlt: "Medical researcher working in a laboratory",
  },
  {
    id: "9",
    title:
      "Bollywood's Biggest Blockbuster of 2026 Crosses ₹800 Crore Worldwide",
    excerpt:
      "The historical epic has shattered opening-weekend records in 47 countries, becoming the highest-grossing Indian film ever in overseas markets.",
    category: "Entertainment",
    author: "Vikram Singh",
    publishedAt: "2026-07-05T11:45:00Z",
    readTime: 3,
    imageUrl: "/images/cinema.svg",
    imageAlt: "Cinema auditorium with red seats",
  },
  {
    id: "10",
    title:
      "Jaipur Literature Festival Announces Star-Studded 2026 Lineup",
    excerpt:
      "Nobel laureates, Pulitzer winners, and India's most celebrated authors will converge at Diggi Palace for five days of readings, debates, and workshops.",
    category: "Events",
    author: "Neha Kapoor",
    publishedAt: "2026-07-05T09:00:00Z",
    readTime: 4,
    imageUrl: "/images/literature-festival.svg",
    imageAlt: "Author speaking at a literary festival stage",
  },
  {
    id: "11",
    title:
      "Mumbai Coastal Road Project Nears Completion, Set to Ease South Mumbai Traffic",
    excerpt:
      "The 29-kilometer expressway will reduce travel time between Marine Drive and the western suburbs by up to 40 minutes during peak hours.",
    category: "Local",
    author: "Rahul Desai",
    publishedAt: "2026-07-04T20:30:00Z",
    readTime: 5,
    imageUrl: "/images/coastal-highway.svg",
    imageAlt: "Aerial view of a coastal city highway",
  },
  {
    id: "12",
    title:
      "SpaceX and ISRO Announce Joint Mission to Study Lunar South Pole",
    excerpt:
      "The collaborative venture will launch a dual-satellite observatory in 2028 to map water ice deposits and analyze regolith composition.",
    category: "Technology",
    author: "Aisha Khan",
    publishedAt: "2026-07-04T17:15:00Z",
    readTime: 5,
    imageUrl: "/images/rocket-launch.svg",
    imageAlt: "Rocket launch against a night sky",
  },
];

export const categoryCards: CategoryCard[] = [
  {
    category: "Politics",
    description: "Policy, elections, and governance",
    articleCount: 142,
    imageUrl: "/images/cat-politics.svg",
  },
  {
    category: "Business",
    description: "Markets, startups, and economy",
    articleCount: 198,
    imageUrl: "/images/cat-business.svg",
  },
  {
    category: "Technology",
    description: "Innovation, AI, and digital life",
    articleCount: 256,
    imageUrl: "/images/cat-technology.svg",
  },
  {
    category: "Sports",
    description: "Cricket, Olympics, and more",
    articleCount: 187,
    imageUrl: "/images/cat-sports.svg",
  },
  {
    category: "Health",
    description: "Wellness, medicine, and research",
    articleCount: 94,
    imageUrl: "/images/cat-health.svg",
  },
  {
    category: "Entertainment",
    description: "Film, music, and culture",
    articleCount: 163,
    imageUrl: "/images/cat-entertainment.svg",
  },
];

export function getFeaturedArticle(): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getLatestArticles(limit = 6): Article[] {
  return [...articles]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}

export function getTrendingArticles(limit = 5): Article[] {
  return articles.filter((a) => a.trending).slice(0, limit);
}

export function getHeroArticles(): Article[] {
  return articles.slice(0, 3);
}
