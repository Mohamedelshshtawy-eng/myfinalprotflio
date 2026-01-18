"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  Environment,
  Center,
  Preload,
} from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DNA from "./Dna";
import Loader from "./Loader";

gsap.registerPlugin(ScrollTrigger);

function AnimatedDNA() {
  const groupRef = useRef();

  useGSAP(() => {
    if (!groupRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // DESKTOP
      gsap.set(groupRef.current.position, { x: 0, y: -1, z: 4 });
      gsap.set(groupRef.current.rotation, { x: 0, y: 0, z: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mainpage",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      tl.to(groupRef.current.position, { x: -2, ease: "sine.inOut" })
        .to(
          groupRef.current.rotation,
          { y: Math.PI * 4, z: Math.PI / 6, ease: "sine.inOut" },
          0,
        )
        .to(groupRef.current.position, { x: 3, ease: "sine.inOut" })
        .to(groupRef.current.rotation, { z: -Math.PI / 6, ease: "sine.inOut" })
        .to(groupRef.current.position, { x: -10, ease: "sine.inOut" });
    });

    mm.add("(max-width: 767px)", () => {
      // MOBILE
      gsap.set(groupRef.current.position, { x: 0, y: -0.5, z: 5 });
      gsap.set(groupRef.current.rotation, { x: 0, y: 0, z: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mainpage",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      tl.to(groupRef.current.position, { x: -1, ease: "sine.inOut" })
        .to(
          groupRef.current.rotation,
          { y: Math.PI * 4, z: Math.PI / 8, ease: "sine.inOut" },
          0,
        )
        .to(groupRef.current.position, { x: 1, ease: "sine.inOut" })
        .to(groupRef.current.rotation, { z: -Math.PI / 8, ease: "sine.inOut" })
        .to(groupRef.current.position, {
          x: -5,
          opacity: 0,
          ease: "sine.inOut",
        });
    });

    return () => mm.revert();
  }, []);

  return (
    <group ref={groupRef}>
      <group>
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          <Center>
            <DNA scale={0.2} />
          </Center>
        </Float>
      </group>
    </group>
  );
}

export default function DNAScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedDNA />
          <Sparkles
            count={200}
            scale={12}
            size={2}
            speed={0.4}
            opacity={0.5}
            color="#22d3ee"
          />
          <Environment preset="city" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
