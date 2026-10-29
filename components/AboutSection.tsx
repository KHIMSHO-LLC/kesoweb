"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ARTIST_INFO } from "@/data/artworks";
import { Instagram, Mail, Sparkles, Send, CheckCircle2, Compass, Heart } from "lucide-react";

interface AboutSectionProps {
  onOpenInquiry: (initialSubject?: string) => void;
}

export function AboutSection({ onOpenInquiry }: AboutSectionProps) {
  const [formSent, setFormSent] = useState(false);
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <section id="about" className="section-aura aura-about relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-stone-800/80">
      {/* Editorial Artist Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait & Studio Journal */}
        <div className="lg:col-span-5 space-y-8">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl group">
            <Image
              src="/exhibition/_DSC1524.JPG"
              alt="Keso - Visual Artist"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-300">
                Visual Artist
              </span>
              <h3 className="text-3xl font-serif text-linen-50 mt-1 font-light">
                {ARTIST_INFO.name}
              </h3>
              <p className="text-xs font-mono text-stone-400 mt-1">
                Kutaisi, Georgia &amp; Denmark
              </p>
            </div>
          </div>

          {/* Studio Section note from PDF */}
          <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800/90 text-xs font-mono space-y-3">
            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest text-[11px]">The Studio / Atelier Note</span>
            </div>
            <p className="text-stone-300 font-sans leading-relaxed">
              "I don't have pictures of the process of me painting, but it is for future uploads."
            </p>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              The studio remains a private sanctuary where pigments, coffee, tears, and conversations on
              the edge of the universe take material form. Process documentation will be unveiled in upcoming
              seasons.
            </p>
          </div>
        </div>

        {/* Right Column: Statement, Heritage & Contact */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300">
                Room V · The Voice &amp; Origins
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-serif font-light text-linen-50 tracking-tight leading-[1.15]">
              "Just a Danish / Georgian girl."
            </h2>

            <blockquote className="mt-6 font-serif italic text-2xl sm:text-3xl text-stone-200 leading-snug pl-6 border-l-2 border-amber-400/60">
              "{ARTIST_INFO.statement}"
            </blockquote>
          </div>

          {/* Bio text */}
          <div className="space-y-4 text-stone-300 text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
            <p>
              Growing up between Scandinavian landscapes and Georgia's ancient, tactile emotional geography,
              Keso creates paintings that live in thresholds. Her canvases examine how memory folds,
              how grief and playfulness coexist, and why certain objects—a childhood vase, a coffee cup,
              a tall stilt-legged white creature—remain anchored while everything else shifts.
            </p>
            <p>
              Her work has been exhibited at Barnab Gallery in Kutaisi, with upcoming photo and video
              art installations in 2026–2027 and recurring intuitive studio workshops.
            </p>
          </div>

          {/* Social & Inquiries Bar */}
          <div className="pt-6 border-t border-stone-800/80 flex flex-wrap items-center gap-4">
            <a
              href="https://www.instagram.com/platform.888/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-stone-900 border border-stone-700/80 hover:border-amber-400/60 text-stone-200 hover:text-amber-200 text-xs font-mono uppercase tracking-widest transition-all"
            >
              <Instagram className="w-4 h-4 text-amber-300" />
              <span>@platform.888</span>
            </a>

            <button
              onClick={() => onOpenInquiry("Art Posters Inquiry")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-200 hover:bg-amber-100 text-stone-950 text-xs font-mono uppercase tracking-widest font-medium transition-all shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Inquire for Posters &amp; Works</span>
            </button>
          </div>

          {/* Direct Studio Message Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/30 border border-stone-800">
            {!formSent ? (
              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-400 block">
                  Studio Correspondence
                </span>
                <h4 className="text-xl font-serif text-linen-100 font-light">
                  Leave a thought or word for Keso
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-400/60"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-400/60"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="A reflection on a painting, gallery inquiry, or note between worlds..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-400/60 text-xs font-mono resize-none"
                />

                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-full text-xs font-mono uppercase tracking-widest text-stone-900 bg-amber-200 hover:bg-amber-100 font-medium transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Note</span>
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-amber-300 mx-auto" />
                <h5 className="text-lg font-serif text-linen-100">Note transmitted into the rooms</h5>
                <p className="text-xs text-stone-400 font-mono">
                  Thank you, {senderName}. Keso will receive your thoughts directly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer credits & Colophon */}
      <div className="mt-24 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-500 gap-4">
        <div>
          <span>© 2026 Keso · Rooms Within · All rights reserved</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/platform.888/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-300 transition-colors"
          >
            Instagram: @platform.888
          </a>
          <span>Barnab Gallery, Kutaisi</span>
        </div>
      </div>
    </section>
  );
}
