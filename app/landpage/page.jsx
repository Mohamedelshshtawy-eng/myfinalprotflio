"use client";
import Certifctas from "../pages/Certifctas";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Cursor from "../components/Cursor";
import DNAScene from "../components/DNAScene";
import Text from "../pages/Text";
import ZoomSection from "../pages/ZoomSection";
gsap.registerPlugin(ScrollTrigger);
const LandPage = () => {
  const containerRef = useRef();
  const titleRf = useRef();
  const nameRef = useRef();
  const descRef = useRef();
  const scrollRef = useRef();

  useGSAP(
    () => {
      gsap.set(scrollRef.current, {
        opacity: 0,
        x: -100,
      });
      let split;
      if (!nameRef.current) return;

      gsap.set(nameRef.current, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
      });

      const runAnimation = () => {
        // تحديد أجزاء الاسم بشكل دقيق
        const first = nameRef.current.querySelector(".first-name");
        const last = nameRef.current.querySelector(".last-name");

        // Split text using SplitType
        split = new SplitType(titleRf.current, {
          types: "words, chars",
          tagName: "span",
          charClass: "char",
        });

        const tl = gsap.timeline();

        // 1. البداية: ظهور الاسم كبيراً في المنتصف
        tl.from([first, last], {
          scale: 0.8,
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
          stagger: 0.15,
        })
          // 2. الحركة للركن: الاسم بالكامل يتحرك لأعلى اليسار ليصبح لوجو
          .to(
            nameRef.current,
            {
              left: "4rem",
              top: "3rem",
              xPercent: 0,
              yPercent: 0,
              scale: 0.35,
              duration: 1.5,
              ease: "expo.inOut",
              delay: 0.8, // وقفة بسيطة للمشاهدة
            },
            "-=1"
          )
          // 3. الانفصال (THE SPLIT): الاسم الأخير ينطلق لليمين تماماً

          // 4. ظهور المحتوى: لا يبدأ إلا بعد انتهاء الانفصال
          .from(split.chars, {
            x: -50,
            y: 20,
            rotation: 5,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: {
              from: "left",
              each: 0.03,
            },
          })
          .to(
            descRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(scrollRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "top+=800 top",
            scrub: true,
          },
        });
        scrollTl
          .to(split.words, {
            x: -100,
            rotation: 100,
            opacity: 0,
            ease: "none", // ✅ بدل ease لتكون سلسة مع scroll
            stagger: {
              from: "random",
              each: 0.04,
            },
          })
          .to(
            descRef.current,
            {
              y: 100,
              opacity: 0,
              ease: "none",
            },
            0
          )
          .to(
            scrollRef.current,
            {
              x: -100,
              opacity: 0,
              ease: "none",
            },
            0
          )
          .to(
            nameRef.current,
            {
              opacity: 0,
              ease: "none",
            },
            0
          );
      };

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
      className="mainpage relative w-full min-h-[300vh] bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-x-hidden selection:bg-teal-500/30"
    >
      <Cursor />
      <div className="fixed inset-0 z-0">
        <DNAScene />
      </div>

      {/* Intro Name / Logo with Container Ref */}
      <div
        ref={nameRef}
        className="fixed z-[100] origin-top-left pointer-events-none"
      >
        <div className="flex items-baseline gap-4 text-5xl md:text-[7.5vw] font-black uppercase tracking-tighter transition-all">
          <span className="first-name text-white">Mohamed</span>
          <span className="last-name text-white/80">Elshshtawy</span>
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
      <Certifctas />
    </main>
  );
};

export default LandPage;
