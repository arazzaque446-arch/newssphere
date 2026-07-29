import Link from "next/link";

const jobs = [
  {
    title: "Assam Government Jobs",
    description: "Latest Assam Government Recruitment",
    url: "https://assam.gov.in",
    icon: "🏛️",
  },
  {
    title: "APSC",
    description: "Assam Public Service Commission",
    url: "https://apsc.nic.in",
    icon: "📜",
  },
  {
    title: "Assam Police",
    description: "Police Recruitment",
    url: "https://slprbassam.in",
    icon: "👮",
  },
  {
    title: "NHM Assam",
    description: "National Health Mission",
    url: "https://nhm.assam.gov.in",
    icon: "🏥",
  },
  {
    title: "DHS Assam",
    description: "Directorate of Health Services",
    url: "https://dhs.assam.gov.in",
    icon: "🩺",
  },
  {
    title: "Railway Jobs",
    description: "Railway Recruitment Board",
    url: "https://www.rrbcdg.gov.in",
    icon: "🚆",
  },
  {
    title: "SSC",
    description: "Staff Selection Commission",
    url: "https://ssc.gov.in",
    icon: "📚",
  },
  {
    title: "UPSC",
    description: "Union Public Service Commission",
    url: "https://upsc.gov.in",
    icon: "🏆",
  },
  {
    title: "IBPS",
    description: "Bank Recruitment",
    url: "https://www.ibps.in",
    icon: "🏦",
  },
  {
    title: "Indian Army",
    description: "Join Indian Army",
    url: "https://joinindianarmy.nic.in",
    icon: "🪖",
  },
  {
    title: "Indian Navy",
    description: "Join Indian Navy",
    url: "https://www.joinindiannavy.gov.in",
    icon: "⚓",
  },
  {
    title: "Indian Air Force",
    description: "Indian Air Force Careers",
    url: "https://agnipathvayu.cdac.in",
    icon: "✈️",
  },
];

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-green-700 to-emerald-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Assam & India Jobs
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-green-100">
            Find official recruitment portals for Assam Government,
            Central Government, Banking, Defence and Public Sector jobs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <Link
              key={job.title}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-5xl">
                {job.icon}
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                {job.title}
              </h2>

              <p className="mt-2 text-slate-600">
                {job.description}
              </p>

              <div className="mt-6 font-semibold text-green-700">
                Visit Official Website →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}