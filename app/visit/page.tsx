import { MapPin, Clock, Car, Plane, Bus, Hotel, CalendarDays, Sun } from "lucide-react";

const travelTips = [
  {
    icon: Car,
    title: "By Private Car",
    desc: "Take the STAR Tollway from Manila. Exit at Lipa/Taal and follow signs to the town proper. Approx. 2–2.5 hrs from Metro Manila.",
  },
  {
    icon: Bus,
    title: "By Bus",
    desc: "Take a JAC Liner or DLTB bus from Cubao or Buendia to Lemery, Batangas. From Lemery, ride a tricycle or jeepney to Taal town proper.",
  },
  {
    icon: Plane,
    title: "From Batangas City",
    desc: "Taal is about 25 km from Batangas City. Hire a tricycle or grab a local jeepney heading toward Lemery.",
  },
];

const practicalInfo = [
  {
    icon: Clock,
    title: "Best Time to Visit",
    desc: "November to May — cooler and dry. Avoid peak summer (April–May) to beat the crowds.",
  },
  {
    icon: Sun,
    title: "Day Trips",
    desc: "Taal is best done as a half-day or full-day trip. Most ancestral houses and the Basilica are walkable.",
  },
  {
    icon: Hotel,
    title: "Where to Stay",
    desc: "Several ancestral casa accommodations are available within the heritage zone. Book ahead during festivals.",
  },
  {
    icon: CalendarDays,
    title: "Festivals",
    desc: "Don't miss the Pista ng Bayan in January and the Flores de Mayo in May — vibrant local celebrations.",
  },
];

export default function VisitPage() {
  return (
    <main className="min-h-screen pt-[72px] pb-24 bg-white text-ink font-sans">
      {/* Full-width header touching the left and right grid lines */}
      <header
        className="relative overflow-hidden mb-16 min-h-[280px] flex items-end text-white border-b border-hairline"
        style={{ marginLeft: "72px", marginRight: "72px" }}
      >
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop"
            alt="Plan Your Visit to Taal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 px-10 pb-10">
          <div>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-[10px] uppercase tracking-wider px-3 py-1 rounded-full text-white border border-white/20 mb-3">
              Travel Guide
            </span>
            <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight leading-tight text-white">
              Plan Your <span className="italic font-normal text-white">Visit</span>
            </h1>
          </div>
          <p className="max-w-md text-xs text-white/80 leading-relaxed font-light md:text-right">
            Getting here, where to stay, and how to make the most of your slow day in Taal, Batangas.
          </p>
        </div>
      </header>

      <div className="page w-full">
        <div className="px-10">

          {/* Getting Here */}
          <section className="mb-20">
            <div className="pick-header mb-10 pb-4 border-b border-hairline">
              <div>
                <span className="tag">Directions</span>
                <h2 className="font-sans text-3xl font-light">Getting to Taal</h2>
              </div>
              <div className="sub">Multiple ways to reach the historic town from Manila and surrounding areas.</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {travelTips.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="border border-hairline p-6 group hover:border-rust transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-rust/10 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-ink-soft group-hover:text-rust transition-colors duration-300" />
                    </div>
                    <h3 className="font-sans text-sm font-medium">{title}</h3>
                  </div>
                  <p className="text-xs text-ink-soft leading-relaxed font-light">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Practical Info */}
          <section className="mb-20">
            <div className="pick-header mb-10 pb-4 border-b border-hairline">
              <div>
                <span className="tag">Know Before You Go</span>
                <h2 className="font-sans text-3xl font-light">Practical Information</h2>
              </div>
              <div className="sub">Tips to help you plan a seamless visit.</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {practicalInfo.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-5 border-b border-hairline pb-8">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-rust" />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-medium mb-2">{title}</h3>
                    <p className="text-xs text-ink-soft leading-relaxed font-light">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Map Callout */}
          <section className="mb-20">
            <div className="pick-header mb-10 pb-4 border-b border-hairline">
              <div>
                <span className="tag">Location</span>
                <h2 className="font-sans text-3xl font-light">Find Us on the Map</h2>
              </div>
            </div>
            <div className="border border-hairline overflow-hidden h-[380px] relative">
              <iframe
                title="Taal, Batangas Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=120.85%2C13.85%2C120.97%2C13.95&layer=mapnik&marker=13.8993%2C120.9143"
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-hairline px-4 py-2 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rust" />
                <span className="text-[11px] font-sans text-ink">Taal, Batangas, Philippines</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
