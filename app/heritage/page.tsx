"use client";

import React, { useState } from "react";
import { Compass, Award, ChevronRight, Calendar } from "lucide-react";
import TransitionLink from "../components/transitions/TransitionLink";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: string;
}

interface HistoricalFigure {
  name: string;
  role: string;
  life: string;
  description: string;
  image: string;
  citation: string;
}

export default function HeritagePage() {
  const [activeEra, setActiveEra] = useState<string>("all");

  const timelineEvents: TimelineEvent[] = [
    {
      year: "1572",
      title: "Establishment of Taal",
      description: "Founded by Augustinian missionaries on the banks of the Taal Lake, near the active volcano.",
      era: "founding"
    },
    {
      year: "1754",
      title: "The Great Eruption & Relocation",
      description: "A catastrophic 200-day eruption of Taal Volcano destroyed the original town. Relocated to its current safe, elevated ridge location.",
      era: "relocation"
    },
    {
      year: "1800s",
      title: "The Coffee Boom & Golden Era",
      description: "Taal became a major trading hub and coffee producer. The wealth generated built the town's famous stone mansions (Bahay na Bato).",
      era: "golden-era"
    },
    {
      year: "1898",
      title: "The Philippine Revolution",
      description: "Taal became a hotbed of revolutionary activities. Marcela Agoncillo sewed the first official flag of the Philippines here.",
      era: "revolution"
    },
    {
      year: "1974",
      title: "National Historical Landmark",
      description: "Taal was officially declared a Heritage Town, protecting its unique Spanish-colonial layout and architecture.",
      era: "preservation"
    }
  ];

  const historicalFigures: HistoricalFigure[] = [
    {
      name: "Marcela Mariño de Agoncillo",
      role: "Mother of the Philippine Flag",
      life: "1859 – 1946",
      description: "Patriotic daughter of Taal who sewed the first Philippine National Flag in Hong Kong, as requested by General Emilio Aguinaldo.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
      citation: "Agoncillo House Museum"
    },
    {
      name: "Gliceria Marella de Villavicencio",
      role: "Godmother of the Revolution",
      life: "1852 – 1929",
      description: "A wealthy revolutionary supporter who donated her fortune, food, and the SS Bulusan (the first transport ship of the revolution) to the cause.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      citation: "Casa Villavicencio"
    },
    {
      name: "Don Leon Apacible",
      role: "Revolutionary Leader & Jurist",
      life: "1861 – 1901",
      description: "Right-hand man to Jose Rizal, active member of the propaganda movement, and later a delegate to the Malolos Congress.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      citation: "Apacible Museum"
    }
  ];

  const eras = [
    { id: "all", label: "All Eras" },
    { id: "founding", label: "Founding (1572)" },
    { id: "relocation", label: "Relocation (1754)" },
    { id: "golden-era", label: "Golden Era (1800s)" },
    { id: "revolution", label: "Revolution (1898)" }
  ];

  const filteredEvents = activeEra === "all" 
    ? timelineEvents 
    : timelineEvents.filter(e => e.era === activeEra);

  return (
    <main className="min-h-screen pt-[72px] pb-24 bg-white text-ink font-sans">
      {/* Full-width header stretching to the left and right grid lines (72px each side) */}
      <header className="relative overflow-hidden mb-16 min-h-[280px] flex items-end text-white border-b border-hairline" style={{ marginLeft: '72px', marginRight: '72px' }}>
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" 
            alt="Taal Heritage Street" 
            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 px-10 pb-10">
          <div>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-[9px] uppercase tracking-widest font-mono px-3 py-1 text-white border border-white/20 mb-3 rounded-none">
              Living History
            </span>
            <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight leading-tight text-white">
              Heritage of <span className="italic font-serif text-white">Taal</span>
            </h1>
          </div>
          <p className="max-w-md text-xs text-white/80 leading-relaxed font-light md:text-right">
            Walk through the historic corridor. Declared a unique heritage town, Taal is a living museum of Spanish-colonial architecture.
          </p>
        </div>
      </header>

      <div className="page w-full">
        {/* Content Container with Grid Margins */}
        <div className="px-10">
          {/* Section 1: Historical Narrative Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
            
            {/* Left Column: Narrative & Crafts */}
            <section className="lg:col-span-7 space-y-8 pr-0 lg:pr-6">
              <div className="pick-header mb-8 pb-4 border-b border-hairline">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-rust block mb-1">Architectural History</span>
                  <h2 className="font-sans text-3xl font-light">A Sanctuary Reborn <span className="italic font-serif">1572–Present</span></h2>
                </div>
              </div>

              <div className="space-y-4 text-ink-soft leading-relaxed text-sm font-light">
                <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-rust first-letter:mr-2 first-letter:float-left">
                  The story of Taal is one of resilience and reinvention. Originally established in 1572 by Augustinian friars along the shore of Taal Lake, the town lay in the shadows of the volcanic island. For nearly two centuries, the community thrived despite volcanic activities.
                </p>
                <p>
                  This changed in 1754, when the volcano erupted continuously for over six months, spewing lava, ash, and pyroclastic flows that submerged the original settlement. Relocated to its current safe, elevated ridge location, the town rose from the ashes.
                </p>
                <p>
                  In this new sanctuary, Taal entered a golden age of commerce, embroidery, and architecture that defined the 19th-century Filipino elite class.
                </p>
              </div>

              {/* Craft Highlights — Flat Magazine Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div data-reveal data-reveal-group="crafts" className="p-6 bg-white border border-hairline rounded-none flex flex-col justify-between transition-all duration-300 hover:border-rust/60">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-mono text-rust block mb-1">Tradition</span>
                    <h3 className="font-sans text-base font-medium text-ink mb-2">Burdang Taal</h3>
                    <p className="text-xs text-ink-soft leading-relaxed font-light">
                      Centuries-old hand-embroidery tradition utilizing pineapple (Piña) and banana plant fibers, crafting exquisite barongs and gowns.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-hairline flex justify-between items-center text-[9px] uppercase tracking-wider font-mono text-rust">
                    <span>Handcrafted Legacy</span>
                    <Award className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div data-reveal data-reveal-group="crafts" className="p-6 bg-white border border-hairline rounded-none flex flex-col justify-between transition-all duration-300 hover:border-rust/60">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-mono text-rust block mb-1">Steel Craft</span>
                    <h3 className="font-sans text-base font-medium text-ink mb-2">Balisong Forging</h3>
                    <p className="text-xs text-ink-soft leading-relaxed font-light">
                      Taal is the world-famous birthplace of the handcrafted butterfly knife, hand-forged by master bladesmiths in Barangay Balisong.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-hairline flex justify-between items-center text-[9px] uppercase tracking-wider font-mono text-rust">
                    <span>Steel Artistry</span>
                    <Award className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column: Interactive Chronology Panel */}
            <section data-reveal className="lg:col-span-5 border border-hairline rounded-none p-8 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-hairline">
                <h3 className="font-sans text-lg font-light flex items-center gap-2 text-ink">
                  <Calendar className="w-4 h-4 text-rust" />
                  Town Chronology
                </h3>
                <span className="text-[9px] text-ink-soft uppercase tracking-widest font-mono">1572 – 1974</span>
              </div>

              {/* Era Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {eras.map(era => (
                  <button
                    key={era.id}
                    onClick={() => setActiveEra(era.id)}
                    className={`text-[9px] uppercase tracking-widest font-mono px-3 py-1.5 rounded-none transition-all duration-200 ${
                      activeEra === era.id 
                        ? "bg-sky text-white border border-sky" 
                        : "bg-white text-ink-soft hover:text-ink border border-hairline hover:bg-stone/5"
                    }`}
                  >
                    {era.label}
                  </button>
                ))}
              </div>

              {/* Timeline Items Stack */}
              <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-hairline">
                {filteredEvents.map((event, idx) => (
                  <div key={idx} className="relative pl-10 group">
                    <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-none border-2 border-rust bg-white group-hover:bg-rust transition-colors duration-300 z-10" />
                    <div className="text-xs font-mono font-semibold text-rust mb-1">{event.year}</div>
                    <h4 className="font-sans text-sm font-medium text-ink mb-1 group-hover:text-rust transition-colors duration-300">{event.title}</h4>
                    <p className="text-xs text-ink-soft leading-relaxed font-light">{event.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Historical Figures Section */}
          <section className="mb-24">
            <div className="pick-header mb-12 pb-4 border-b border-hairline flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest font-mono text-rust block mb-1">Patriots &amp; Founders</span>
                <h2 className="font-sans text-3xl md:text-4xl font-light">Souls of the <span className="italic font-serif">Revolution</span></h2>
              </div>
              <div className="sub text-xs text-ink-soft font-light max-w-sm">Prominent figures who shaped the history of the town and the nation.</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {historicalFigures.map((fig, idx) => (
                <div 
                  key={idx} 
                  data-reveal
                  data-reveal-group="figures"
                  className="group bg-white border border-hairline rounded-none overflow-hidden hover:border-rust/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden relative border-b border-hairline bg-linen">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={fig.image} 
                        alt={fig.name} 
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute bottom-3 left-3 bg-ink/90 backdrop-blur-sm px-2.5 py-1 rounded-none text-[9px] uppercase tracking-widest font-mono text-white border border-white/10">
                        {fig.citation}
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-[9px] uppercase tracking-widest font-mono text-rust font-semibold mb-1 block">{fig.role}</span>
                      <h3 className="font-sans text-base font-medium text-ink mb-1 group-hover:text-rust transition-colors duration-300">{fig.name}</h3>
                      <div className="text-[10px] text-ink-soft/70 font-mono mb-4">{fig.life}</div>
                      <p className="text-xs text-ink-soft leading-relaxed font-light">
                        {fig.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <TransitionLink 
                      href="/attractions"
                      className="w-full pt-4 border-t border-hairline text-center text-xs text-ink-soft hover:text-rust transition-colors flex items-center justify-center gap-1 font-medium"
                    >
                      <span>Explore House Museum</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </TransitionLink>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Flat Editorial Banner CTA */}
          <section data-reveal className="bg-ink text-white rounded-none p-10 md:p-14 text-center relative overflow-hidden border border-hairline shadow-xs mb-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.15),transparent)] pointer-events-none" />
            <span className="text-[9px] uppercase tracking-widest font-mono text-sky block mb-3">Immersive History</span>
            <h3 className="font-sans text-3xl md:text-4xl font-light mb-4">Experience the Legacy Firsthand</h3>
            <p className="text-xs md:text-sm text-white/80 max-w-xl mx-auto mb-8 font-light leading-relaxed">
              Embark on a curated heritage walk through the ancient avenues. Discover original revolutionary documents, majestic wood carvings, and stories whispered in stone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <TransitionLink 
                href="/attractions" 
                className="btn-flat bg-sky text-white hover:bg-sky/90 transition-colors border border-sky px-6 py-3 text-xs uppercase tracking-widest font-mono"
              >
                Explore Attractions
              </TransitionLink>
              <TransitionLink 
                href="/visit" 
                className="px-6 py-3 border border-white/30 hover:border-white text-white text-xs uppercase tracking-widest font-mono transition-colors duration-300 rounded-none"
              >
                Plan Your Visit
              </TransitionLink>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
