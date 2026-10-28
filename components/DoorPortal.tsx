"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight, Compass } from "lucide-react";

interface DoorPortalProps {
  onEnter: () => void;
  isOpen?: boolean;
}

export function DoorPortal({ onEnter, isOpen = false }: DoorPortalProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between px-6 py-10 sm:py-14 bg-[#0a0f1d] text-[#F5F2EB] overflow-hidden select-none"
    >
      {/* Celestial Background Canvas with stars and deep gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(30,58,138,0.35)_0%,rgba(10,15,29,0.95)_75%)]" />
        
        {/* Constellations / Glimmering stars inspired by moodboard */}
        <div className="absolute top-[12%] left-[18%] w-1.5 h-1.5 rounded-full bg-amber-200/90 shadow-[0_0_10px_#fde68a] animate-pulse" style={{ animationDuration: "3s" }} />
        <div className="absolute top-[22%] right-[24%] w-2 h-2 rounded-full bg-amber-100 shadow-[0_0_14px_#fde68a] animate-pulse" style={{ animationDuration: "4.5s" }} />
        <div className="absolute top-[35%] left-[10%] w-1 h-1 rounded-full bg-amber-300/70" />
        <div className="absolute bottom-[28%] left-[22%] w-1.5 h-1.5 rounded-full bg-amber-200/80 animate-pulse" style={{ animationDuration: "5s" }} />
        <div className="absolute top-[18%] right-[12%] w-1.5 h-1.5 rounded-full bg-amber-100/90 shadow-[0_0_8px_#fde68a]" />
        <div className="absolute bottom-[20%] right-[16%] w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_12px_#fde68a] animate-pulse" style={{ animationDuration: "3.5s" }} />
        
        {/* Subtle cross-flare star inspired by moodboard photo 868708226 */}
        <div className="absolute top-[15%] right-[28%] text-amber-200/80 text-xl animate-pulse" style={{ animationDuration: "6s" }}>✦</div>
        <div className="absolute bottom-[35%] left-[14%] text-amber-200/60 text-sm animate-pulse" style={{ animationDuration: "4s" }}>✧</div>
      </div>

      {/* Header Statement */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center z-10 max-w-xl"
      >
        <span className="inline-block text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-amber-200/75 mb-2">
          a collection of inner worlds
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-linen-100 drop-shadow-sm font-light">
          Rooms Within
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-400 font-serif italic tracking-wide">
          An artistic archive by Keso — Denmark &amp; Georgia
        </p>
      </motion.div>

      {/* The Central Arched Doorway */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center my-auto py-4 group"
      >
        <div className="relative w-56 sm:w-64 md:w-72 aspect-[3/5] cursor-pointer" onClick={handleOpen}>
          {/* Subtle Halo / Glow behind door */}
          <div className="absolute -inset-6 rounded-t-full bg-gradient-to-t from-transparent via-amber-400/10 to-cobalt-600/20 blur-2xl transition-all duration-700 group-hover:via-amber-400/25 group-hover:scale-105" />

          {/* Arched Architectural Frame */}
          <div className="relative w-full h-full rounded-t-full overflow-hidden border-2 border-stone-600/50 group-hover:border-amber-400/70 transition-all duration-500 shadow-2xl bg-stone-900">
            {/* Inner Light Beam during opening animation */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 z-20 mix-blend-screen origin-bottom filter blur-md"
                />
              )}
            </AnimatePresence>

            {/* Left and Right Door Leaves for 3D Swing */}
            <div className="relative w-full h-full flex [perspective:1000px]">
              {/* Left Leaf */}
              <motion.div
                animate={isOpening ? { rotateY: -110, x: -10 } : { rotateY: 0 }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                className="w-1/2 h-full relative origin-left overflow-hidden [transform-style:preserve-3d]"
              >
                <div className="relative w-[200%] h-full left-0">
                  <Image
                    src="/door.jpg"
                    alt="Sanctuary Door - Rooms Within"
                    fill
                    className="object-cover object-left"
                    priority
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </motion.div>

              {/* Right Leaf */}
              <motion.div
                animate={isOpening ? { rotateY: 110, x: 10 } : { rotateY: 0 }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                className="w-1/2 h-full relative origin-right overflow-hidden [transform-style:preserve-3d]"
              >
                <div className="relative w-[200%] h-full -left-[100%]">
                  <Image
                    src="/door.jpg"
                    alt="Sanctuary Door - Rooms Within"
                    fill
                    className="object-cover object-right"
                    priority
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </motion.div>
            </div>

            {/* Subtle Arch Highlight */}
            <div className="absolute inset-x-0 top-0 h-16 rounded-t-full pointer-events-none border-t border-amber-200/30" />
          </div>

          {/* Doorway Inscription */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 inset-x-0 text-center"
          >
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-stone-400 group-hover:text-amber-200 transition-colors">
              [ step inside ]
            </span>
          </motion.div>
        </div>

        {/* Enter Action Button */}
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className="mt-14 inline-flex items-center gap-3 px-7 py-3 rounded-full text-xs font-mono uppercase tracking-[0.25em] text-linen-100 bg-stone-900/80 hover:bg-amber-400 hover:text-stone-950 border border-stone-700/80 hover:border-amber-300 transition-all duration-300 shadow-lg group-hover:scale-105 active:scale-95"
        >
          {isOpening ? (
            <span>Entering worlds...</span>
          ) : (
            <>
              <span>Enter here</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </motion.div>

      {/* Footer / Skip intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-full flex justify-between items-center text-[11px] font-mono text-stone-500 tracking-widest uppercase z-10 max-w-5xl px-4"
      >
        <span className="hidden sm:inline">Between Denmark &amp; Georgia</span>
        <button
          onClick={onEnter}
          className="hover:text-amber-200 underline underline-offset-4 transition-colors ml-auto sm:ml-0"
        >
          Direct Walkthrough →
        </button>
      </motion.div>
    </motion.section>
  );
}
