import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Text = () => {
  const containerRef = useRef();
  const leftSideRef = useRef();

  const sections = [
    {
      title: "Data Analysis",
      desc: "Processing complex biological data to extract meaningful patterns and insights using advanced computational methods.",
    },
    {
      title: "Chemoinformatics",
      desc: "Applying informatics techniques to solve chemical and pharmacological problems, accelerating drug discovery.",
    },
    {
      title: "Bioinformatics",
      desc: "Developing and using software tools to understand biological data, especially DNA sequences and protein structures.",
    },
    {
      title: "Full Stack Development",
      desc: "Building integrated web solutions that bridge the gap between scientific research and user-friendly interfaces.",
    },
  ];

  useGSAP(
    () => {
      // Pinning the Left Side using GSAP - This is more reliable than CSS sticky
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftSideRef.current,
        pinSpacing: false,
      });

      // Reveal animation for each section on the right
      gsap.utils.toArray(".content-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
          y: 60,
          opacity: 0,
          filter: "blur(10px)",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent pl-12 md:pl-48 pr-6 md:pr-20 min-h-screen"
    >
      <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start">
        {/* Left Side: Solid Pinned via GSAP */}
        <div
          ref={leftSideRef}
          className="h-screen flex items-center gap-10 z-20"
        >
          <div className="flex flex-col text-white text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase shrink-0 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <span>What</span>
            <span>Are</span>
            <span>We</span>
            <span>Doing</span>
          </div>

          {/* Vertical Bar - Long and Glowing */}
          <div className="w-1.5 h-[75vh] bg-linear-to-b from-teal-400 via-cyan-500 to-transparent rounded-full shadow-[0_0_25px_rgba(34,211,238,0.7)]"></div>
        </div>

        {/* Right Side: Scrolling Content */}
        <div className="flex-1 py-[30vh] space-y-[70vh]">
          {sections.map((item, index) => (
            <div key={index} className="content-section flex flex-col group">
              <h3 className="text-teal-400 text-3xl md:text-4xl font-bold mb-5 group-hover:text-cyan-300 transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Text;
