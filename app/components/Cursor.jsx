"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // Center the cursor initially
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-10 h-10 border-2 border-teal-400 rounded-full pointer-events-none z-100 mix-blend-screen shadow-[0_0_10px_rgba(20,184,166,0.5)]"
    />
  );
};

export default Cursor;
