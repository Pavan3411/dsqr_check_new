"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import Hls from "hls.js";

export default function ServicesOffered({
  sectionLabel = "Services Offered",
  heading = {
    title1: "Everything You Need",
    title2: "In One",
    title3: "Creative Studio",
  },
  subheading = "Explore our curated edits that turn ordinary footage into extraordinary visuals.",
  verticalServices,
  horizontalServices,
  cdn = false, // ✅ default false
}) {
  // ✅ Dummy fallback data
  const defaultVertical = [
    {
      video: "https://player.vimeo.com/video/1114529674",
      cdnLink:
        "https://res.cloudinary.com/demo/video/upload/f_auto,q_auto/clips/yt_edit.mp4",
      title: "YouTube Video Editing",
    },
    {
      video: "https://player.vimeo.com/video/1114529693",
      cdnLink:
        "https://res.cloudinary.com/demo/video/upload/f_auto,q_auto/clips/reel.mp4",
      title: "Reels / Shorts / TikToks",
    },
  ];

  const defaultHorizontal = [
    {
      video: "https://player.vimeo.com/video/1114529555",
      cdnLink:
        "https://res.cloudinary.com/demo/video/upload/f_auto,q_auto/clips/product.mp4",
      title: "Product showcase",
    },
    {
      video: "https://player.vimeo.com/video/1114529462",
      cdnLink:
        "https://res.cloudinary.com/demo/video/upload/f_auto,q_auto/clips/animation.mp4",
      title: "Animation",
    },
  ];

  // ✅ Use props or fallback
  const vServices = verticalServices?.length
    ? verticalServices
    : defaultVertical;
  const hServices =
    Array.isArray(horizontalServices) && horizontalServices.length > 0
      ? horizontalServices
      : horizontalServices
      ? [] // 👈 if you explicitly pass [], then nothing shows
      : defaultHorizontal; // 👈 only use fallback if you don't pass the prop at all

  // ✅ Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  return (
    <section className="py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col my-4 px-4 lg:px-8">
          <div className="flex items-center gap-2 my-2">
            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              {sectionLabel}
            </span>
          </div>
          <hr className="border-gray-800" />
        </div>

        {/* Heading */}
        <div className="px-4 lg:px-8">
          <div className="mb-12 max-w-4xl">
            <h2 className="text-3xl sm:text-5xl font-medium mt-3">
              {heading.title1} <br />
              {heading.title2}{" "}
              <span className="font-extralight font-instrument-italic">
                {heading.title3}
              </span>
            </h2>
            <p className="mt-4 max-w-md text-base sm:text-xl text-gray-300">
              {subheading}
            </p>
          </div>

          {/* Marquees */}
          <div className="px-4 md:px-8 lg:px-16 space-y-16 relative w-screen -translate-x-1/2 left-1/2">
            {/* Row 1: Vertical */}
            <Marquee
              speed={50}
              direction="left"
              gradient={false}
              className=""
            >
              {vServices.map((s, i) => (
                <ServiceCard
                  key={i}
                  service={s}
                  aspect="aspect-[9/16]"
                  size="small"
                  cdn={cdn}
                />
              ))}
            </Marquee>

            {/* Row 2: Horizontal */}
            {hServices?.length > 0 && (
              <Marquee
                speed={50}
                direction="right" // ✅ opposite direction
                gradient={false}
                className=""
              >
                {hServices.map((s, i) => (
                  <ServiceCard
                    key={i}
                    service={s}
                    aspect="aspect-video"
                    size="large"
                    cdn={cdn}
                  />
                ))}
              </Marquee>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, aspect, size, cdn }) {
  const baseSize =
    size === "large"
      ? "w-48 sm:w-52 md:w-64 lg:w-72"
      : "w-36 sm:w-44 md:w-48 lg:w-52";

  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const observerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false); // whether we attached src/hls

  // Helper to attach HLS or native src
  const attachSource = async () => {
    const video = videoRef.current;
    if (!video || !service?.cdnLink) return;
    // keep muted for autoplay policies
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    // If already attached, don't re-attach
    if (isLoaded) return;

    if (service.cdnLink.includes(".m3u8") && Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(service.cdnLink);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // don't auto-play here — play will be controlled by observer
        setIsLoaded(true);
      });
      // optional: handle error events (network/fatal) if you want retry logic
    } else {
      // native HLS (Safari) or MP4
      video.src = service.cdnLink;
      await video.load();
      setIsLoaded(true);
    }
  };

  // Pause and detach source when not needed (optional to free memory)
  const detachSource = () => {
    const video = videoRef.current;
    if (hlsRef.current) {
      try {
        hlsRef.current.destroy();
      } catch (e) {}
      hlsRef.current = null;
    }
    if (video && !video.paused) {
      video.pause();
    }
    // keep src if you want instant resume; to free memory uncomment next lines:
    // if (video) {
    //   video.removeAttribute('src');
    //   video.load();
    // }
    setIsLoaded(false);
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // IntersectionObserver - play when ~50% visible
    const io = new IntersectionObserver(
      async (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            // attach source lazily and play
            await attachSource();
            try {
              // try to play; ignore promise rejection
              await el.play();
            } catch (err) {
              // autoplay may still reject — ignore
            }
          } else {
            // pause when out of view
            if (!el.paused) el.pause();
            // optional: detach to free memory on long lists
            // detachSource();
          }
        });
      },
      { threshold: 0.5 }
    );

    observerRef.current = io;
    io.observe(el);

    return () => {
      io.disconnect();
      detachSource();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service?.cdnLink, cdn]);

  return (
    <motion.div
      className={`group relative flex-shrink-0 ${baseSize} ${aspect} mr-6 rounded-xl overflow-hidden`}
    >
      {cdn && service.cdnLink ? (
        <video
          ref={videoRef}
          autoPlay={false} // controlled by IntersectionObserver
          loop
          muted
          playsInline
          poster={service.poster}
          preload="metadata"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
        />
      ) : service.video ? (
        <iframe
          src={`${service.video}?autoplay=1&muted=1&loop=1&controls=0&background=1`}
          title={service.title}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          allowFullScreen
        />
      ) : (
        <motion.img
          src={service.img}
          alt={service.title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
          draggable={false}
        />
      )}
    </motion.div>
  );
}

