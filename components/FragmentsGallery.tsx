"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Feather, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import inventory from "@/data/gallery-inventory.json";

export function FragmentsGallery() {
  const writings = inventory.writings || [];
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(16);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % writings.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + writings.length) % writings.length);
    }
  };

  return (
    <section id="fragments" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-stone-800/80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-stone-800/80 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PenTool className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300">
              Room III · Ordinary Pen Studies
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-linen-50 tracking-tight">
            Fragments &amp; Writings
          </h2>
          <p className="mt-2 text-stone-400 text-sm max-w-xl font-sans leading-relaxed">
            Raw ballpoint pen sketches, vessels, celestial haloes, and intimate handwritten thoughts
            recorded in moments of solitude and transition.
          </p>
        </div>

        {/* Tactile Moodboard Note */}
        <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800 max-w-xs text-xs font-mono text-stone-400">
          <p className="italic font-serif text-linen-100 text-sm mb-1">
            "Only when you're not in the room we'll make the clock wait..."
          </p>
          <span className="text-[10px] text-amber-300/80 uppercase tracking-wider">
            From the artist's journals
          </span>
        </div>
      </div>

      {/* Masonry / Pinboard Collage */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {writings.slice(0, visibleCount).map((filename, idx) => (
          <motion.div
            key={filename}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 4) * 0.08 }}
            onClick={() => setSelectedIdx(idx)}
            className="group relative aspect-[3/4] bg-stone-900/40 rounded-2xl overflow-hidden border border-stone-800/80 hover:border-stone-600 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl"
          >
            {/* Paper texture feeling */}
            <Image
              src={`/writings/${filename}`}
              alt={`Fragment #${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-stone-950/10 group-hover:bg-transparent transition-colors" />

            {/* Corner Badge */}
            <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950/80 text-stone-300 backdrop-blur-sm border border-stone-800/80">
              Fragment {String(idx + 1).padStart(2, "0")}
            </span>

            {/* Zoom icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/30">
              <span className="p-2.5 rounded-full bg-stone-900/90 text-amber-200 border border-stone-700">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < writings.length && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + 16, writings.length))}
            className="py-3 px-8 rounded-full text-xs font-mono uppercase tracking-widest text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-400/50 transition-all shadow-md"
          >
            Reveal More Fragments ({writings.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-md"
            onClick={() => setSelectedIdx(null)}
          >
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-30 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors"
              aria-label="Previous fragment"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              className="relative max-w-2xl max-h-[85vh] p-3 sm:p-5 bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[72vh] aspect-[3/4] w-auto h-auto overflow-hidden rounded-lg">
                <Image
                  src={`/writings/${writings[selectedIdx]}`}
                  alt={`Fragment #${selectedIdx + 1}`}
                  width={800}
                  height={1100}
                  className="object-contain max-h-[72vh] w-auto h-auto rounded"
                  priority
                />
              </div>

              <div className="mt-4 flex items-center justify-between w-full px-2 text-xs font-mono text-stone-400">
                <span>Pen Study #{String(selectedIdx + 1).padStart(2, "0")}</span>
                <span className="italic font-serif text-stone-300">Ink on Paper · Visual Diary</span>
                <span>{selectedIdx + 1} / {writings.length}</span>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-30 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors"
              aria-label="Next fragment"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
