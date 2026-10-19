import Hero from "../components/home/Hero";
import Marquee from "../components/home/Marquee";
import AboutAnimated from "../components/home/AboutAnimated";
import FanFavorites from "../components/home/FanFavorites";
import Process from "../components/home/Process";
import Contact from "../components/home/Contact";
import CtaBand from "../components/home/CtaBand";
import useReveal from "../hooks/useReveal";

function Home() {
  useReveal();

  return (
    <div className="home-page">
      <Hero />
      <Marquee />
      <div id="about"><AboutAnimated /></div>
      <div id="favorites"><FanFavorites /></div>
      <Process />
      <div id="contact"><Contact /></div>
      <CtaBand />
    </div>
  );
}

export default Home;