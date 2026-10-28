"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Calendar, MapPin, Video, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import { EXHIBITION_INFO } from "@/data/artworks";
import inventory from "@/data/gallery-inventory.json";

export function ExhibitionsSection() {
  const exhibitionPhotos = inventory.exhibitions || [];
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const pastEx = EXHIBITION_INFO.past[0];

  return (
    <section id="gatherings" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-stone-800/80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-stone-800/80 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300">
              Room IV · Gatherings &amp; Spaces
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-linen-50 tracking-tight">
            Exhibitions &amp; Gatherings
          </h2>
          <p className="mt-2 text-stone-400 text-sm max-w-xl font-sans leading-relaxed">
            Collaborations with Barnab Gallery and videographer Dea Shalamberidze.
            Documenting shared spaces where inner worlds meet collective presence.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-stone-400 bg-stone-900/60 border border-stone-800 px-3.5 py-1.5 rounded-full">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Barnab Gallery · Kutaisi, Georgia</span>
        </div>
      </div>

      {/* Featured Exhibition: "BETWEEN WORLDS" */}
      <div className="bg-stone-900/40 border border-stone-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setActivePhotoIdx(16)} // _DSC1524.JPG (Keso with flowers)
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-950 cursor-pointer group border border-stone-800 shadow-md"
            >
              <Image
                src="/exhibition/_DSC1524.JPG"
                alt="Keso at Between Worlds Opening"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-linen-100">
                <span className="text-amber-300 text-[10px] uppercase tracking-wider block">Artist &amp; Opening Night</span>
                Keso with bouquet at Barnab Gallery
              </div>
            </div>

            <div
              onClick={() => setActivePhotoIdx(0)} // EF27FDBF... (Wood arch and crowd)
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-950 cursor-pointer group border border-stone-800 shadow-md"
            >
              <Image
                src="/exhibition/EF27FDBF-235F-48C7-A002-9F80DE75077C.jpg"
                alt="Gallery atmosphere and wooden archway"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-linen-100">
                <span className="text-amber-300 text-[10px] uppercase tracking-wider block">Gallery Arch &amp; Visitors</span>
                Historic wood coffered ceiling &amp; guests
              </div>
            </div>
          </div>

          {/* Exhibition Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-300/80 bg-stone-800/80 px-3 py-1 rounded-full border border-stone-700">
                Solo Exhibition · Documentation
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-linen-50 mt-4 font-light">
                {pastEx.title}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-xs font-mono text-stone-400">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{pastEx.date}</span>
                <span>•</span>
                <span>{pastEx.gallery}, {pastEx.city}</span>
              </div>

              <p className="mt-4 text-stone-300 text-sm font-sans leading-relaxed">
                {pastEx.description}
              </p>

              {/* Collaborators */}
              <div className="mt-6 pt-6 border-t border-stone-800/80 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 block mb-2">
                  Curatorial &amp; Visual Collaborations:
                </span>
                {pastEx.collaborators.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs font-mono py-1">
                    <span className="text-stone-400">{c.role}</span>
                    <span className="text-linen-100 font-medium">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Reel Prompt */}
            <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/90 flex items-center justify-between">
              <span className="text-xs font-mono text-stone-300">
                Documentation Archive ({exhibitionPhotos.length} Photos)
              </span>
              <button
                onClick={() => setActivePhotoIdx(0)}
                className="text-xs font-mono text-amber-300 hover:text-amber-200 underline underline-offset-4"
              >
                Browse Archive →
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Strip */}
        <div className="mt-8 pt-8 border-t border-stone-800/80">
          <span className="text-[11px] font-mono text-stone-500 uppercase tracking-widest mb-3 block">
            Opening Night &amp; Atmosphere Snapshots:
          </span>
          <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            {exhibitionPhotos.slice(0, 10).map((filename, idx) => (
              <button
                key={filename}
                onClick={() => setActivePhotoIdx(idx)}
                className="relative shrink-0 w-28 sm:w-36 aspect-[4/3] rounded-xl overflow-hidden border border-stone-800 hover:border-amber-400 transition-all duration-300"
              >
                <Image
                  src={`/exhibition/${filename}`}
                  alt={`Exhibition view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Future Exhibitions & Workshops Timeline */}
      <div>
        <div className="mb-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300">
            Upcoming Calendar
          </span>
          <h3 className="text-3xl font-serif font-light text-linen-50 mt-1">
            Future Exhibitions &amp; Workshops
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXHIBITION_INFO.upcoming.map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-900/30 border border-stone-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-stone-700 transition-all duration-300"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-stone-800/80 text-amber-300/90 border border-stone-700 inline-block mb-3">
                  {item.focus}
                </span>
                <h4 className="text-xl font-serif text-linen-100 font-light">
                  {item.title}
                </h4>
                <div className="mt-2 text-xs font-mono text-stone-400 space-y-1">
                  <p className="flex items-center gap-1.5 text-amber-200/80">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-stone-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.gallery}, {item.city}</span>
                  </p>
                </div>
                <p className="mt-4 text-xs text-stone-400 font-sans leading-relaxed">
                  {item.note}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/60">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                  RSVP &amp; Catalog Details: Barnab Gallery
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox for Exhibition Photos */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-md"
            onClick={() => setActivePhotoIdx(null)}
          >
            <button
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIdx((activePhotoIdx - 1 + exhibitionPhotos.length) % exhibitionPhotos.length);
              }}
              className="absolute left-4 sm:left-8 z-30 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              className="relative max-w-4xl max-h-[85vh] p-3 sm:p-5 bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[72vh] aspect-[3/2] w-auto h-auto overflow-hidden rounded-lg">
                <Image
                  src={`/exhibition/${exhibitionPhotos[activePhotoIdx]}`}
                  alt={`Exhibition Documentation #${activePhotoIdx + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[72vh] w-auto h-auto rounded"
                  priority
                />
              </div>

              <div className="mt-4 flex items-center justify-between w-full px-2 text-xs font-mono text-stone-400">
                <span>Between Worlds Opening · Barnab Gallery</span>
                <span className="italic font-serif text-stone-300">Photo by Dea Shalamberidze</span>
                <span>{activePhotoIdx + 1} / {exhibitionPhotos.length}</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIdx((activePhotoIdx + 1) % exhibitionPhotos.length);
              }}
              className="absolute right-4 sm:right-8 z-30 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
