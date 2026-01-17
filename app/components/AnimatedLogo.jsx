"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const AnimatedLogo = ({ isSmall }) => {
  const containerRef = useRef();
  const dnaRef = useRef();
  const flaskRef = useRef();
  const liquidRef = useRef();

  useEffect(() => {
    if (!isSmall) return;

    // DNA rotation animation
    gsap.to(dnaRef.current, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: "none",
    });

    // Flask liquid bubble animation
    gsap.to(liquidRef.current, {
      y: -3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // DNA helix pulsing
    gsap.to(dnaRef.current, {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [isSmall]);

  if (!isSmall) {
    return (
      <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-300 via-cyan-400 to-blue-500 whitespace-nowrap drop-shadow-[0_0_30px_rgba(20,184,166,0.5)]">
        Mohamed Elshshtawy
      </h1>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-3 p-3 bg-linear-to-br from-slate-800/80 to-indigo-900/80 backdrop-blur-md rounded-2xl border border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.3)]"
    >
      {/* DNA Icon */}
      <svg
        ref={dnaRef}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* DNA Helix */}
        <path
          d="M10,5 Q15,10 10,15 Q5,20 10,25 Q15,30 10,35"
          stroke="url(#dnaGradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M30,5 Q25,10 30,15 Q35,20 30,25 Q25,30 30,35"
          stroke="url(#dnaGradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* DNA Base Pairs */}
        <line
          x1="10"
          y1="8"
          x2="30"
          y2="8"
          stroke="#5eead4"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <line
          x1="10"
          y1="15"
          x2="30"
          y2="15"
          stroke="#22d3ee"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <line
          x1="10"
          y1="22"
          x2="30"
          y2="22"
          stroke="#3b82f6"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <line
          x1="10"
          y1="29"
          x2="30"
          y2="29"
          stroke="#5eead4"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* DNA Dots */}
        <circle cx="10" cy="8" r="2" fill="#5eead4" />
        <circle cx="30" cy="8" r="2" fill="#5eead4" />
        <circle cx="10" cy="22" r="2" fill="#3b82f6" />
        <circle cx="30" cy="22" r="2" fill="#3b82f6" />
      </svg>

      {/* Name Text */}
      <span className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-300 via-cyan-400 to-blue-500 whitespace-nowrap">
        M. Elshshtawy
      </span>

      {/* Flask Icon */}
      <svg
        ref={flaskRef}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="flaskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Flask Body */}
        <path
          d="M15,5 L15,15 L8,30 Q8,35 12,35 L28,35 Q32,35 32,30 L25,15 L25,5 Z"
          fill="none"
          stroke="#5eead4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Flask Neck */}
        <rect
          x="15"
          y="3"
          width="10"
          height="4"
          fill="none"
          stroke="#5eead4"
          strokeWidth="2"
          rx="1"
        />

        {/* Liquid */}
        <g ref={liquidRef}>
          <path
            d="M10,28 Q10,32 14,32 L26,32 Q30,32 30,28 L24,18 L16,18 Z"
            fill="url(#flaskGradient)"
            opacity="0.7"
          />
          {/* Bubbles */}
          <circle cx="18" cy="26" r="1.5" fill="#5eead4" opacity="0.6" />
          <circle cx="22" cy="24" r="1" fill="#22d3ee" opacity="0.6" />
          <circle cx="25" cy="27" r="1.2" fill="#3b82f6" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedLogo;
