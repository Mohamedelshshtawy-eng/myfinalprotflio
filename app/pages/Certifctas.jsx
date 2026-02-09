"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { certificates } from "../data/certificates";

gsap.registerPlugin(ScrollTrigger);

const Certifctas = () => {
  const sectionRef = useRef();
  const triggerRef = useRef();

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // DESKTOP
        gsap.fromTo(
          sectionRef.current,
          { x: 0 },
          {
            x: "-550vw",
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top",
              end: "3500 top",
              scrub: 1,
              pin: true,
            },
          },
        );
      });

      mm.add("(max-width: 767px)", () => {
        // MOBILE
        gsap.fromTo(
          sectionRef.current,
          { x: 0 },
          {
            x: "-850vw",
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top",
              end: "4500 top",
              scrub: 1,
              pin: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: triggerRef },
  );

  return (
    <section
      id="certificates"
      className="overflow-hidden bg-transparent relative z-10"
    >
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="h-screen w-[1000vw] flex items-center relative pl-[5vw] md:pl-[10vw] pointer-events-auto"
        >
          {/* Section Heading Title */}
          <div className="flex flex-col shrink-0 mr-12 md:mr-40 bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10 z-20 max-w-[85vw] md:max-w-none">
            <h2 className="text-white text-4xl md:text-9xl font-black uppercase tracking-tighter leading-none select-none">
              <span className="block text-teal-400 mb-2">My Featured</span>
              <span className="block text-white opacity-40">Certificates</span>
            </h2>
            <div className="w-12 md:w-24 h-1.5 md:h-2 bg-teal-500 mt-4 md:mt-8 rounded-full"></div>
            <p className="text-slate-400 mt-6 text-base md:text-xl max-w-xs md:max-w-md">
              A collection of professional certifications in AI &
              Bioinformatics.
            </p>
          </div>

          {/* Cards Container */}
          <div className="flex gap-10 md:gap-20 items-center">
            {certificates.map((cert) => (
              <Link
                key={cert.id}
                href={`/certificate/${cert.id}`}
                className="group relative w-[85vw] md:w-[500px] h-[75vh] md:h-[600px] shrink-0 block cursor-pointer z-30"
              >
                {/* Certificate Card Styling */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 flex flex-col overflow-hidden transition-all duration-500 group-hover:bg-white/10 group-hover:scale-[1.02] shadow-2xl">
                  {/* Image Container */}
                  <div className="relative w-full h-[40%] md:h-[280px] rounded-2xl overflow-hidden mb-4 md:mb-6 border border-white/5 pointer-events-none">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between pointer-events-none">
                    <div>
                      <div className="flex items-center gap-2 mb-3 md:mb-4">
                        <span className="text-teal-400 font-mono tracking-widest text-xs md:text-sm">
                          {cert.id.toString().padStart(2, "0")}
                        </span>
                        <div className="h-px w-8 md:w-12 bg-white/20"></div>
                        <span className="text-white/40 font-mono text-[10px] md:text-xs uppercase">
                          Certified
                        </span>
                      </div>
                      <h3 className="text-white text-xl md:text-3xl font-bold leading-tight mb-2 md:mb-4 group-hover:text-teal-400 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-slate-400 text-sm md:text-lg font-medium">
                        {cert.issuer}
                      </p>
                    </div>

                    <div className="pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="group/btn relative px-6 md:px-8 py-2.5 md:py-3 overflow-hidden rounded-xl md:rounded-2xl bg-white text-black font-bold text-xs md:text-sm transition-all duration-300 group-hover:pr-10 md:group-hover:pr-12">
                        <span className="relative z-10 uppercase tracking-wider">
                          View Details
                        </span>
                        <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/btn:opacity-100 transition-all">
                          →
                        </span>
                      </div>

                      {/* Decorative Gradient Blob */}
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 bg-linear-to-br ${cert.color} rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-all`}
                      ></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Final "Keep Exploring" Slide */}
            <div className="w-[85vw] md:w-[600px] flex flex-col justify-center items-start shrink-0 pr-10 md:pr-0 pl-10 md:pl-14 z-20">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-teal-500/20 flex items-center justify-center mb-6 md:mb-8 border border-teal-500/30">
                <span className="text-teal-400 text-2xl md:text-3xl">✦</span>
              </div>
              <h4 className="text-white text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 wrap-break-word w-full">
                More Coming Soon_
              </h4>
              <p className="text-slate-400 text-base md:text-2xl font-light max-w-xs md:max-w-md">
                Continuously learning and expanding my expertise in the fields
                of Bioinformatics and AI.
              </p>
              <div className="mt-8 md:mt-10 flex gap-4">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-teal-500 animate-pulse"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-teal-500/60 animate-pulse [animation-delay:200ms]"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-teal-500/30 animate-pulse [animation-delay:400ms]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifctas;
