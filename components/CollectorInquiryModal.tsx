"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Instagram, Mail, Sparkles, HelpCircle } from "lucide-react";
import { Painting } from "@/data/artworks";

interface CollectorInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPainting?: Painting | null;
  initialType?: string;
}

export function CollectorInquiryModal({
  isOpen,
  onClose,
  selectedPainting,
  initialType = "Archival Poster Print",
}: CollectorInquiryModalProps) {
  const [interestType, setInterestType] = useState(initialType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("Worldwide");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-linen-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800/50 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-300">
                  Collector &amp; Editions Bureau
                </span>
                <h3 className="text-2xl font-serif text-linen-50 mt-1 font-light">
                  {selectedPainting ? `Inquire about "${selectedPainting.title}"` : "Collector & Poster Inquiry"}
                </h3>
                <p className="mt-1 text-xs text-stone-400 font-sans leading-relaxed">
                  Paintings are primarily available as museum-grade archival poster prints. Original canvases
                  available upon private curator review.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                {/* Interest Type */}
                <div>
                  <label className="block text-stone-400 uppercase tracking-wider mb-1.5 text-[11px]">
                    Inquiry Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Archival Poster Print",
                      "Original Canvas",
                      "Exhibition / Loan",
                      "Private Commission",
                    ].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setInterestType(t)}
                        className={`py-2 px-3 rounded-lg border text-left transition-all ${
                          interestType === t
                            ? "bg-amber-400/15 border-amber-400/80 text-amber-200"
                            : "bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Work Details */}
                {selectedPainting && (
                  <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800/90 flex items-center justify-between">
                    <div>
                      <p className="text-linen-100 font-serif text-sm font-medium">
                        {selectedPainting.title} ({selectedPainting.year})
                      </p>
                      <p className="text-stone-400 text-[10px]">{selectedPainting.medium} · {selectedPainting.dimensions}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      Selected
                    </span>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-400 uppercase tracking-wider mb-1 text-[11px]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maria Lind"
                      className="w-full px-3 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-400/70 transition-colors text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 uppercase tracking-wider mb-1 text-[11px]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-3 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-400/70 transition-colors text-xs"
                    />
                  </div>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-stone-400 uppercase tracking-wider mb-1 text-[11px]">
                    Shipping / Inhabiting Region
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-stone-950/80 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-400/70 text-xs"
                  >
                    <option value="Georgia (Kutaisi / Tbilisi)">Georgia (Kutaisi / Tbilisi)</option>
                    <option value="Denmark / Scandinavia">Denmark / Scandinavia</option>
                    <option value="European Union">European Union</option>
                    <option value="United States / Canada">United States / Canada</option>
                    <option value="Worldwide">Worldwide Delivery</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-stone-400 uppercase tracking-wider mb-1 text-[11px]">
                    Notes or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specific poster size preference, framing request, or personal note..."
                    className="w-full px-3 py-2 rounded-lg bg-stone-950/80 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-400/70 transition-colors text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-widest text-stone-950 bg-amber-200 hover:bg-amber-100 font-medium transition-all shadow-md flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>

              {/* Direct Alternative */}
              <div className="mt-4 pt-4 border-t border-stone-800 text-center">
                <p className="text-[11px] text-stone-500 font-mono">
                  Prefer direct contact? Reach Keso on Instagram{" "}
                  <a
                    href="https://www.instagram.com/platform.888/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-300 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    @platform.888 <Instagram className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </>
          ) : (
            /* Success confirmation screen */
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-serif text-linen-50 font-light">
                Inquiry Received
              </h4>

              <p className="text-xs text-stone-300 max-w-sm mx-auto font-sans leading-relaxed">
                Thank you, <span className="text-amber-200 font-medium">{name}</span>. Your interest in{" "}
                <span className="italic font-serif text-linen-100">
                  {selectedPainting ? `"${selectedPainting.title}"` : "Keso's works"}
                </span>{" "}
                has been logged. We will reach back to <span className="text-amber-200">{email}</span> with print
                editions and collector availability.
              </p>

              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800/80 text-left text-xs font-mono space-y-2 max-w-sm mx-auto">
                <p className="text-stone-400">
                  <span className="text-stone-500">Edition:</span> {interestType}
                </p>
                <p className="text-stone-400">
                  <span className="text-stone-500">Destination:</span> {region}
                </p>
                <p className="text-stone-400">
                  <span className="text-stone-500">Studio:</span> Barnab Gallery / Keso Atelier
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`mailto:inquiries@kesoart.com?subject=Inquiry for ${selectedPainting?.title || "Artwork"}&body=Hi Keso, my name is ${name} (${email}). I'm interested in ${interestType}. Notes: ${notes}`}
                  className="py-2.5 px-4 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send direct email</span>
                </a>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-5 rounded-lg bg-amber-200 hover:bg-amber-100 text-stone-950 font-medium text-xs font-mono transition-colors"
                >
                  Return to Exhibition
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
