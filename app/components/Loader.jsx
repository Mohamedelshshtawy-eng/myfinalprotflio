"use client";
import { useProgress, Html } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-950">
        <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-teal-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-teal-400 font-black uppercase tracking-[0.2em] text-xs">
          Initialising Labs{" "}
          <span className="opacity-50">{Math.round(progress)}%</span>
        </div>
      </div>
    </Html>
  );
}
