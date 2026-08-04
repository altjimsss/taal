"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronRight, Church, Home, Library, Compass, Image as ImageIcon } from "lucide-react";

interface Attraction {
  id: string;
  name: string;
  category: "church" | "ancestral-house" | "museum" | "landmark";
  lat: number;
  lng: number;
  image: string;
  gallery: string[];
  description: string;
  history: string;
  fee: string;
  hours: string;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop";

const ATTRACTIONS_DATA: Attraction[] = [
  {
    id: "basilica",
    name: "Basilica de San Martin de Tours",
    category: "church",
    lat: 13.8808,
    lng: 120.9242,
    image: "https://images.unsplash.com/photo-1548625361-155deee223cb?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1548625361-155deee223cb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=800&auto=format&fit=crop"
    ],
    description: "The largest Catholic church in Asia, standing majestically on a hill at the center of the town.",
    history: "Originally built in 1575 near the lake, it was rebuilt on its current site in 1755 after the eruption. The current grand neoclassical structure was designed by Spanish architect Luciano Oliver and completed in 1878.",
    fee: "Free (Donations welcome)",
    hours: "6:00 AM - 6:00 PM Daily"
  },
  {
    id: "casa-villa",
    name: "Casa Villavicencio",
    category: "ancestral-house",
    lat: 13.8795,
    lng: 120.9228,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b81685a61?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Known as the 'Revolutionary House', this ancestral home served as a secret meeting place for Katipuneros.",
    history: "Built in 1850, it belonged to Eulalio and Gliceria Villavicencio, who secretly supported the Philippine Revolution against Spain by providing funds, intelligence, and even a transport ship (SS Bulusan).",
    fee: "₱100.00 (Includes guided tour)",
    hours: "8:00 AM - 5:00 PM Daily"
  },
  {
    id: "galleria-taal",
    name: "Galleria Taal",
    category: "museum",
    lat: 13.8801,
    lng: 120.9221,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A vintage camera museum housed in a beautifully restored ancestral home.",
    history: "The museum showcases a rare collection of 19th and 20th-century cameras, including the daguerreotype and early folding models. The house itself was the ancestral home of the Ilagan family.",
    fee: "₱100.00",
    hours: "9:00 AM - 5:00 PM (Closed Mondays)"
  },
  {
    id: "caysasay-shrine",
    name: "Our Lady of Caysasay Shrine",
    category: "church",
    lat: 13.8819,
    lng: 120.9282,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A 17th-century coral stone church dedicated to the miraculous image of Our Lady of Caysasay.",
    history: "Built in 1639 to honor the wooden image of the Virgin Mary fished out of the Pansipit River by a local fisherman named Juan Maningcad in 1603.",
    fee: "Free",
    hours: "6:00 AM - 5:30 PM Daily"
  },
  {
    id: "san-lorenzo-steps",
    name: "San Lorenzo Ruiz Steps",
    category: "landmark",
    lat: 13.8815,
    lng: 120.9275,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A flight of 125 granite steps connecting the Caysasay Shrine to the town center.",
    history: "These steps were constructed in the 18th century using Chinese granite stone blocks (tisa) to facilitate pilgrims traversing the steep hillside.",
    fee: "Free",
    hours: "24/7 Accessible"
  }
];

