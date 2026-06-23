"use client";

import React from "react";
import { DEV } from "@/lib/constants";

export default function Hero() {
  return (
    <div className="relative w-72 lg:w-80 animate-float">
      <div className="relative rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] shadow-card hover:shadow-card-hover transition-transform duration-500 transform hover:scale-105">
        <img
          src={DEV.heroCardImage ?? DEV.heroImage}
          alt={`Photo of ${DEV.name}`}
          className="w-full h-80 object-cover object-center"
        />

        {/* subtle gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent dark:from-black/50 mix-blend-multiply" />

        {/* name/title pill */}
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/70 border border-[var(--border)] rounded-xl px-4 py-2 backdrop-blur-sm">
          <div className="font-display text-sm font-semibold text-[var(--text-primary)]">{DEV.name}</div>
          <div className="text-xs text-[var(--accent)]">{DEV.title}</div>
        </div>
      </div>

      {/* decorative glow */}
      <div className="absolute -inset-2 rounded-3xl pointer-events-none opacity-60 blur-2xl bg-gradient-to-br from-accent/30 to-indigo-400/10" />
    </div>
  );
}
