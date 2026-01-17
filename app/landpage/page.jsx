"use client";
import React, { useRef } from "react";
import DNAScene from "../components/DNAScene";
import Cursor from "../components/Cursor";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Text from "../pages/Text";
gsap.registerPlugin(ScrollTrigger);

const LandPage = () => {
  const containerRef = useRef();
  const titleRf = useRef();
  const nameRef = useRef();
  const descRef = useRef();
  const scrollRef = useRef();

  useGSAP(
    () => {
      let split;

      // تهيئة المركز بشكل صحيح لضمان عدم حدوث قفزة (jump)
      gsap.set(nameRef.current, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
      });

      const runAnimation = () => {
        // Split text using SplitType
        split = new SplitType(titleRf.current, {
          types: "words, chars",
          tagName: "span",
          charClass: "char",
        });

        const tl = gsap.timeline();

        // 1. Intro Animation: Name appears big
        tl.from(nameRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
        })
          // 2. Name moves to corner and shrinks
          .to(nameRef.current, {
            top: "2rem",
            left: "2rem",
            xPercent: 0,
            yPercent: 0,
            scale: 0.25,
            duration: 1.8,
            ease: "expo.inOut",
          })
          // 3. Main Title and Description appear
          .from(
            split.chars,
            {
              x: -100,
              rotation: 10,
              opacity: 0,
              duration: 0.7,
              ease: "power4.out",
              stagger: {
                from: "random",
                each: 0.04,
              },
            },
            "-=1"
          )
          .to(
            descRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=1"
          );
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
        scrollTl
          .to(split.words, {
            x: -100,
            rotation: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            stagger: {
              from: "random",
              each: 0.04,
            },
          })
          .to(
            descRef.current,
            {
              opacity: 0,
              x: -100,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=1"
          )
          .to(
            scrollRef.current,
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=1"
          )
          .to(
            nameRef.current,
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            0
          );
      };

      // Ensure fonts are loaded before splitting to avoid layout shifts
      document.fonts.ready.then(() => {
        runAnimation();
      });

      return () => {
        if (split) split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-[300vh] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white overflow-x-hidden selection:bg-teal-500/30"
    >
      <Cursor />
      <div className="fixed inset-0 z-0">
        <DNAScene />
      </div>

      {/* Intro Name / Logo with Fixed Video Mask */}
      <div
        ref={nameRef}
        className="fixed z-50 origin-top-left pointer-events-none"
      >
        <div className="relative inline-block overflow-hidden rounded-2xl group border border-white/10 shadow-2xl">
          {/* 1. Video Layer (Bottom) */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* 2. Masking Layer (Top) */}
          {/* هذه الطبقة هي السحر: خلفية مطابقة للموقع ونص أبيض مع Mix Blend Multiply */}
          <h1
            ref={nameRef}
            className="relative z-10 text-6xl md:text-9xl font-black uppercase whitespace-nowrap leading-none px-8 py-6 bg-slate-950 text-white mix-blend-multiply select-none"
            style={{
              isolation: "isolate",
            }}
          >
            Mohamed Elshshtawy
          </h1>

          {/* 3. Subtle Glossy Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-linear-to-tr from-teal-500/10 to-transparent opacity-50"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className=" relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h2
          ref={titleRf}
          className="text-5xl md:text-7xl font-bold mb-6 inline-block text-slate-100 leading-tight"
        >
          Bioinformatics &<br />
          Chemoinformatics
        </h2>
        <p
          ref={descRef}
          className="text-lg md:text-2xl text-slate-300 max-w-3xl opacity-0 translate-y-20 leading-relaxed"
        >
          Bridging the gap between Biology, Chemistry, and Code.
          <br />
          <span className="text-teal-400 font-semibold">
            Zoology & Chemistry Graduate
          </span>{" "}
          |{" "}
          <span className="text-cyan-300 font-semibold">
            Full Stack Developer
          </span>
        </p>
        <div
          ref={scrollRef}
          className="text-white text-3xl absolute bottom-10 left-1 border px-6 py-2 rounded-2xl bg-teal-500/30 hover:bg-teal-500/50 font-semibold"
        >
          Scroll To Explore
        </div>
      </div>
      <Text />
    </main>
  );
};

export default LandPage;