export default function AttractionsPage() {
  const [selectedId, setSelectedId] = useState<string>("basilica");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [leafletLoaded, setLeafletLoaded] = useState<boolean>(false);
  const [activePreviewImage, setActivePreviewImage] = useState<string | null>(null);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapInstance = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterHeight, setFilterHeight] = useState<number>(44);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const el = filterRef.current;
    if (!el) return;
    setFilterHeight(el.offsetHeight);
    const ro = new ResizeObserver(() => setFilterHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const selectedAttraction = ATTRACTIONS_DATA.find((a) => a.id === selectedId) || ATTRACTIONS_DATA[0];

  const filteredAttractions = ATTRACTIONS_DATA.filter((a) => {
    const matchesCategory = categoryFilter === "all" || a.category === categoryFilter;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  const createMarkerHtml = (isSelected: boolean) => `
    <div class="flex items-center justify-center w-8 h-8 rounded-none border border-white shadow-md transition-all duration-200 ${
      isSelected ? "bg-[#60a5fa] text-white scale-110" : "bg-white text-[#60a5fa] hover:bg-[#60a5fa] hover:text-white"
    }">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </div>
  `;

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || typeof window === "undefined") return;
    const L = (window as any).L;
    if (!L) return;
    if (!leafletMapInstance.current) {
      leafletMapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([selectedAttraction.lat, selectedAttraction.lng], 15);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 20
      }).addTo(leafletMapInstance.current);

      L.control.zoom({ position: "bottomright" }).addTo(leafletMapInstance.current);
    }
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};
    filteredAttractions.forEach((attr) => {
      const isSelected = attr.id === selectedId;
      const customIcon = L.divIcon({
        html: createMarkerHtml(isSelected),
        className: "custom-leaflet-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
      const popupHtml = `
        <div class="taal-popup">
          <div class="taal-popup-img" style="background-image:url('${attr.image}')"></div>
          <div class="taal-popup-body">
            <span class="taal-popup-cat">${attr.category.replace('-', ' ')}</span>
            <div class="taal-popup-name">${attr.name}</div>
          </div>
        </div>
      `;
      const popup = L.popup({
        closeButton: false,
        className: "taal-leaflet-popup",
        offset: [0, -10],
        autoPan: false,
      }).setContent(popupHtml);
      const marker = L.marker([attr.lat, attr.lng], { icon: customIcon })
        .addTo(leafletMapInstance.current)
        .bindPopup(popup)
        .on("click", () => setSelectedId(attr.id));
      markersRef.current[attr.id] = marker;
    });
  }, [leafletLoaded, filteredAttractions]);

  useEffect(() => {
    if (!leafletLoaded || !leafletMapInstance.current || typeof window === "undefined") return;
    const L = (window as any).L;
    if (!L) return;
    // Close all popups first, then open only the selected one
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isSelected = id === selectedId;
      const customIcon = L.divIcon({
        html: createMarkerHtml(isSelected),
        className: "custom-leaflet-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
      (marker as any).setIcon(customIcon);
      if (isSelected) {
        (marker as any).openPopup();
      } else {
        (marker as any).closePopup();
      }
    });
    if (selectedAttraction) {
      leafletMapInstance.current.panTo([selectedAttraction.lat, selectedAttraction.lng], {
        animate: true,
        duration: 0.8
      });
    }
  }, [selectedId, leafletLoaded, filteredAttractions, selectedAttraction]);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "church": return <Church className="w-3.5 h-3.5" />;
      case "ancestral-house": return <Home className="w-3.5 h-3.5" />;
      case "museum": return <Library className="w-3.5 h-3.5" />;
      default: return <Compass className="w-3.5 h-3.5" />;
    }
  };

  return (
    <main className="bg-white text-ink font-sans pt-[72px]">
      <header
        className="relative shrink-0 overflow-hidden min-h-[220px] flex items-end text-white border-b border-hairline"
        style={{ marginLeft: '72px', marginRight: '72px' }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1600&auto=format&fit=crop"
            alt="Town Attractions Header"
            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 px-10 pb-8">
          <div>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-[10px] uppercase tracking-wider px-3 py-1 text-white border border-white/20 mb-3 rounded-none">
              Destination Guide
            </span>
            <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight leading-tight text-white">
              Town Attractions
            </h1>
          </div>
          <p className="max-w-md text-xs text-white/80 leading-relaxed font-light md:text-right">
            From the grand Basilica to quiet ancestral houses — every corner of Taal has a story waiting.
          </p>
        </div>
      </header>

      <div ref={filterRef} className="sticky top-[72px] z-30 bg-white border-b border-hairline" style={{ marginLeft: '72px', marginRight: '72px' }}>
        <div className="filter-bar border-t-0" style={{ marginBottom: 0, gridTemplateColumns: '5fr 1.75fr 1.75fr 1.75fr 1.75fr' }}>
          <div className="field relative flex items-center pr-10">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft" />
            <input
              type="text"
              placeholder="Search spots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 py-1 bg-transparent border-none text-xs focus:outline-none placeholder-stone font-light text-ink"
            />
          </div>
          {[
            { id: "all", label: "All Spots" },
            { id: "church", label: "Churches" },
            { id: "ancestral-house", label: "Houses" },
            { id: "museum", label: "Museums" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`discover border-l border-hairline ${
                categoryFilter === cat.id ? "bg-sky text-white" : "bg-transparent text-ink-soft hover:bg-sand/20"
              }`}
              style={{ padding: "0 16px" }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-x border-b border-hairline overflow-hidden bg-linen"
        style={{
          marginLeft: '72px',
          marginRight: '72px',
          ...(mounted ? { height: `calc(100vh - 72px - ${filterHeight}px)` } : {}),
        }}
      >
        <section className="lg:col-span-5 h-full overflow-y-auto divide-y divide-hairline border-r border-hairline bg-white scrollbar-thin">
          {filteredAttractions.map((attr) => {
            const isSelected = attr.id === selectedId;
            return (
              <div
                key={attr.id}
                onClick={() => { setSelectedId(attr.id); setActivePreviewImage(null); }}
                className={`p-5 cursor-pointer transition-all duration-300 ease-in-out flex flex-col rounded-none ${
                  isSelected
                    ? "bg-sky text-white border-l-4 border-l-sky shadow-sm"
                    : "bg-white hover:bg-stone/5 border-l-4 border-l-transparent text-ink"
                }`}
              >
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-none overflow-hidden flex-shrink-0 border border-white/20 relative">
                    <img
                      src={activePreviewImage && isSelected ? activePreviewImage : attr.image}
                      alt={attr.name}
                      onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className={`flex items-center gap-1 mb-1 transition-colors duration-300 ${isSelected ? "text-white/80" : "text-rust"}`}>
                        {getCategoryIcon(attr.category)}
                        <span className="text-[8px] uppercase tracking-widest font-semibold">{attr.category.replace("-", " ")}</span>
                      </div>
                      <h3 className="font-sans text-sm font-semibold mb-1 leading-snug">{attr.name}</h3>
                      <p className={`text-xs line-clamp-2 font-light leading-relaxed transition-colors duration-300 ${isSelected ? "text-white/90" : "text-ink-soft"}`}>
                        {attr.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center self-center">
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isSelected ? "rotate-90 text-white" : "text-ink-soft/40"}`} />
                  </div>
                </div>

                {/* Smooth animated accordion drawer (expands and collapses with grid-rows and opacity transitions) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isSelected
                      ? "grid-rows-[1fr] opacity-100 mt-2 pt-3 border-t border-white/20"
                      : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden space-y-3">
                    <div className="text-[11px] font-light leading-relaxed text-white/90">
                      <span className="font-medium text-white">History: </span>
                      {attr.history}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[9px] bg-white/10 p-2.5 rounded-none border border-white/20 font-mono">
                      <div>
                        <span className="text-white/70 block font-sans uppercase tracking-wider text-[8px]">Fees</span>
                        <b className="text-white text-[10px]">{attr.fee}</b>
                      </div>
                      <div>
                        <span className="text-white/70 block font-sans uppercase tracking-wider text-[8px]">Hours</span>
                        <b className="text-white text-[10px]">{attr.hours}</b>
                      </div>
                    </div>

                    {attr.gallery && attr.gallery.length > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-semibold text-white/80 mb-2 font-mono">
                          <ImageIcon className="w-3 h-3 text-white" />
                          <span>Gallery Showcase</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {attr.gallery.map((imgUrl, idx) => (
                            <div
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePreviewImage(imgUrl);
                              }}
                              className={`relative h-14 border overflow-hidden rounded-none cursor-pointer transition-all duration-200 ${
                                (activePreviewImage || attr.image) === imgUrl
                                  ? "border-white ring-1 ring-white scale-[1.02]"
                                  : "border-white/30 hover:border-white opacity-80 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={`${attr.name} photo ${idx + 1}`}
                                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filteredAttractions.length === 0 && (
            <div className="p-8 text-center text-xs text-ink-soft font-light">
              No attractions match.
            </div>
          )}
        </section>

        <section className="lg:col-span-7 relative h-full bg-sand/10">
          {!leafletLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-linen gap-2 z-20">
              <div className="w-5 h-5 border-2 border-rust border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] font-mono text-ink-soft">Loading Canvas...</span>
            </div>
          )}
          <div ref={mapRef} className="w-full h-full z-10" />
        </section>
      </div>
    </main>
  );
}
