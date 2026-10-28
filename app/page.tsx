"use client";

import React, { useState, useEffect } from "react";
import { DoorPortal } from "@/components/DoorPortal";
import { Navigation } from "@/components/Navigation";
import { PaintingShowcase } from "@/components/PaintingShowcase";
import { NotebooksGallery } from "@/components/NotebooksGallery";
import { FragmentsGallery } from "@/components/FragmentsGallery";
import { ExhibitionsSection } from "@/components/ExhibitionsSection";
import { AboutSection } from "@/components/AboutSection";
import { PaintingModal } from "@/components/PaintingModal";
import { CollectorInquiryModal } from "@/components/CollectorInquiryModal";
import { GrainOverlay } from "@/components/GrainOverlay";
import { CustomCursor } from "@/components/CustomCursor";
import { MAIN_PAINTINGS, Painting } from "@/data/artworks";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showPortal, setShowPortal] = useState(true);
  const [activeSection, setActiveSection] = useState("paintings");
  const [modalPainting, setModalPainting] = useState<Painting | null>(null);
  const [inquiryPainting, setInquiryPainting] = useState<Painting | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<string>("Archival Poster Print");

  const handleEnterExhibition = () => {
    setShowPortal(false);
  };

  const handleOpenPortal = () => {
    setShowPortal(true);
  };

  const handleSelectPainting = (painting: Painting) => {
    setModalPainting(painting);
  };

  const handleInquirePainting = (painting: Painting) => {
    setInquiryPainting(painting);
    setInquiryType("Archival Poster Print");
    setIsInquiryOpen(true);
  };

  const handleOpenGeneralInquiry = (initialSubject?: string) => {
    setInquiryPainting(null);
    if (initialSubject) {
      setInquiryType(initialSubject);
    }
    setIsInquiryOpen(true);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Observe active section on scroll
  useEffect(() => {
    if (showPortal) return;

    const sections = ["paintings", "notebooks", "fragments", "gatherings", "about"];
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showPortal]);

  return (
    <div className="relative min-h-screen bg-[#0d1322] text-[#F5F2EB] selection:bg-amber-300 selection:text-stone-950 font-sans overflow-x-hidden">
      {/* Tactile Analog Grain Overlay */}
      <GrainOverlay />

      {/* Gentle Floating Celestial Cursor */}
      <CustomCursor />

      {/* Front Architectural Portal Doorway */}
      <AnimatePresence>
        {showPortal && <DoorPortal onEnter={handleEnterExhibition} />}
      </AnimatePresence>

      {/* Main Sanctuary & Rooms Experience */}
      {!showPortal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="relative z-10"
        >
          {/* Top Gallery Navigation */}
          <Navigation
            activeSection={activeSection}
            onNavigate={scrollToSection}
            onOpenPortal={handleOpenPortal}
            onOpenInquiry={handleOpenGeneralInquiry}
          />

          <main className="pt-24 sm:pt-28">
            {/* ROOM I: THE MAIN PAINTINGS */}
            <PaintingShowcase
              onSelectPainting={handleSelectPainting}
              onInquirePainting={handleInquirePainting}
            />

            {/* ROOM II: NOTEBOOK PAINTINGS */}
            <NotebooksGallery />

            {/* ROOM III: FRAGMENTS & WRITINGS */}
            <FragmentsGallery />

            {/* ROOM IV: EXHIBITIONS & GATHERINGS */}
            <ExhibitionsSection />

            {/* ROOM V: ABOUT, STUDIO & WORDS */}
            <AboutSection onOpenInquiry={handleOpenGeneralInquiry} />
          </main>
        </motion.div>
      )}

      {/* Full-Screen Painting Detail Modal */}
      <PaintingModal
        painting={modalPainting}
        onClose={() => setModalPainting(null)}
        onInquire={(painting) => {
          setModalPainting(null);
          handleInquirePainting(painting);
        }}
      />

      {/* Collector & Poster Inquiry Modal */}
      <CollectorInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        selectedPainting={inquiryPainting}
        initialType={inquiryType}
      />
    </div>
  );
}
