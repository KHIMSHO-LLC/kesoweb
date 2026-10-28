"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AmbientSound } from "./AmbientSound";
import { Menu, X, DoorOpen, Compass, Mail, Sparkles } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPortal: () => void;
  onOpenInquiry: (initialSubject?: string) => void;
}

export function Navigation({
  activeSection,
  onNavigate,
  onOpenPortal,
  onOpenInquiry,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "paintings", label: "I. Paintings", highlight: true },
    { id: "notebooks", label: "II. Notebooks" },
    { id: "fragments", label: "III. Fragments" },
    { id: "gatherings", label: "IV. Gatherings" },
    { id: "about", label: "V. Studio & Words" },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-stone-950/85 backdrop-blur-md border-b border-stone-800/60 shadow-lg shadow-black/20"
            : "py-5 sm:py-6 bg-gradient-to-b from-stone-950/80 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo / Door Link */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenPortal}
              title="Return to the Entrance Portal"
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-full border border-stone-700 group-hover:border-amber-400/80 flex items-center justify-center transition-all duration-300 bg-stone-900/60 group-hover:bg-amber-400/10">
                <DoorOpen className="w-4 h-4 text-stone-300 group-hover:text-amber-300 transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-wider text-base sm:text-lg text-linen-50 font-normal uppercase group-hover:text-amber-200 transition-colors">
                  Keso
                </span>
                <span className="text-[9px] font-mono tracking-widest text-stone-400 uppercase -mt-0.5">
                  Rooms Within
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-stone-900/40 border border-stone-800/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-3.5 py-1 text-xs font-mono tracking-wider transition-all duration-300 rounded-full ${
                    isActive
                      ? "text-amber-300 font-medium"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-stone-800/80 rounded-full border border-amber-400/30"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.label}
                    {item.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <AmbientSound />

            <button
              onClick={() => onOpenInquiry("Art Posters & Originals Inquiry")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-stone-900 bg-amber-200 hover:bg-amber-100 transition-all duration-300 font-medium shadow-sm hover:scale-105 active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-24 px-6 bg-stone-950/95 backdrop-blur-xl md:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-300/70 border-b border-stone-800 pb-2">
                The Rooms of Expression
              </span>
              {navItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="flex items-center justify-between text-left py-3 text-lg font-serif tracking-wide text-stone-200 hover:text-amber-200 border-b border-stone-900"
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.highlight && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Main
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-mono text-stone-600">0{idx + 1}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-stone-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 text-center text-xs font-mono uppercase tracking-widest text-stone-950 bg-amber-200 rounded-lg font-medium"
              >
                Inquire / Buy Posters
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-3 text-center text-xs font-mono uppercase tracking-widest text-stone-400 border border-stone-800 rounded-lg hover:text-stone-200"
              >
                Enter Portal Door
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
