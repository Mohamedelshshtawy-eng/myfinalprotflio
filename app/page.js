import LandPage from "./landpage/page";
import Hero from "./pages/Hero";
import ZoomSection from "./pages/ZoomSection";
import About from "./pages/About";
import Cursor from "./components/Cursor";
import GlobalLoader from "./components/Loader";

export default function Home() {
  return (
    <div>
      <GlobalLoader />
      <Cursor />
      <LandPage />
      <ZoomSection />
      <Hero />
      <About />
    </div>
  );
}
