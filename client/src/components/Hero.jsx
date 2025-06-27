import { assets } from "../assets/assets";
import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [index, setIndex] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [mobile, setMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);
  const scrollRef = useRef(null);
  const heroRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [transitioning, setTransitioning] = useState(true);

  const banners = {
    mobile: [
      assets.phone_1,
      assets.phone_2,
      assets.phone_3,
      assets.phone_4,
      assets.phone_5,
      assets.phone_6,
      assets.phone_7
    ]
      .map(img => ({ image: img, link: "#autumn" })),
    desktop: [
      { image: assets.banner_1, link: "#winter" },
      { image: assets.banner_2, link: "#spring" },
      { image: assets.banner_3, link: "#autumn" },
      { image: assets.banner_4, link: "#sale" },
      { image: assets.banner_5, link: "#new" },
      { image: assets.banner_6, link: "#bestsellers" },
      { image: assets.banner_7, link: "#summer" }
    ]
  };

  const desktopSlides = [banners.desktop.at(-1), ...banners.desktop, banners.desktop[0]];
  const items = useMemo(() => (mobile ? banners.mobile : desktopSlides), [mobile]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    heroRef.current && obs.observe(heroRef.current);
    return () => heroRef.current && obs.unobserve(heroRef.current);
  }, []);

  useEffect(() => {
    const resize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (hovered) return;
    const i = setInterval(() => setIndex(prev => prev + 1), 5000);
    return () => clearInterval(i);
  }, [hovered]);

  useEffect(() => {
    if (mobile && scrollRef.current && inView) {
      scrollRef.current.children[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [index, mobile, inView]);

  useEffect(() => {
    if (!mobile) {
      if (index === desktopSlides.length - 1) {
        const t = setTimeout(() => { setTransitioning(false); setIndex(1); }, 1000);
        return () => clearTimeout(t);
      }
      if (index === 0) {
        const t = setTimeout(() => { setTransitioning(false); setIndex(desktopSlides.length - 2); }, 1000);
        return () => clearTimeout(t);
      }
      setTransitioning(true);
    }
  }, [index, mobile]);

  const Slide = ({ item, i }) => (
    <a href={item.link} key={i} className="h-full flex-shrink-0 relative" style={{ width: `${100 / items.length}%` }}>
      <img src={item.image} alt={`Banner ${i}`} className="w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
    </a>
  );

  return (
    <div ref={heroRef} className="relative w-full h-[50vh] min-h-[400px] md:min-h-[500px] overflow-hidden bg-black">
      {mobile ? (
        <div className="flex overflow-x-auto snap-x snap-mandatory h-full" ref={scrollRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {items.map((item, i) => (
            <a href={item.link} key={i} className="flex-shrink-0 w-full h-full snap-center relative">
              <img src={item.image} alt={`Mobile banner ${i}`} className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </a>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full" style={{ transform: `translateX(-${index * (100 / items.length)}%)`, transition: transitioning ? "transform 1s ease-in-out" : "none", width: `${items.length * 100}%` }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {items.map((item, i) => <Slide key={i} item={item} i={i} />)}
        </div>
      )}

      <div className="absolute bottom-8 left-4 md:left-8 z-10 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-px bg-white" />
          <p className="uppercase tracking-widest text-xs font-medium text-white/80">New Arrivals</p>
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-light mb-4 prata-regular">Timeless Elegance</h1>
        <a href="/collection" className="inline-block px-6 py-2 bg-white text-black uppercase tracking-wider text-xs font-medium hover:bg-opacity-90 transition duration-300">Shop Now</a>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 z-10">
        {banners.desktop.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i + 1)}
            className={`w-2 h-2 rounded-full ${((index - 1 + banners.desktop.length) % banners.desktop.length === i) ? "bg-white w-3" : "bg-white/40"} transition-all duration-300`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {!mobile && (
        <>
          <button onClick={() => setIndex(prev => prev - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full" aria-label="Previous Slide">
            <ChevronLeft className="text-white w-5 h-5" />
          </button>
          <button onClick={() => setIndex(prev => prev + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full" aria-label="Next Slide">
            <ChevronRight className="text-white w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default Hero;
