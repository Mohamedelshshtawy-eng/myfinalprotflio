"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Cursor from "../components/Cursor";

const technologies = [
  "React",
  "Next.js",
  "Spring Boot",
  "NestJS",
  "Express.js",
  "Go",
  "Docker",
  "Kubernetes",
  "MySQL",
  "MongoDB",
  "React Native",
  "Machine Learning",
  "Deep Learning",
  "AI",
  "Data Science",
  "Data Analysis",
];

const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const borderRef = useRef(null);
  const textRef = useRef(null);
  const marqueeRef = useRef(null);

  useGSAP(
    () => {
      // 1. Image entering from the left
      gsap.fromTo(
        imageRef.current,
        { x: -200, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" },
      );

      // 2. Rotating dashed border
      gsap.to(borderRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });

      // 3. Text appearing from the right
      gsap.fromTo(
        ".hero-text-content > *",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
        },
      );

      // 4. Infinite Tech Bar (Marquee)
      gsap.to(marqueeRef.current, {
        x: "-50%",
        duration: 30,
        repeat: -1,
        ease: "linear",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-10 pt-20 overflow-hidden bg-white z-10"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center mb-20 md:mb-32 md:-translate-y-10">
        {/* Left: Image with Rotating Border */}
        <div className="flex justify-center items-center relative order-2 md:order-1 -translate-y-4 md:-translate-y-8">
          <div
            ref={imageRef}
            className="relative w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            {/* Rotating Dashed Border */}
            <div
              ref={borderRef}
              className="absolute inset-[-15px] md:inset-[-20px] border-4 border-dashed border-teal-600/50 rounded-full"
            />
            {/* Image Circle */}
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-slate-100 shadow-2xl shadow-teal-500/10 bg-slate-50">
              <img
                src="/two.jpeg"
                alt="Mohamed Elshshtawy"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Right: Description Text */}
        <div
          className="hero-text-content text-center md:text-left flex flex-col gap-4 md:gap-6 order-1 md:order-2"
          dir="ltr"
        >
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight">
            Mohamed <span className="text-teal-600">Elshshtawy</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-700 font-medium leading-relaxed px-4 md:px-0">
            The visionary who bridged the worlds of{" "}
            <span className="text-teal-600 font-bold">Chemistry</span>,
            <span className="text-indigo-600 font-bold"> Zoology</span>, and{" "}
            <span className="text-blue-600 font-bold">
              Software Engineering
            </span>
            .
          </p>
          <p className="text-sm md:text-lg text-slate-600 max-w-xl mx-auto md:mx-0 font-medium px-6 md:px-0">
            A unique personality with boundless ambition and a profound
            understanding of natural sciences and advanced software
            technologies. I always strive to transform complexity into
            simplicity and science into intelligent digital solutions.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <button className="px-6 md:px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30 text-sm md:text-base">
              Contact Me
            </button>
            <button className="px-6 md:px-8 py-3 border-2 border-slate-200 hover:border-teal-600 text-slate-700 font-bold rounded-full transition-all hover:text-teal-600 text-sm md:text-base">
              My Work
            </button>
          </div>
        </div>
      </div>

      {/* Bottom: Infinite Tech Bar - Moved Lower */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden py-8 bg-white/80 backdrop-blur-md border-t border-slate-100 z-20">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap gap-12 items-center w-max px-6"
        >
          {/* Multiple sets for seamless looping */}
          {[...technologies, ...technologies, ...technologies].map(
            (tech, index) => (
              <div key={index} className="flex items-center gap-6">
                <span className="text-2xl md:text-3xl font-black text-slate-300 hover:text-teal-600 transition-colors cursor-default uppercase tracking-widest px-4">
                  {tech}
                </span>
                <div className="w-3 h-3 bg-teal-600/20 rounded-full" />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
