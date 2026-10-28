"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const toggleSound = () => {
    if (!isPlaying) {
      startSound();
    } else {
      stopSound();
    }
  };

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Warm celestial chord frequencies: A2 (110Hz), E3 (164.8Hz), A3 (220Hz), C#4 (277.18Hz), E4 (329.6Hz)
      const freqs = [110.0, 164.81, 220.0, 277.18, 329.63];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        const oscGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Add subtle detune for warm chorus texture
        osc.detune.setValueAtTime((idx - 2) * 4.5, ctx.currentTime);

        // Warm analog lowpass filter
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);
        filter.Q.setValueAtTime(1.2, ctx.currentTime);

        // Individual volume balance
        oscGain.gain.setValueAtTime(0.18 / (idx + 1), ctx.currentTime);

        // Slow LFO for organic breath
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.08 + idx * 0.03, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        lfo.start();

        if (panner) {
          panner.pan.setValueAtTime((idx - 2) * 0.35, ctx.currentTime);
          osc.connect(filter);
          filter.connect(panner);
          panner.connect(oscGain);
        } else {
          osc.connect(filter);
          filter.connect(oscGain);
        }

        oscGain.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  };

  const stopSound = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
      setTimeout(() => {
        oscillatorsRef.current.forEach((o) => {
          try {
            o.stop();
            o.disconnect();
          } catch {}
        });
        oscillatorsRef.current = [];
        ctx.close();
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 1600);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Mute room atmosphere sound" : "Listen to room atmosphere"}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border backdrop-blur-md bg-stone-900/40 text-stone-300 border-stone-700/60 hover:border-amber-400/50 hover:text-amber-200"
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="hidden sm:inline">ATMOSPHERE: ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-200" />
          <span className="hidden sm:inline">ROOM SOUND</span>
        </>
      )}
    </button>
  );
}
