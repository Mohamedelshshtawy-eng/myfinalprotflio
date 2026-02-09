"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Programming Languages",
    color: "#3b82f6",
    skills: ["Python", "Golang", "Java", "JavaScript", "TypeScript"],
  },
  {
    title: "Data Analysis",
    color: "#a855f7",
    skills: ["Excel", "Power BI", "MySQL", "Python"],
  },
  {
    title: "AI & Deep Learning",
    color: "#2dd4bf",
    skills: [
      "Supervised & Unsupervised Learning",
      "Neural Networks (CNN, RNN, GNN)",
      "Computer Vision",
      "Transformers",
    ],
  },
  {
    title: "Database Systems",
    color: "#f97316",
    skills: ["MySQL", "MongoDB", "PostgreSQL"],
  },
];

const Skills = () => {
  return (
    <section
      id="skills-section"
      className="relative z-[999] w-full py-24 px-6 md:px-20 bg-[#020617] text-white overflow-hidden min-h-screen border-t-2 border-teal-500/30"
    >
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            Technical <span className="text-teal-400">Expertise</span>
          </h2>
          <div className="w-24 h-2 bg-teal-500 mx-auto rounded-full mb-8" />
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">
            Bridging the gap between scientific research and advanced software
            engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:border-teal-400/50 transition-all duration-500 group"
            >
              <h3 className="text-2xl md:text-3xl font-black mb-8 flex items-center gap-4 uppercase tracking-tight">
                <span
                  className="w-4 h-4 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  style={{ backgroundColor: cat.color }}
                ></span>
                {cat.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-slate-200 font-bold hover:bg-white/10 hover:text-teal-400 transition-all duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
