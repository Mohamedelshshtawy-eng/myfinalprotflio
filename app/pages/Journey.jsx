"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const pathMobileRef = useRef(null);

  const points = [
    {
      id: "science",
      title: "Faculty of Science",
      subtitle: "Chemistry & Zoology Graduate",
      description:
        "The beginning of my scientific journey, building a strong foundation in biological and chemical systems.",
      icon: "🧪",
      side: "right",
    },
    {
      id: "frontend",
      title: "Frontend Development",
      subtitle: "Crafting Interfaces",
      description:
        "Stepping into the digital world by learning how to build beautiful and responsive user interfaces.",
      icon: "💻",
      side: "left",
    },
    {
      id: "backend",
      title: "Backend Development",
      subtitle: "The Logic Behind",
      description:
        "Mastering server-side logic, APIs, and the architecture that powers modern web applications.",
      icon: "⚙️",
      side: "right",
    },
    {
      id: "database",
      title: "Database Engineering",
      subtitle: "Structured Knowledge",
      description:
        "Efficiently organizing and managing vast amounts of data using SQL and NoSQL systems.",
      icon: "🗄️",
      side: "left",
    },
    {
      id: "mobile",
      title: "Mobile App Development",
      subtitle: "Apps in Your Pocket",
      description:
        "Expanding into mobile ecosystems to deliver seamless experiences on iOS and Android.",
      icon: "📱",
      side: "right",
    },
    {
      id: "data-engineer",
      title: "Data Engineering",
      subtitle: "Building Pipelines",
      description:
        "Creating robust data pipelines and ETL processes to handle big data at scale.",
      icon: "🏗️",
      side: "left",
    },
    {
      id: "data-analysis",
      title: "Data Analysis",
      subtitle: "Extracting Insights",
      description:
        "Turning raw data into actionable insights through statistical analysis and visualization.",
      icon: "📊",
      side: "right",
    },
    {
      id: "data-science",
      title: "Data Science",
      subtitle: "Statistical Frontiers",
      description:
        "Applying advanced statistical models and predictive analytics to solve complex problems.",
      icon: "🔬",
      side: "left",
    },
    {
      id: "ml",
      title: "Machine Learning",
      subtitle: "The Intelligence Core",
      description:
        "Deep diving into advanced architectures: from Convolutional Neural Networks (CNN) for vision, to Recurrent Neural Networks (RNN) for sequences, and sophisticated Graphical Neural Networks (GNN) for relational data.",
      icon: "🤖",
      side: "right",
    },
    {
      id: "deep-learning",
      title: "Deep Learning",
      subtitle: "Multi-layered Neurons",
      description:
        "Harnessing the power of deep architectures to solve non-linear problems and achieve state-of-the-art performance in complex tasks.",
      icon: "🧠",
      side: "left",
    },
    {
      id: "vision",
      title: "Computer Vision",
      subtitle: "Visual Perception",
      description:
        "Teaching machines to interpret pixels, enabling autonomous systems to 'see' and react to their environment.",
      icon: "👁️",
      side: "right",
    },
    {
      id: "chemoinformatics",
      title: "Chemoinformatics",
      subtitle: "Molecular Algorithms",
      description:
        "The intersection of chemistry and computer science—simulating molecular interactions and predicting chemical properties using code.",
      icon: "⚗️",
      side: "left",
    },
    {
      id: "bioinformatics",
      title: "Bioinformatics",
      subtitle: "Genomic Intelligence",
      description:
        "Crunching biological data at scale—analyzing DNA sequences and protein structures to solve the mysteries of life.",
      icon: "🧬",
      side: "right",
    },
  ];

  useGSAP(
    () => {
      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Unified Path Animation for all devices
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // Unified side-to-side points animation for all screens
      points.forEach((point) => {
        const el = document.getElementById(`point-${point.id}`);
        const card = el.querySelector(".journey-card");
        const dot = el.querySelector(".journey-dot");

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: point.side === "right" ? 80 : -80,
            scale: 0.8,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "top 60%",
              scrub: 0.5,
            },
          },
        );

        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "top 60%",
              scrub: 0.3,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[500vh] py-32 md:py-60 px-4 md:px-20 overflow-hidden bg-transparent"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-teal-500/20 blur-[100px] md:blur-[150px] rounded-full"></div>
        <div className="absolute top-3/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/20 blur-[100px] md:blur-[150px] rounded-full"></div>
      </div>

      <div className="relative text-center mb-24 md:mb-40 z-10">
        <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 md:mb-6 leading-tight">
          The <span className="text-teal-400">Road</span> Map
        </h2>
        <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4">
          From the laboratory to the neural network. A visualization of my
          professional evolution and technical mastery.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Unified SVG Path Area - Always squiggly */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[120px] pointer-events-none z-0">
          <svg
            ref={svgRef}
            className="w-full h-full"
            viewBox="0 0 120 1000"
            preserveAspectRatio="none"
          >
            {/* Background Squiggly Path (The track) */}
            <path
              d="M 60 0 C 90 50 110 100 60 150 S 10 250 60 300 S 110 400 60 450 S 10 550 60 600 S 110 700 60 750 S 10 850 60 900 S 110 950 60 1000"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Animated Progress Path */}
            <path
              ref={pathRef}
              d="M 60 0 C 90 50 110 100 60 150 S 10 250 60 300 S 110 400 60 450 S 10 550 60 600 S 110 700 60 750 S 10 850 60 900 S 110 950 60 1000"
              fill="none"
              stroke="url(#journey-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient
                id="journey-gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="33%" stopColor="#3b82f6" />
                <stop offset="66%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Timeline Points */}
        <div className="relative z-20 flex flex-col gap-[25vh] md:gap-[35vh]">
          {points.map((point) => (
            <div
              key={point.id}
              id={`point-${point.id}`}
              className={`flex items-center w-full ${
                point.side === "left" ? "flex-row-reverse" : "flex-row"
              } gap-0`}
            >
              {/* Content Card Area */}
              <div className="w-[45%]">
                <div
                  className={`journey-card p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-teal-400/50 transition-all duration-700 group shadow-2xl relative overflow-hidden ${
                    point.side === "left" ? "text-right" : "text-left"
                  }`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-teal-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div
                    className={`flex items-center gap-3 md:gap-6 mb-2 md:mb-4 ${
                      point.side === "left" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl bg-white/10 flex items-center justify-center text-xl md:text-4xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="text-sm md:text-3xl font-bold text-white group-hover:text-teal-400 transition-colors duration-500 leading-tight">
                        {point.title}
                      </h3>
                      <p className="text-teal-400 font-mono text-[8px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] uppercase mt-1">
                        {point.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[10px] md:text-lg font-light relative z-10 line-clamp-3 md:line-clamp-none">
                    {point.description}
                  </p>
                </div>
              </div>

              {/* Center Connection Point */}
              <div className="w-[10%] flex justify-center items-center relative h-12">
                <div className="journey-dot w-4 h-4 md:w-6 md:h-6 rounded-full border-2 md:border-4 border-slate-900 bg-teal-400 z-30 shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all duration-500"></div>
                <div className="absolute w-8 h-8 md:w-12 md:h-12 bg-teal-400/20 rounded-full blur-lg md:blur-xl"></div>
              </div>

              {/* Empty Spacer */}
              <div className="w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
