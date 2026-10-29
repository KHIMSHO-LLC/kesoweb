"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Maximize2, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import inventory from "@/data/gallery-inventory.json";

export function NotebooksGallery() {
  const notebooks = inventory.notebooks || [];
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(12);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % notebooks.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + notebooks.length) % notebooks.length);
    }
  };

  return (
    <section id="notebooks" className="section-aura aura-notebooks relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-stone-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-stone-800/80 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300">
              Room II · Undercategory Sketches
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-linen-50 tracking-tight">
            Notebook Paintings
          </h2>
          <p className="mt-2 text-stone-400 text-sm max-w-xl font-sans leading-relaxed">
            Unfiltered studies from Keso's personal visual diaries—gouache, ink, Georgian calligraphy,
            dreams, and intimate reflections sketched between worlds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-stone-500">
            Archive Count: {notebooks.length} Leaves
          </span>
        </div>
      </div>

      {/* Grid of Notebook Leaves */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
        {notebooks.slice(0, displayCount).map((filename, idx) => (
          <motion.div
            key={filename}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 6) * 0.05 }}
            onClick={() => setSelectedIdx(idx)}
            className="group relative aspect-[3/4] bg-stone-900/60 rounded-xl overflow-hidden border border-stone-800/80 hover:border-amber-400/50 cursor-pointer transition-all duration-300 hover:shadow-lg"
          >
            <Image
              src={`/notebooks/${filename}`}
              alt={`Notebook Study #${idx + 1}`}
              fill
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors" />

            {/* Corner Leaf badge */}
            <span className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950/80 text-stone-300 backdrop-blur-sm border border-stone-800">
              #{String(idx + 1).padStart(2, "0")}
            </span>

            {/* Hover Indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/40">
              <span className="p-2 rounded-full bg-stone-900/90 text-amber-200 border border-stone-700 shadow-md">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {displayCount < notebooks.length && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setDisplayCount((prev) => Math.min(prev + 18, notebooks.length))}
            className="py-3 px-8 rounded-full text-xs font-mono uppercase tracking-widest text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-400/50 transition-all shadow-md"
          >
            Leaf Through More Studies ({notebooks.length - displayCount} remaining)
          </button>
        </div>
      )}

      {/* Full-screen Leaf Lightbox with Page Flip */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-md"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-30 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 hover:border-amber-400/50 transition-colors"
              aria-label="Previous sketch"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Central Leaf View */}
            <div
              className="relative max-w-3xl max-h-[85vh] p-3 sm:p-5 bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[72vh] aspect-[3/4] w-auto h-auto overflow-hidden rounded-lg">
                <Image
                  src={`/notebooks/${notebooks[selectedIdx]}`}
                  alt={`Notebook Leaf #${selectedIdx + 1}`}
                  width={900}
                  height={1200}
                  className="object-contain max-h-[72vh] w-auto h-auto rounded"
                  priority
                />
              </div>

              <div className="mt-4 flex items-center justify-between w-full px-2 text-xs font-mono text-stone-400">
                <span>Notebook Study #{String(selectedIdx + 1).padStart(2, "0")}</span>
                <span className="italic font-serif text-stone-300">Acrylic, Gouache &amp; Ink on Paper</span>
                <span>{selectedIdx + 1} / {notebooks.length}</span>
              </div>
            </div>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-30 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 hover:border-amber-400/50 transition-colors"
              aria-label="Next sketch"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
