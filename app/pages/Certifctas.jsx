"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Certifctas = () => {
  const sectionRef = useRef();
  const triggerRef = useRef();

  const certificates = [
    {
      id: 1,
      title: "Machine Learning Spezialization",
      issuer: "Coursera | Stanford University",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      title: "Deep Learning Spezialization",
      issuer: "Coursera | DeepLearning.AI",
      color: "from-purple-500 to-blue-500",
    },
    {
      id: 3,
      title: "Bioinformatics Specialization",
      issuer: "Coursera | UC San Diego",
      color: "from-teal-500 to-emerald-400",
    },
    {
      id: 4,
      title: "Data Science Professional Certificate",
      issuer: "Coursera | IBM",
      color: "from-blue-600 to-indigo-600",
    },
    {
      id: 5,
      title: "Genomic Data Science",
      issuer: "Coursera | Johns Hopkins",
      color: "from-orange-500 to-red-500",
    },
  ];

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // DESKTOP
        gsap.fromTo(
          sectionRef.current,
          { x: 0 },
          {
            x: "-400vw",
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top",
              end: "2000 top",
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
            x: "-550vw", // More distance for smaller cards
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top",
              end: "2000 top",
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
    <section className="overflow-hidden bg-transparent">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="h-screen w-[650vw] md:w-[550vw] flex items-center relative pl-[10vw] md:pl-[10vw]"
        >
          {/* Section Heading Title - Made more prominent */}
          <div className="flex flex-col shrink-0 mr-20 md:mr-40">
            <h2 className="text-white text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none select-none">
              <span className="block text-teal-400 mb-2">My Featured</span>
              <span className="block text-white opacity-40">Certificates</span>
            </h2>
            <div className="w-16 md:w-24 h-2 bg-teal-500 mt-4 md:mt-8 rounded-full"></div>
          </div>

          {/* Cards Container */}
          <div className="flex gap-20 items-center">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="group relative w-[80vw] md:w-[450px] h-[550px] shrink-0"
              >
                {/* Certificate Card Styling */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:bg-white/10 group-hover:scale-[1.02] shadow-2xl">
                  {/* Decorative Gradient Blob */}
                  <div
                    className={`absolute -top-20 -right-20 w-64 h-64 bg-linear-to-br ${cert.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`}
                  ></div>

                  <div>
                    <div className="h-1 w-full bg-white/20 rounded-full mb-8 overflow-hidden">
                      <div
                        className={`h-full bg-linear-to-r ${cert.color} w-1/3 group-hover:w-full transition-all duration-1000`}
                      ></div>
                    </div>
                    <span className="text-teal-400 font-mono tracking-widest text-sm mb-4 block">
                      0{cert.id} // GLOBAL CERTIFIED
                    </span>
                    <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
                      {cert.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-400 font-medium">{cert.issuer}</p>
                    <div className="flex items-center gap-4">
                      <button className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-teal-400 transition-colors uppercase tracking-wider">
                        View Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Final "Keep Exploring" Slide */}
            <div className="w-[80vw] md:w-[600px] flex flex-col justify-center items-start shrink-0 pr-20 md:pr-0">
              <h4 className="text-white text-6xl font-black uppercase tracking-tighter mb-4">
                More Coming Soon_
              </h4>
              <p className="text-slate-400 text-xl font-light max-w-md">
                Continuously learning and expanding my expertise in the fields
                of Bioinformatics and AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifctas;
