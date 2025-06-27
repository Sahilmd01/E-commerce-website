import { assets } from "../assets/assets";
import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  // Track if Hero is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileBanners = [
    { image: assets.phone_1, link: "#winter" },
    { image: assets.phone_2, link: "#spring" },
    { image: assets.phone_3, link: "#autumn" },
    { image: assets.phone_4, link: "#autumn" },
    { image: assets.phone_5, link: "#autumn" },
    { image: assets.phone_6, link: "#autumn" },
    { image: assets.phone_7, link: "#autumn" },
  ];

  const desktopBanners = [
    { image: assets.banner_1, link: "#winter" },
    { image: assets.banner_2, link: "#spring" },
    { image: assets.banner_3, link: "#autumn" },
    { image: assets.banner_4, link: "#sale" },
    { image: assets.banner_5, link: "#new" },
    { image: assets.banner_6, link: "#bestsellers" },
    { image: assets.banner_7, link: "#summer" },
  ];

  const galleryItems = useMemo(() => (isMobile ? mobileBanners : desktopBanners), [isMobile]);

  // Autoscroll
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, galleryItems]);

  // Scroll into view for mobile only if Hero is in viewport
  useEffect(() => {
    if (isMobile && scrollContainerRef.current && isInView) {
      const scrollTo = scrollContainerRef.current.children[currentImageIndex];
      scrollTo?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [currentImageIndex, isMobile, isInView]);

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[50vh] min-h-[400px] md:min-h-[500px] overflow-hidden bg-black"
    >
      {isMobile ? (
        <div
          className="flex overflow-x-auto snap-x snap-mandatory h-full"
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {galleryItems.map((item, index) => (
            <a
              href={item.link}
              key={index}
              className="flex-shrink-0 w-full h-full snap-center relative"
            >
              <img
                src={item.image}
                alt={`Mobile banner ${index}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </a>
          ))}
        </div>
      ) : (
        <a
          href={galleryItems[currentImageIndex].link}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute inset-0 z-0"
        >
          <img
            src={galleryItems[currentImageIndex].image}
            alt={`Banner for ${galleryItems[currentImageIndex].link.replace("#", "")}`}
            className="w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </a>
      )}

      {/* Text Content */}
      <div className="absolute bottom-8 left-4 md:left-8 z-10 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-px bg-white" />
          <p className="uppercase tracking-widest text-xs font-medium text-white/80">New Arrivals</p>
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-light mb-4 prata-regular">
          Timeless Elegance
        </h1>
        <a
          href="/collection"
          className="inline-block px-6 py-2 bg-white text-black uppercase tracking-wider text-xs font-medium hover:bg-opacity-90 transition duration-300"
        >
          Shop Now
        </a>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 z-10">
        {galleryItems.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full ${
              currentImageIndex === index ? "bg-white w-3" : "bg-white/40"
            } transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrows (Desktop only) */}
      {!isMobile && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full"
            aria-label="Next Slide"
          >
            <ChevronRight className="text-white w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default Hero;
