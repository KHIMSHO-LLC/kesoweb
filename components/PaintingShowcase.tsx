"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MAIN_PAINTINGS, Painting } from "@/data/artworks";
import {
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Film,
  ShoppingBag,
  Info,
  Calendar,
  Layers
} from "lucide-react";

interface PaintingShowcaseProps {
  onSelectPainting: (painting: Painting) => void;
  onInquirePainting: (painting: Painting) => void;
}

export function PaintingShowcase({
  onSelectPainting,
  onInquirePainting,
}: PaintingShowcaseProps) {
  const [viewMode, setViewMode] = useState<"curated" | "salon">("curated");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const currentPainting = MAIN_PAINTINGS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MAIN_PAINTINGS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MAIN_PAINTINGS.length) % MAIN_PAINTINGS.length);
  };

  const filteredPaintings = MAIN_PAINTINGS.filter((p) => {
    if (selectedYear === "all") return true;
    if (selectedYear === "2026") return p.year === "2026";
    if (selectedYear === "2024-2025") return p.year === "2024" || p.year === "2025";
    if (selectedYear === "2021-2023") return p.year === "2021" || p.year === "2023";
    return true;
  });

  return (
    <section id="paintings" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-stone-800/80 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300">
              Room I · Primary Collection
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-linen-50 tracking-tight">
            The Paintings
          </h2>
          <p className="mt-2 text-stone-400 text-sm max-w-xl font-sans leading-relaxed">
            Ten major works exploring memory, nostalgia, floating realms, and what it means to belong.
            All works are available primarily as museum-grade archival poster prints.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-full bg-stone-900 border border-stone-800 text-xs font-mono">
            <button
              onClick={() => setViewMode("curated")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-300 ${
                viewMode === "curated"
                  ? "bg-stone-800 text-amber-200 shadow-sm"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Curated Journey</span>
            </button>
            <button
              onClick={() => setViewMode("salon")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-300 ${
                viewMode === "salon"
                  ? "bg-stone-800 text-amber-200 shadow-sm"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Salon Wall ({MAIN_PAINTINGS.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: CURATED CINEMATIC WALKTHROUGH */}
      {viewMode === "curated" && (
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPainting.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-stone-900/40 rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-800/80 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle painterly ambient background glow */}
              <div
                className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000"
                style={{
                  backgroundColor: currentPainting.colorPalette?.[0] || "#3b82f6",
                }}
              />

              {/* Painting Visual Stage (Canvas presentation) */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[500px]">
                <div
                  onClick={() => onSelectPainting(currentPainting)}
                  className="relative group cursor-pointer max-w-full"
                >
                  {/* Outer Frame Effect */}
                  <div className="relative p-2.5 sm:p-4 bg-stone-950/90 rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-stone-800 transition-transform duration-700 group-hover:scale-[1.015]">
                    <div className="relative overflow-hidden max-h-[65vh] w-auto">
                      <Image
                        src={currentPainting.image}
                        alt={currentPainting.title}
                        width={900}
                        height={1100}
                        className="object-contain max-h-[62vh] w-auto h-auto rounded-[1px] transition-transform duration-700 group-hover:scale-105"
                        priority
                      />

                      {/* Hover Overlay with Inspect prompt */}
                      <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-mono text-xs uppercase tracking-widest backdrop-blur-[2px]">
                        <Maximize2 className="w-4 h-4 text-amber-300" />
                        <span>Inspect &amp; Expand</span>
                      </div>
                    </div>
                  </div>

                  {/* Reflection shadow underneath */}
                  <div className="w-4/5 h-6 mx-auto bg-stone-950/80 filter blur-md rounded-full -mt-2 opacity-70" />
                </div>
              </div>

              {/* Museum Label & Editorial Text */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Step counter */}
                  <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 mb-6">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-stone-500">
                      Work {String(currentIndex + 1).padStart(2, "0")} / {String(MAIN_PAINTINGS.length).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-mono text-amber-300/80 bg-stone-800/80 px-2.5 py-0.5 rounded-full border border-stone-700">
                      {currentPainting.year}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-serif text-linen-50 font-light tracking-tight">
                    {currentPainting.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-stone-400">
                    <span className="text-amber-200/90">{currentPainting.medium}</span>
                    <span>•</span>
                    <span>{currentPainting.dimensions}</span>
                  </div>

                  {/* Poetic description */}
                  <div className="mt-8 pt-6 border-t border-stone-800/60">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-2">
                      Artist's Voice
                    </span>
                    <blockquote className="font-serif italic text-lg sm:text-xl text-stone-200 leading-relaxed pl-4 border-l-2 border-amber-400/50">
                      "{currentPainting.description}"
                    </blockquote>
                  </div>

                  {/* Color palette pills */}
                  {currentPainting.colorPalette && (
                    <div className="mt-6 flex items-center gap-3">
                      <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                        Tones:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {currentPainting.colorPalette.map((c, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-stone-700 shadow-inner"
                            style={{ backgroundColor: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Archival Print Note */}
                  <div className="mt-6 p-4 rounded-xl bg-stone-950/60 border border-stone-800 text-xs">
                    <p className="font-mono text-amber-200 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Collector Availability</span>
                    </p>
                    <p className="text-stone-300 font-sans leading-relaxed">
                      {currentPainting.editionDetails || "Museum-quality Archival Poster Print available on 310gsm cotton rag."}
                    </p>
                  </div>
                </div>

                {/* Actions & Carousel Navigation */}
                <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => onInquirePainting(currentPainting)}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full text-xs font-mono uppercase tracking-widest text-stone-950 bg-amber-200 hover:bg-amber-100 font-medium transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Inquire / Buy Poster</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
                      aria-label="Previous artwork"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
                      aria-label="Next artwork"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Thumbnails Strip below */}
          <div className="mt-8 flex items-center gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar">
            {MAIN_PAINTINGS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative shrink-0 w-16 sm:w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  currentIndex === idx
                    ? "border-amber-400 scale-105 shadow-md shadow-amber-400/20"
                    : "border-stone-800 opacity-60 hover:opacity-100 hover:border-stone-600"
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: SALON WALL / ARCHIVE GRID */}
      {viewMode === "salon" && (
        <div>
          {/* Year Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-widest mr-2">
              Filter by Period:
            </span>
            {[
              { id: "all", label: "All Works (10)" },
              { id: "2026", label: "2026 (Recent)" },
              { id: "2024-2025", label: "2024–2025" },
              { id: "2021-2023", label: "2021–2023" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedYear(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors border ${
                  selectedYear === f.id
                    ? "bg-amber-300/20 text-amber-200 border-amber-400/50"
                    : "bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPaintings.map((painting, idx) => (
              <motion.div
                key={painting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex flex-col justify-between bg-stone-900/30 border border-stone-800/80 rounded-2xl p-5 hover:border-stone-700/80 transition-all duration-300 hover:shadow-xl"
              >
                {/* Image Card */}
                <div
                  onClick={() => onSelectPainting(painting)}
                  className="relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-950 cursor-pointer shadow-md"
                >
                  <Image
                    src={painting.image}
                    alt={painting.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-300" />

                  {/* Corner Year Badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-950/80 text-stone-300 backdrop-blur-sm border border-stone-800">
                    {painting.year}
                  </span>

                  {/* Hover Inspect pill */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono bg-stone-950/90 text-amber-200 border border-stone-700 backdrop-blur-md">
                      <Maximize2 className="w-3 h-3" />
                      <span>Examine</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-xl font-serif text-linen-100 font-light group-hover:text-amber-200 transition-colors">
                      {painting.title}
                    </h4>
                    <p className="text-xs font-mono text-stone-400 mt-1">
                      {painting.medium} · {painting.dimensions}
                    </p>
                    <p className="mt-3 text-xs text-stone-400 font-serif italic line-clamp-2 leading-relaxed">
                      "{painting.description}"
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-800/60 flex items-center justify-between">
                    <button
                      onClick={() => onInquirePainting(painting)}
                      className="text-[11px] font-mono uppercase tracking-wider text-amber-300 hover:text-amber-200 flex items-center gap-1.5 transition-colors font-medium"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Inquire / Buy Poster</span>
                    </button>
                    <button
                      onClick={() => onSelectPainting(painting)}
                      className="text-[11px] font-mono text-stone-500 hover:text-stone-300 transition-colors"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
