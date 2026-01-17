"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Environment, Center } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DNA from "./Dna";

gsap.registerPlugin(ScrollTrigger);

function AnimatedDNA() {
  const groupRef = useRef();

  useGSAP(() => {
    if (!groupRef.current) return;

    gsap.set(groupRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
    });

    gsap.set(groupRef.current.position, { y: -1, z: 5 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    tl.to(
      groupRef.current.position,
      {
        x: 3,
        z: -5,
        ease: "power1.inOut",
      },
      0
    )
      .to(
        groupRef.current.rotation,
        {
          z: Math.PI / 4,
          ease: "none",
        },
        0
      )
      .to(
        groupRef.current.position,
        {
          x: -3,
          z: 2,
          ease: "power1.inOut",
        },
        ">"
      );
  }, []);

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <Center>
          <DNA scale={0.2} />
        </Center>
      </Float>
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
        <ambientLight intensity={0.5} />
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
      </Canvas>
    </div>
  );
}
