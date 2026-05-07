"use client";
import React from "react";
import LandPage from "./landpage/page";
import Hero from "./pages/Hero";

import ZoomSection from "./pages/ZoomSection";
import About from "./pages/About";

import Cursor from "./components/Cursor";
import GlobalLoader from "./components/Loader";
import Journey from "./pages/Journey";

export default function Home() {
  return (
    <div>
      <GlobalLoader />
      <Cursor />
      <LandPage />
      <ZoomSection />
      <Hero />
      <Journey />
      <About />
    </div>
  );
}
