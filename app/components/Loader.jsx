"use client";
import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

export default function GlobalLoader() {
  const { progress, active } = useProgress();
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      // Delay slightly for smooth transition
      const timer = setTimeout(() => {
        setIsFinished(true);
        // Enable scrolling
        document.body.style.overflow = "auto";

        // Final fade out animation
        gsap.to(".global-loader", {
          opacity: 0,
          pointerEvents: "none",
          duration: 1,
          ease: "power2.inOut",
        });
      }, 500);
      return () => clearTimeout(timer);
    } else {
      // Lock scrolling while loading
      document.body.style.overflow = "hidden";
    }
  }, [progress]);

  if (isFinished && progress === 100) return null;

  return (
    <div className="global-loader fixed inset-0 z-10000 flex flex-col items-center justify-center bg-[#020617] transition-opacity duration-1000">
      <div className="relative flex flex-col items-center">
        {/* Animated DNA/Scientific Ring */}
        <div className="relative w-32 h-32 mb-10">
          <div className="absolute inset-0 border-4 border-teal-500/10 rounded-full" />
          <div
            className="absolute inset-0 border-4 border-t-teal-500 rounded-full animate-spin"
            style={{ animationDuration: "2s" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-black text-2xl">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-white text-2xl font-black uppercase tracking-[0.4em] mb-4">
            Mohamed <span className="text-teal-400">Elshshtawy</span>
          </h2>
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full bg-linear-to-r from-teal-500 to-cyan-400 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(20,184,166,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-6 text-slate-500 font-bold uppercase tracking-widest text-[10px] animate-pulse">
            Configuring Computational Environment...
          </p>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
