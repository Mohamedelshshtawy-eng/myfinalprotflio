import LandPage from "./landpage/page";
import Hero from "./pages/Hero";
import ZoomSection from "./pages/ZoomSection";
import About from "./pages/About";
import Cursor from "./components/Cursor";

export default function Home() {
  return (
    <div>
      <Cursor />
      <LandPage />
      <ZoomSection />
      <Hero />
      <About />
    </div>
  );
}
