"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Hand-drawn star SVG paths — organic, imperfect shapes inspired by painted/ink stars
const STAR_PATHS = [
  // 5-point star, slightly wonky
  "M12 1.5 L14.5 8.2 L21.5 9 L16.3 13.8 L17.8 21 L12 17.2 L6.2 21 L7.7 13.8 L2.5 9 L9.5 8.2 Z",
  // 6-point star, hand-drawn feel
  "M12 0 L14.5 8 L22 5.5 L16.5 12 L22 18.5 L14.5 16 L12 24 L9.5 16 L2 18.5 L7.5 12 L2 5.5 L9.5 8 Z",
  // Small diamond sparkle
  "M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z",
  // Chunky hand-drawn star
  "M12 0 L15 7.5 L23 8.5 L17 14 L18.5 22 L12 18 L5.5 22 L7 14 L1 8.5 L9 7.5 Z",
  // Tiny 4-point sparkle
  "M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z",
];

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  pathIndex: number;
  opacity: number;
  delay: number;
  duration: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function StarsBackground() {
  const stars = useMemo(() => {
    const rand = seededRandom(42);
    const result: Star[] = [];

    // Create ~60 stars scattered across the page
    for (let i = 0; i < 65; i++) {
      result.push({
        id: i,
        x: rand() * 100,
        y: rand() * 100,
        size: 6 + rand() * 22, // 6px to 28px
        rotation: rand() * 360,
        pathIndex: Math.floor(rand() * STAR_PATHS.length),
        opacity: 0.03 + rand() * 0.09, // Very subtle: 3% to 12%
        delay: rand() * 8,
        duration: 6 + rand() * 10, // 6-16s twinkle cycle
      });
    }
    return result;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: star.opacity * 0.5 }}
          animate={{
            opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.5],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox={star.pathIndex === 2 ? "0 0 12 12" : star.pathIndex === 4 ? "0 0 8 8" : "0 0 24 24"}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${star.rotation}deg)` }}
            className="w-full h-full"
          >
            <path
              d={STAR_PATHS[star.pathIndex]}
              fill="#F5F2EB"
              stroke="#F5F2EB"
              strokeWidth="0.3"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      ))}

      {/* A few larger, even more subtle "ghost" stars for depth */}
      {[
        { x: 8, y: 15, s: 50, r: 20, o: 0.025 },
        { x: 78, y: 35, s: 45, r: 140, o: 0.02 },
        { x: 45, y: 65, s: 55, r: 70, o: 0.022 },
        { x: 92, y: 80, s: 40, r: 200, o: 0.018 },
        { x: 20, y: 85, s: 48, r: 310, o: 0.02 },
      ].map((ghost, i) => (
        <motion.div
          key={`ghost-${i}`}
          className="absolute"
          style={{
            left: `${ghost.x}%`,
            top: `${ghost.y}%`,
            width: ghost.s,
            height: ghost.s,
          }}
          animate={{
            opacity: [ghost.o * 0.5, ghost.o, ghost.o * 0.6],
            rotate: [ghost.r, ghost.r + 8, ghost.r],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d={STAR_PATHS[1]}
              fill="#F5F2EB"
              stroke="#F5F2EB"
              strokeWidth="0.2"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
