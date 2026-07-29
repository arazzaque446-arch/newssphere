import Link from "next/link";

const services = [
  {
    title: "Aadhaar",
    description: "UIDAI Aadhaar Services",
    url: "https://uidai.gov.in",
    icon: "🆔",
  },
  {
    title: "PAN Card",
    description: "Income Tax PAN Services",
    url: "https://www.incometax.gov.in",
    icon: "💳",
  },
  {
    title: "Passport",
    description: "Passport Seva",
    url: "https://passportindia.gov.in",
    icon: "🛂",
  },
  {
    title: "Driving Licence",
    description: "Parivahan Services",
    url: "https://parivahan.gov.in",
    icon: "🚗",
  },
  {
    title: "Voter ID",
    description: "Election Commission of India",
    url: "https://voters.eci.gov.in",
    icon: "🗳️",
  },
  {
    title: "Assam Land Records",
    description: "Dharitree Portal",
    url: "https://dharitree.assam.gov.in",
    icon: "🏡",
  },
  {
    title: "DigiLocker",
    description: "Government Document Wallet",
    url: "https://www.digilocker.gov.in",
    icon: "📂",
  },
  {
    title: "UMANG",
    description: "Government Services App",
    url: "https://web.umang.gov.in",
    icon: "📱",
  },
];

export default function GovernmentPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Government Services
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-blue-100">
            Access important government services through their official
            websites. NewsSphere does not provide these services directly;
            these links take you to the respective government portals.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-5xl">
                {service.icon}
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                {service.title}
              </h2>

              <p className="mt-2 text-slate-600">
                {service.description}
              </p>

              <div className="mt-6 font-semibold text-blue-600">
                Visit Official Website →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}