"use client";

import React, { useState } from "react";
import { Search, MapPin, Heart, RotateCcw, Sparkles } from "lucide-react";

const FALLBACK_FOOD_IMAGE = "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop";

interface Cuisine {
  name: string;
  tagline: string;
  description: string;
  origin: string;
  image: string;
}

interface Destination {
  name: string;
  category: "restaurant" | "cafe" | "market";
  location: string;
  specialty: string;
  budget: string;
  hours: string;
  image: string;
}

export default function FoodPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});

  const toggleFlip = (index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const cuisines: Cuisine[] = [
    {
      name: "Kapeng Barako",
      tagline: "Legendary Batangas Brew",
      description: "A bold, dark, and highly aromatic Liberica coffee bean grown locally in Batangas. Features a unique smoky aroma and strong caffeine punch.",
      origin: "Traditionally brewed in a clay pot and sweetened with brown sugar or panutsa molasses.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Tapang Taal",
      tagline: "Sweet & Savory Pork Tapa",
      description: "Pork tenderloin thinly sliced and marinated in soy sauce, calamansi, garlic, and cracked pepper, fried to crisp perfection.",
      origin: "Served for breakfast (Tapsilog) with garlic fried rice and sunny-side eggs.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Adobo sa Dilaw",
      tagline: "Turmeric Golden Adobo",
      description: "A regional variation of classic adobo. Gets its vibrant yellow hue and warm earthy aroma from fresh native turmeric root.",
      origin: "Slow-cooked with pork belly, vinegar, garlic, and peppercorns.",
      image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Batangas Lomi",
      tagline: "Thick Egg Noodle Soup",
      description: "A rich bowl of thick egg noodles in viscous egg-drop broth, topped generously with chicharon, pork belly, and liver slices.",
      origin: "Served scalding hot. Custom-seasoned at the table with calamansi, soy sauce, and fresh chili.",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Panutsa",
      tagline: "Molasses Peanut Discs",
      description: "Traditional flat disc candy made by boiling unrefined sugarcane molasses with whole roasted peanuts, cooled on half-coconut shells.",
      origin: "Beloved sweet snack, paired alongside black Kapeng Barako to balance bitterness.",
      image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Empanada de Taal",
      tagline: "Crispy Heirloom Turnover",
      description: "Crispy rice flour turnover stuffed with garlic longganisa, grated papaya, and egg, fried golden in native oil.",
      origin: "Famous street food sold near the Basilica square during afternoon merienda.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const destinations: Destination[] = [
    {
      name: "Tampuhan Cafe",
      category: "cafe",
      location: "Calle Leon Apacible, Taal Proper",
      specialty: "Lomi, Barako Coffee, & Tablea Waffles",
      budget: "₱150 - ₱300",
      hours: "9:00 AM - 6:00 PM Daily",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Don Juan Boodle House",
      category: "restaurant",
      location: "Calle Felipe Agoncillo, Taal Proper",
      specialty: "Taal Boodle Fight Feast (Tapa, Adobo sa Dilaw)",
      budget: "₱300 - ₱600",
      hours: "10:00 AM - 8:00 PM Daily",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Cafe G Heritage Coffee",
      category: "cafe",
      location: "Calle Marcela Agoncillo, Taal Proper",
      specialty: "Special Barako Cappuccino & Heirloom Empanadas",
      budget: "₱200 - ₱400",
      hours: "8:00 AM - 7:00 PM (Closed Wed)",
      image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Taal Public Market",
      category: "market",
      location: "Calle Vicente Ilustre, Taal Proper",
      specialty: "Authentic Raw Tapang Taal & Longganisang Taal",
      budget: "₱50 - ₱200",
      hours: "5:00 AM - 2:00 PM Daily",
      image: "https://images.unsplash.com/photo-1488459718955-4180ecebe500?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const filteredDestinations = destinations.filter((d) => {
    const matchesCategory = activeCategory === "all" || d.category === activeCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (name: string) => {
    setLikes((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <main className="min-h-screen pt-[72px] pb-24 bg-white text-ink font-sans">
      {/* Full-width header touching the left and right grid lines */}
      <header className="relative overflow-hidden mb-16 min-h-[280px] flex items-end text-white border-b border-hairline" style={{ marginLeft: '72px', marginRight: '72px' }}>
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1600&auto=format&fit=crop"
            alt="Kapeng Barako and Food"
            onError={(e) => { e.currentTarget.src = FALLBACK_FOOD_IMAGE; }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 px-10 pb-10">
          <div>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-[9px] uppercase tracking-widest font-mono px-3 py-1 text-white border border-white/20 mb-3 rounded-none">
              Culinary Heritage
            </span>
            <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight leading-tight text-white">
              Taste of <span className="italic font-serif text-white">Taal</span>
            </h1>
          </div>
          <p className="max-w-md text-xs text-white/80 leading-relaxed font-light md:text-right">
            Taste the heirloom flavors of Taal — 6 signature delicacies presented in an interactive 3x2 square grid gallery.
          </p>
        </div>
      </header>

      <div className="page w-full">
        {/* Content Container with Grid Margins */}
        <div className="px-10">

          {/* Section 1: 3x2 (3 Horizontal x 2 Vertical) Gapless Square Delicacies Grid with 3D Flip Card Effect */}
          <section className="mb-24">
            <div className="pick-header mb-10 pb-4 border-b border-hairline flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest font-mono text-rust block mb-1">Interactive Gallery</span>
                <h2 className="font-sans text-3xl md:text-4xl font-light">6 Signature <span className="italic font-serif">Delicacies</span></h2>
              </div>
              <div className="sub text-xs text-ink-soft font-light max-w-sm flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-rust shrink-0" />
                <span>Click any square tile to flip &amp; reveal heirloom recipe details.</span>
              </div>
            </div>

            {/* 3 Horizontal x 2 Vertical Square Grid without Inner Gaps */}
            <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-hairline bg-white shadow-xs">
              {cuisines.map((cuisine, idx) => {
                const isFlipped = flipped[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleFlip(idx)}
                    className="relative aspect-square cursor-pointer border border-hairline overflow-hidden group [perspective:1000px] select-none rounded-none"
                  >
                    <div
                      className={`w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d] ease-in-out ${
                        isFlipped ? "[transform:rotateY(180deg)]" : ""
                      }`}
                    >
                      {/* FRONT SIDE */}
                      <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cuisine.image}
                          alt={cuisine.name}
                          onError={(e) => { e.currentTarget.src = FALLBACK_FOOD_IMAGE; }}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 p-6 flex flex-col justify-between text-white">
                          <div className="flex justify-between items-start">
                            <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 text-[8px] uppercase tracking-widest font-mono text-white border border-white/20">
                              0{idx + 1} / 06
                            </span>
                            <div className="w-7 h-7 rounded-none bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-sky group-hover:text-white transition-colors duration-300">
                              <RotateCcw className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-widest font-mono text-sky block mb-1">
                              {cuisine.tagline}
                            </span>
                            <h3 className="font-sans text-xl font-light text-white leading-tight">
                              {cuisine.name}
                            </h3>
                            <span className="text-[8px] font-mono text-white/60 mt-2 block tracking-wider uppercase">
                              Click to Flip
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* BACK SIDE — Solid Sky Blue (#60a5fa) */}
                      <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-sky text-white p-6 flex flex-col justify-between border border-hairline">
                        <div>
                          <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                            <span className="text-[9px] uppercase tracking-widest font-mono text-white/90">
                              {cuisine.tagline}
                            </span>
                            <span className="text-[8px] uppercase tracking-widest font-mono text-white/60">
                              0{idx + 1}
                            </span>
                          </div>
                          <h3 className="font-sans text-xl font-light text-white mb-2 leading-snug">
                            {cuisine.name}
                          </h3>
                          <p className="text-xs text-white/90 leading-relaxed font-light mb-4">
                            {cuisine.description}
                          </p>
                        </div>
                        <div>
                          <div className="p-3 bg-white/15 border border-white/25 text-[10px] text-white leading-relaxed font-light rounded-none mb-3">
                            <strong className="text-white font-mono uppercase tracking-wider block mb-0.5 text-[8px]">
                              Serving Tradition
                            </strong>
                            {cuisine.origin}
                          </div>
                          <span className="text-[8px] font-mono text-white/80 uppercase tracking-widest block text-center">
                            Click to flip back
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 2: Food Destinations & Filter */}
          <section className="mb-24">
            <div className="pick-header mb-8 pb-4 border-b border-hairline flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest font-mono text-rust block mb-1">Dining Spots</span>
                <h2 className="font-sans text-3xl md:text-4xl font-light">Food <span className="italic font-serif">Destinations</span></h2>
              </div>
              <div className="sub text-xs text-ink-soft font-light max-w-sm">Curated cafes, heritage restaurants, and historic markets in town.</div>
            </div>

            {/* Filter & Search Bar */}
            <div className="border border-hairline mb-10 bg-white rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 p-2">
              <div className="relative flex-1 w-full flex items-center pl-4">
                <Search className="w-4 h-4 text-ink-soft mr-2" />
                <input
                  type="text"
                  placeholder="Search cafes, restaurants, or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 bg-transparent text-xs focus:outline-none placeholder-stone font-light text-ink"
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {[
                  { id: "all", label: "All Spots" },
                  { id: "cafe", label: "Cafes" },
                  { id: "restaurant", label: "Restaurants" },
                  { id: "market", label: "Markets" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-[9px] uppercase tracking-widest font-mono px-4 py-2 transition-all duration-200 rounded-none ${
                      activeCategory === cat.id
                        ? "bg-sky text-white border border-sky"
                        : "bg-white text-ink-soft hover:text-ink border border-hairline hover:bg-stone/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDestinations.map((dest, idx) => {
                const isLiked = likes[dest.name];
                return (
                  <div
                    key={idx}
                    data-reveal
                    data-reveal-group="dests"
                    className="group bg-white border border-hairline rounded-none overflow-hidden hover:border-rust/60 transition-all duration-300 flex flex-col sm:flex-row justify-between"
                  >
                    <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden relative border-b sm:border-b-0 sm:border-r border-hairline bg-linen shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dest.image}
                        alt={dest.name}
                        onError={(e) => { e.currentTarget.src = FALLBACK_FOOD_IMAGE; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <button
                        onClick={() => toggleLike(dest.name)}
                        className={`absolute top-3 right-3 p-2 backdrop-blur-sm border transition-colors rounded-none ${
                          isLiked ? "bg-rust text-white border-rust" : "bg-white/80 text-ink-soft border-hairline hover:text-rust"
                        }`}
                        title="Save to favorites"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-white" : ""}`} />
                      </button>
                    </div>

                    <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest font-mono text-rust font-semibold block mb-1">
                          {dest.category}
                        </span>
                        <h3 className="font-sans text-lg font-medium text-ink mb-1 group-hover:text-rust transition-colors duration-300">
                          {dest.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-ink-soft font-light mb-3">
                          <MapPin className="w-3.5 h-3.5 text-rust shrink-0" />
                          <span>{dest.location}</span>
                        </div>
                        <div className="text-xs text-ink-soft font-light mb-4 leading-relaxed">
                          <strong className="font-medium text-ink">Specialty: </strong>
                          {dest.specialty}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-hairline grid grid-cols-2 gap-2 text-[9px] font-mono text-ink-soft">
                        <div>
                          <span className="block uppercase tracking-wider text-[8px]">Budget</span>
                          <b className="text-ink text-[10px]">{dest.budget}</b>
                        </div>
                        <div>
                          <span className="block uppercase tracking-wider text-[8px]">Hours</span>
                          <b className="text-ink text-[10px]">{dest.hours}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredDestinations.length === 0 && (
                <div className="col-span-2 p-12 text-center text-xs text-ink-soft font-light border border-hairline">
                  No food destinations match your search.
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
