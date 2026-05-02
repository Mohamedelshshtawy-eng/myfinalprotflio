"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Cursor from "../components/Cursor";
import { useRouter } from "next/navigation";

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
  const [showCVModal, setShowCVModal] = useState(false);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const router = useRouter();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("contact");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      const marqueeWidth = marqueeRef.current.scrollWidth / 3;
      gsap.to(marqueeRef.current, {
        x: -marqueeWidth,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      if (showCVModal) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
        );
        gsap.fromTo(
          modalContentRef.current,
          { scale: 0.8, y: 20, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
        );
      }
    },
    { dependencies: [showCVModal], scope: containerRef },
  );

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col justify-center items-center px-10 pt-20 overflow-hidden bg-white z-10"
      >
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center mb-20 md:mb-32 md:-translate-y-10">
          {/* Left: Image with Rotating Border - Now appears first on mobile */}
          <div className="flex justify-center items-center relative order-1 md:order-1 -translate-y-10 md:-translate-y-8">
            <div
              ref={imageRef}
              className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
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
                  className="w-full h-full object-cover object-[center_30%]"
                />
              </div>
            </div>
          </div>

          {/* Right: Description Text */}
          <div
            className="hero-text-content text-center md:text-left flex flex-col gap-3 md:gap-6 order-2 md:order-2 -translate-y-10 md:translate-y-0"
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
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
              <button 
                onClick={scrollToAbout}
                className="px-6 md:px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30 text-sm md:text-base"
              >
                Contact Me
              </button>
              <button
                onClick={() => setShowCVModal(true)}
                className="px-6 md:px-8 py-3 border-2 border-teal-600 text-teal-600 font-bold rounded-full transition-all hover:bg-teal-600 hover:text-white transform hover:scale-105 shadow-lg shadow-teal-500/10 text-sm md:text-base"
              >
                My CV
              </button>
            </div>
          </div>
        </div>

        {/* Bottom: Infinite Tech Bar - Moved Lower */}
        <div className="absolute bottom-[-10px] md:bottom-0 left-0 w-full overflow-hidden py-10 bg-white/80 backdrop-blur-md border-t border-slate-100 z-20">
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

      {/* CV Selection Modal */}
      {showCVModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setShowCVModal(false)}
        >
          <div
            ref={modalContentRef}
            className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                    Select <span className="text-teal-600">CV Type</span>
                  </h2>
                  <p className="text-slate-600 font-medium">
                    Choose which version of my professional journey you'd like
                    to explore.
                  </p>
                </div>
                <button
                  onClick={() => setShowCVModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Teacher CV */}
                <a
                  href="/Teacher-CV.pdf"
                  target="_blank"
                  className="group relative flex flex-col p-6 rounded-2xl border-2 border-slate-100 hover:border-teal-500 transition-all hover:shadow-xl hover:shadow-teal-500/10 bg-slate-50/50"
                >
                  <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                      <path d="M8 7h6"></path>
                      <path d="M8 11h8"></path>
                      <path d="M8 15h6"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Teacher CV
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Focuses on educational background, sciences, and teaching
                    experience.
                  </p>
                  <div className="mt-4 flex items-center text-teal-600 font-bold text-sm">
                    View PDF
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </a>

                {/* Software CV */}
                <a
                  href="/Software-CV.pdf"
                  target="_blank"
                  className="group relative flex flex-col p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 transition-all hover:shadow-xl hover:shadow-indigo-500/10 bg-slate-50/50"
                >
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Software CV
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Focuses on full-stack development, technologies, and digital
                    solutions.
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 font-bold text-sm">
                    View PDF
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
