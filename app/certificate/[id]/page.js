"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { certificates } from "../../data/certificates";
import gsap from "gsap";

const CertificateDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const cert = certificates.find((c) => c.id === parseInt(id));

  useEffect(() => {
    if (!cert) return;

    const tl = gsap.timeline();
    tl.fromTo(
      ".cert-container",
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power4.out" },
    )
      .fromTo(
        ".cert-image",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "expo.inOut" },
        "-=0.5",
      )
      .fromTo(
        ".cert-info > *",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=1",
      );
  }, [cert]);

  if (!cert) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Certificate Not Found</h1>
        <Link
          href="/#certificates"
          className="px-8 py-3 bg-teal-500 rounded-full font-bold hover:bg-teal-400 transition-colors"
        >
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-teal-500/30">
      {/* Background decoration */}
      <div
        className={`fixed top-0 right-0 w-[80vw] md:w-[50vw] h-[50vh] bg-linear-to-br ${cert.color} opacity-10 md:opacity-10 blur-[80px] md:blur-[120px] pointer-events-none`}
      ></div>
      <div
        className={`fixed bottom-0 left-0 w-[80vw] md:w-[50vw] h-[50vh] bg-linear-to-tr ${cert.color} opacity-5 md:opacity-5 blur-[80px] md:blur-[120px] pointer-events-none`}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-8 z-50 flex justify-between items-center backdrop-blur-md bg-slate-950/40 border-b border-white/5">
        <Link
          href="/#certificates"
          className="flex items-center gap-2 group text-white/70 hover:text-white transition-colors"
        >
          <span className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-teal-500/50 group-hover:bg-teal-500/10 transition-all">
            ←
          </span>
          <span className="font-bold tracking-wider uppercase text-[10px] md:text-xs">
            Back
          </span>
        </Link>
        <div className="text-teal-400 font-mono text-[10px] md:text-sm tracking-widest uppercase">
          ID: 0{cert.id} // SECURED
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20 min-h-screen flex flex-col lg:flex-row gap-8 md:gap-16 items-center lg:items-start">
        {/* Main Content (Image) */}
        <div className="cert-container w-full lg:w-3/5 space-y-6 md:space-y-8">
          <div className="cert-image relative aspect-4/3 w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group bg-slate-900/50">
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
              priority
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl md:rounded-[2rem] pointer-events-none"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8">
            <a
              href={cert.image}
              download
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-teal-400 transition-colors group text-sm md:text-base"
            >
              <span className="text-base md:text-lg">↓</span>
              Save Certificate
            </a>
            <button
              onClick={() => window.print()}
              className="px-6 md:px-8 py-3 md:py-4 bg-white/5 border border-white/10 text-white rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-colors text-sm md:text-base"
            >
              Print Document
            </button>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="cert-info w-full lg:w-2/5 space-y-8 md:space-y-10 lg:sticky lg:top-32">
          <div className="space-y-3 md:space-y-4">
            <span
              className={`inline-block px-3 py-1 md:px-4 md:py-1 rounded-full bg-linear-to-r ${cert.color} text-white text-[10px] md:text-xs font-bold uppercase tracking-widest`}
            >
              Verified Credential
            </span>
            <h1 className="text-3xl md:text-6xl font-black leading-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
              {cert.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
              <h3 className="text-teal-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-1 md:mb-2">
                Issuer
              </h3>
              <p className="text-xl md:text-2xl font-bold">{cert.issuer}</p>
            </div>

            <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
              <h3 className="text-teal-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-1 md:mb-2">
                Specialization
              </h3>
              <p className="text-base md:text-lg font-medium text-slate-300">
                Bioinformatics, AI & Data Science
              </p>
            </div>

            <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
              <h3 className="text-teal-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-1 md:mb-2">
                Status
              </h3>
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm md:text-base">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Officially Verified
              </div>
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-white/10">
            <p className="text-slate-400 text-base md:text-lg leading-relaxed italic">
              "This credential confirms the mastery of key concepts and
              technical skills required for professional excellence in{" "}
              {cert.title}."
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CertificateDetail;
