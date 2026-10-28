"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ShoppingBag, Sparkles, Share2, Info, Check } from "lucide-react";
import { Painting } from "@/data/artworks";

interface PaintingModalProps {
  painting: Painting | null;
  onClose: () => void;
  onInquire: (painting: Painting) => void;
}

export function PaintingModal({ painting, onClose, onInquire }: PaintingModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!painting) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/92 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-6xl max-h-[92vh] bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row text-linen-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-stone-950/70 border border-stone-700/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Canvas Inspection Area */}
          <div className="relative w-full lg:w-3/5 bg-stone-950/80 flex items-center justify-center p-6 sm:p-10 min-h-[380px] lg:min-h-[580px] overflow-hidden group">
            {/* Ambient lighting backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,60,110,0.18)_0%,transparent_70%)]" />

            <div
              className={`relative max-w-full max-h-[75vh] transition-transform duration-500 cursor-zoom-in ${
                isZoomed ? "scale-150 cursor-zoom-out" : "scale-100"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <div className="relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-2 bg-stone-900 border border-stone-700/50 rounded-sm">
                <Image
                  src={painting.image}
                  alt={painting.title}
                  width={900}
                  height={1100}
                  className="object-contain max-h-[68vh] w-auto h-auto rounded-[1px]"
                  priority
                />
              </div>
            </div>

            {/* Zoom toggle floating button */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="px-3 py-1.5 rounded-full text-xs font-mono bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 backdrop-blur-sm"
              >
                {isZoomed ? (
                  <>
                    <ZoomOut className="w-3.5 h-3.5" />
                    <span>Zoom Out</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Examine Texture</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Museum Label & Editorial Details */}
          <div className="w-full lg:w-2/5 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-none border-t lg:border-t-0 lg:border-l border-stone-800">
            <div>
              {/* Category pill */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300/80 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                  Room I · Featured Painting
                </span>
                <span className="text-xs font-mono text-stone-500">{painting.year}</span>
              </div>

              {/* Title & Medium */}
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-linen-50 tracking-tight">
                {painting.title}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-stone-400">
                <span>{painting.medium}</span>
                <span>•</span>
                <span>{painting.dimensions}</span>
              </div>

              {/* Color Palette Extraction */}
              {painting.colorPalette && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                    Palette:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {painting.colorPalette.map((col, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-stone-700 shadow-sm"
                        style={{ backgroundColor: col }}
                        title={col}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Artist Statement / Poem */}
              <div className="mt-6 pt-6 border-t border-stone-800/80">
                <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 block mb-2">
                  Artist's Note:
                </span>
                <blockquote className="font-serif italic text-base sm:text-lg text-stone-200 leading-relaxed pl-4 border-l-2 border-amber-400/60">
                  "{painting.description}"
                </blockquote>
              </div>

              {/* Poster & Acquisition Note */}
              <div className="mt-6 p-4 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                  <div className="text-xs text-stone-300 space-y-1">
                    <p className="font-medium text-linen-100">
                      {painting.editionDetails || "Available as Limited Archival Art Poster Print"}
                    </p>
                    <p className="text-stone-400 font-mono text-[11px]">
                      Printed on 310gsm museum-grade cotton rag paper with lightfast archival pigments.
                      Original canvas availability upon private inquiry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onInquire(painting)}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full text-xs font-mono uppercase tracking-widest text-stone-950 bg-amber-200 hover:bg-amber-100 font-medium transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Inquire / Buy Poster</span>
              </button>

              <button
                onClick={handleShare}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-mono uppercase tracking-widest text-stone-300 bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700 transition-colors"
                title="Share painting link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Share"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
