"use client";
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Center } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Flask from "../components/Flask";
import Laptop from "../components/Laptop";
import DNA from "../components/Dna";
import Loader from "../components/Loader";
import { Preload, OrbitControls } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

// This component handles the unified 3D movement
function FloatingCore() {
  const flaskRef = useRef();
  const laptopRef = useRef();
  const dnaRef = useRef();
  const masterGroup = useRef();

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // DESKTOP
      gsap.set(flaskRef.current.position, { x: -8, y: 6, z: -1 });
      gsap.set(flaskRef.current.rotation, { z: 0.5, y: 0.2 });
      gsap.set(laptopRef.current.position, { x: 0, y: 6, z: 0 });
      gsap.set(dnaRef.current.position, { x: 8, y: 6, z: -1 });
      gsap.set(dnaRef.current.rotation, { z: -0.5, y: -0.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      tl.to(flaskRef.current.position, { x: -1.3, y: 0, z: 2, duration: 4 }, 0)
        .to(flaskRef.current.rotation, { z: 0, y: Math.PI * 2, duration: 4 }, 0)
        .to(laptopRef.current.position, { x: 0, y: 0, z: 0, duration: 4 }, 0)
        .to(laptopRef.current.rotation, { y: -Math.PI * 2, duration: 4 }, 0)
        .to(dnaRef.current.position, { x: 1.3, y: 0, z: 2, duration: 4 }, 0)
        .to(
          dnaRef.current.rotation,
          { z: -2.339, y: Math.PI * 2, duration: 4 },
          0,
        )
        .to(
          masterGroup.current.rotation,
          { y: Math.PI * 4, duration: 4, ease: "none" },
          0,
        )
        .to(
          masterGroup.current.position,
          { x: 4.8, y: 0, z: 0, duration: 2 },
          4.2,
        )
        .to(
          masterGroup.current.scale,
          { x: 0.75, y: 0.75, z: 0.75, duration: 2 },
          4.2,
        );
    });

    mm.add("(max-width: 767px)", () => {
      // MOBILE
      gsap.set(flaskRef.current.position, { x: -3, y: 6, z: -2 });
      gsap.set(flaskRef.current.rotation, { z: 0.5, y: 0.2 });
      gsap.set(laptopRef.current.position, { x: 0, y: 6, z: 0 });
      gsap.set(dnaRef.current.position, { x: 3, y: 6, z: -2 });
      gsap.set(dnaRef.current.rotation, { z: -0.5, y: -0.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      tl.to(
        flaskRef.current.position,
        { x: -0.8, y: 1.5, z: 2, duration: 4 },
        0,
      )
        .to(flaskRef.current.rotation, { z: 0, y: Math.PI * 2, duration: 4 }, 0)
        .to(laptopRef.current.position, { x: 0, y: 1, z: 0, duration: 4 }, 0)
        .to(laptopRef.current.rotation, { y: -Math.PI * 2, duration: 4 }, 0)
        .to(dnaRef.current.position, { x: 0.8, y: 1.5, z: 2, duration: 4 }, 0)
        .to(
          dnaRef.current.rotation,
          { z: -2.339, y: Math.PI * 2, duration: 4 },
          0,
        )
        .to(
          masterGroup.current.rotation,
          { y: Math.PI * 4, duration: 4, ease: "none" },
          0,
        )
        .to(
          masterGroup.current.position,
          { x: 0, y: -10, z: -2, duration: 2 },
          4.2,
        )
        .to(
          masterGroup.current.scale,
          { x: 0.5, y: 0.5, z: 0.5, duration: 2 },
          4.2,
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <group ref={masterGroup}>
      <group ref={flaskRef} scale={0.7}>
        <Flask />
      </group>
      <group ref={laptopRef} scale={3.5}>
        <Laptop />
      </group>
      <group ref={dnaRef} scale={0.1}>
        <DNA />
      </group>
    </group>
  );
}

const MobileModelBox = ({ children, title, description }) => {
  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-4xl p-6 flex flex-col gap-4 backdrop-blur-md">
      <div className="h-64 w-full relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Float speed={3} rotationIntensity={2} floatIntensity={2}>
              <Center>{children}</Center>
            </Float>
          </Suspense>
          <OrbitControls enableZoom={false} enableRotate={true} />
        </Canvas>
      </div>
      <div className="text-center">
        <h4 className="text-teal-400 font-bold text-xl mb-2 uppercase tracking-wider">
          {title}
        </h4>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative z-10 w-full py-20 px-10 border-t border-white/5 bg-black/20 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
            Mohamed <span className="text-teal-400">Elshshtawy</span>
          </h4>
          <p className="text-slate-500 font-medium">
            © 2026 Developer & Scientist. All Rights Reserved.
          </p>
        </div>

        <div className="flex gap-8">
          {[
            { name: "LinkedIn", url: "#" },
            { name: "GitHub", url: "#" },
            { name: "Gmail", url: "mailto:mohamedelshshtawy745@gmail.com" },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              className="text-slate-400 hover:text-teal-400 font-bold transition-colors uppercase text-sm tracking-widest"
            >
              {social.name}
            </a>
          ))}
        </div>

        <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">
          Built with <span className="text-teal-400">Passion</span> &{" "}
          <span className="text-teal-400">Science</span>
        </div>
      </div>
    </footer>
  );
};

const ContactForm = () => {
  return (
    <div className="w-full max-w-2xl bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-3xl relative z-30">
      <h3 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter text-center">
        Let's <span className="text-teal-400">Connect</span>
      </h3>
      {/* Integrated with Web3Forms - You'll need to get a free Access Key from web3forms.com */}
      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="space-y-5"
      >
        <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
        <input type="hidden" name="to" value="mohamedelshshtawy745@gmail.com" />
        <input type="hidden" name="from_name" value="Portfolio Contact" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="w-full px-8 py-5 bg-white/10 border border-white/5 rounded-3xl focus:ring-2 focus:ring-teal-500 outline-none transition-all font-bold text-white placeholder:text-slate-500"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-full px-8 py-5 bg-white/10 border border-white/5 rounded-3xl focus:ring-2 focus:ring-teal-500 outline-none transition-all font-bold text-white placeholder:text-slate-500"
          />
        </div>
        <input
          type="text"
          name="subject"
          required
          placeholder="Subject"
          className="w-full px-8 py-5 bg-white/10 border border-white/5 rounded-3xl focus:ring-2 focus:ring-teal-500 outline-none transition-all font-bold text-white placeholder:text-slate-500"
        />
        <textarea
          name="message"
          required
          placeholder="Message"
          rows="4"
          className="w-full px-8 py-5 bg-white/10 border border-white/5 rounded-3xl focus:ring-2 focus:ring-teal-500 outline-none transition-all font-bold text-white placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="w-full py-6 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-3xl transition-all shadow-2xl uppercase tracking-widest text-lg"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

const About = () => {
  return (
    <section className="about-container relative w-full bg-[#020617]">
      {/* Fixed Background Context - Behind text - Hidden on mobile for the last section */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none hidden md:block">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 40 }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <directionalLight position={[-5, 5, 5]} intensity={1.5} />
          <Suspense fallback={null}>
            <FloatingCore />
            <Preload all />
          </Suspense>
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Mobile-only background for top sections - REMOVED to keep background clean as requested */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none md:hidden overflow-hidden">
        {/* Empty or simple gradient if needed, keeping it empty for now to hide models */}
      </div>

      <div className="relative z-10 min-h-[40vh] md:min-h-[60vh] flex flex-col justify-start px-6 md:px-10 pt-10 pb-20">
        <div className="max-w-7xl mx-auto w-full mb-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
            The <span className="text-teal-400">Journey</span>
          </h2>
          <div className="w-16 md:w-24 h-2 bg-teal-500 mx-auto rounded-full" />
        </div>
      </div>

      {/* STAGE 2: The Narrative Body */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 md:py-40 px-4 md:px-6">
        <div className="max-w-4xl bg-white/5 p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="text-slate-300 text-sm md:text-lg md:leading-loose space-y-6 md:space-y-10 text-justify font-medium">
            <p>
              I am a graduate of the Faculty of Science, and from the early
              stages of my academic journey, I developed a strong passion for
              understanding science deeply and transforming scientific knowledge
              into practical, real-world solutions through technology. My
              background in science provided me with a solid foundation in
              analytical thinking, the scientific method, and the understanding
              of biological and chemical systems, which became the cornerstone
              of my professional direction.
            </p>
            <p className="text-xl md:text-4xl font-black text-white border-y-2 border-teal-500/20 py-6 md:py-10 tracking-tighter italic text-center">
              "My transition was not a shift away from science, but rather an
              expansion of my scientific toolkit."
            </p>
            <p>
              After graduation, I realized that the future of science lies in
              its integration with programming and artificial intelligence. This
              realization motivated me to seriously pursue software development
              and programming, not merely as a technical skill, but as a
              powerful tool to solve complex and meaningful problems.
            </p>
            <p>
              Given my scientific background, I naturally became deeply
              interested in interdisciplinary fields such as bioinformatics and
              cheminformatics, where science, programming, and artificial
              intelligence intersect at their most powerful level. To me, these
              fields represent the future of scientific research, drug
              discovery, medical innovation, and the deeper understanding of
              biological systems.
            </p>
          </div>
        </div>
      </div>

      {/* STAGE 3: Final Contact Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-20 lg:px-40 py-20">
        {/* Mobile-only Model Boxes Section */}
        <div className="w-full flex flex-col gap-10 mb-20 md:hidden">
          <MobileModelBox
            title="Scientific Foundation"
            description="The starting point in the lab, understanding the biological systems and chemical reactions that form our world."
          >
            <Flask scale={1} />
          </MobileModelBox>
          <MobileModelBox
            title="Digital Evolution"
            description="Bridging the gap between raw data and intelligent solutions through advanced software engineering."
          >
            <Laptop scale={4} />
          </MobileModelBox>
          <MobileModelBox
            title="Bioinformatics"
            description="Decoding the secrets of life using computational power to drive the future of medicine and research."
          >
            <DNA scale={0.15} />
          </MobileModelBox>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-20 font-bold uppercase tracking-widest text-[#000000]">
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <ContactForm />
          </div>
          {/* This empty div acts as a spacer for the models on the right on desktop */}
          <div className="hidden md:block w-1/2" />
        </div>
      </div>

      <div className="h-[20vh]" />

      <Footer />
    </section>
  );
};

export default About;
