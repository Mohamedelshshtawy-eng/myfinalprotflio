"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

export default function ZoomSection() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const whiteOverlayRef = useRef(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        svgRef.current,
        {
          opacity: 0,
          scale: 0.1,
        },
        {
          opacity: 1,
          duration: 0.2,
          ease: "power1.out",
        },
      )
        .to(
          svgRef.current,
          {
            scale: 150,
            duration: 1,
            ease: "power2.in",
          },
          0,
        )
        .to(
          whiteOverlayRef.current,
          {
            opacity: 1,
            duration: 0.2,
            ease: "none",
          },
          "-=0.15",
        ); // White-out transition at the final stage
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-transparent overflow-hidden flex items-center justify-center m-0 p-0"
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          {/* <Sparkles
            count={200}
            scale={12}
            size={2}
            speed={0.4}
            opacity={0.6}
            color="#22d3ee"
          /> */}
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* SVG Text Layer */}
      <div
        ref={svgRef}
        className="relative z-10 w-full max-w-4xl px-4 flex items-center justify-center will-change-transform"
      >
        <svg viewBox="0 0 400 100" className="w-full">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white font-black uppercase"
            style={{ fontSize: "50px", letterSpacing: "-1px" }}
          >
            WAIT
          </text>
        </svg>
      </div>

      {/* Final White Overlay - Covers all elements and 3D scene */}
      <div
        ref={whiteOverlayRef}
        className="absolute inset-0 bg-white opacity-0 z-[100] pointer-events-none"
      />
    </section>
  );
}
