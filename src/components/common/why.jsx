"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FallingIcons from "@/components/common/FallingIcons";

const allTexts = [
  {
    title: "Unlimited Creative Requests",
    subtitle: "Submit as many as you need",
  },
  {
    title: "Dedicated Project Manager",
    subtitle: "Your single point of contact",
  },
  { title: "Human + AI", subtitle: "The perfect creative blend." },
  {
    title: "Lightning-Fast Turnaround",
    subtitle: "Get your designs in record time",
  },
  { title: "Flat, Transparent Pricing", subtitle: "No surprises, ever" },
  {
    title: "Revisions Until You Love It",
    subtitle: "We don’t stop until you’re happy",
  },
];

const iconsData = [
  {
    id: 1,
    component: <img src="/images/x1.png" alt="icon1" className="" />,
  },
  {
    id: 2,
    component: <img src="/images/x2.png" alt="icon2" className="" />,
  },
  {
    id: 3,
    component: <img src="/images/x3.png" alt="icon3" className="" />,
  },
  {
    id: 4,
    component: <img src="/images/x4.png" alt="icon4" className="" />,
  },
  {
    id: 5,
    component: <img src="/images/x5.png" alt="icon5" className="" />,
  },
  {
    id: 6,
    component: <img src="/images/x6.png" alt="icon6" className="" />,
  },
  {
    id: 7,
    component: <img src="/images/x7.png" alt="icon7" className="" />,
  },
  {
    id: 8,
    component: <img src="/images/x8.png" alt="icon8" className="" />,
  },
];

// function IconBubble({ x, y, angle, children }) {
//   const style = {
//     position: "absolute",
//     left: 0,
//     top: 0,
//     transform: `translate(${Math.round(x - 48)}px, ${Math.round(
//       y - 48
//     )}px) rotate(${(angle || 0) * (180 / Math.PI)}deg)`,
//     width: 96,
//     height: 96,
//     pointerEvents: "none",
//     display: x === undefined ? "none" : "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   };
//   return (
//     <div style={style} className="rounded-full shadow-xl" aria-hidden>
//       <div
//         style={{ width: 74, height: 74, borderRadius: 9999 }}
//         className="bg-neutral-900 flex items-center justify-center"
//       >
//         {children}
//       </div>
//     </div>
//   );
// }

// export function FallingIcons({ containerHeight = 360 }) {
//   const containerRef = useRef(null);
//   const engineRef = useRef(null);
//   const worldRef = useRef(null);
//   const bodiesRef = useRef([]);
//   const [iconPositions, setIconPositions] = useState([]);
//   const [inView, setInView] = useState(false);

//   // intersection observer to trigger animation only once
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           obs.disconnect();
//         }
//       },
//       { threshold: 0.3 }
//     );
//     obs.observe(containerRef.current);
//     return () => obs.disconnect();
//   }, []);

//   // initialize matter engine using dynamic import (client-side only)
//   useEffect(() => {
//     let cancel = false;
//     let rafId = null;

//     async function init() {
//       if (!inView || !containerRef.current) return;
//       // dynamic import ensures this runs only in client environments
//       const Matter = await import("matter-js");

//       if (cancel) return;

//       // create engine + world
//       const engine = Matter.Engine.create();
//       engine.gravity.y = 1;
//       engineRef.current = engine;
//       const world = engine.world;
//       worldRef.current = world;

//      const { width } = containerRef.current.getBoundingClientRect();
//       const height =
//         containerHeight ||
//         containerRef.current.getBoundingClientRect().height ||
//         360;

//       // use a small thickness for the walls
//       const wallThickness = 50;

//       // Create 4 tight walls to form an invisible box
//       const ground = Matter.Bodies.rectangle(
//         width / 2, // center horizontally
//         height + wallThickness / 2, // position center below the bottom edge
//         width, // full width
//         wallThickness,
//         { isStatic: true }
//       );

//       const leftWall = Matter.Bodies.rectangle(
//         -wallThickness / 2, // position center to the left of the edge
//         height / 2, // center vertically
//         wallThickness,
//         height, // full height
//         { isStatic: true }
//       );

//       const rightWall = Matter.Bodies.rectangle(
//         width + wallThickness / 2, // position center to the right of the edge
//         height / 2, // center vertically
//         wallThickness,
//         height, // full height
//         { isStatic: true }
//       );

//       // Also add a ceiling to prevent icons from bouncing out the top
//       const ceiling = Matter.Bodies.rectangle(
//         width / 2, // center horizontally
//         -wallThickness / 2, // position center above the top edge
//         width,
//         wallThickness,
//         { isStatic: true }
//       );

//       Matter.World.add(world, [ground, leftWall, rightWall, ceiling]);

//       // create bodies (same radius for all, but randomized position & motion)
//     const bodies = [];
//       bodiesRef.current = bodies;

//       // Loop through each icon and drop it with a delay
//       iconsData.forEach((icon, i) => {
//         setTimeout(() => {
//           // Ensure the component hasn't been unmounted
//           if (cancel || !worldRef.current) return;

//           const x = Math.random() * width;
//           const y = -100 - Math.random() * 200;
//           const radius = 48; // Or your new radius (e.g., 60)

//           const body = Matter.Bodies.circle(x, y, radius, {
//             restitution: 0.6,
//             friction: 0.3,
//             density: 0.01,
//           });

//           Matter.Body.setVelocity(body, {
//             x: (Math.random() - 0.5) * 4,
//             y: 0,
//           });
//           Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);

//           // Add the new body to the world and our ref array
//           Matter.World.add(world, body);
//           bodies.push(body);

//         }, i * 150); // Stagger each icon drop by 150ms
//       });

//       // animation loop
//       const loop = () => {
//         Matter.Engine.update(engine, 1000 / 60);
//         const newPositions = bodiesRef.current.map((b, i) => ({
//           id: iconsData[i].id,
//           component: iconsData[i].component,
//           x: b.position.x,
//           y: b.position.y,
//           angle: b.angle,
//         }));
//         setIconPositions(newPositions);
//         rafId = requestAnimationFrame(loop);
//       };
//       loop();
//     }

//     init();

//     return () => {
//       cancel = true;
//       if (rafId) cancelAnimationFrame(rafId);
//       if (engineRef.current) {
//         try {
//           // clear world safely
//           engineRef.current.world.bodies = [];
//           engineRef.current = null;
//         } catch (e) {
//           /* ignore */
//         }
//       }
//     };
//   }, [inView, containerHeight]);

//   return (
//     <div
//       ref={containerRef}
//       style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
//     >
//       {iconPositions.map((icon) => (
//         <IconBubble key={icon.id} x={icon.x} y={icon.y} angle={icon.angle}>
//           {icon.component}
//         </IconBubble>
//       ))}
//     </div>
//   );
// }

export default function WhySection() {
  const scrollerRef = useRef(null);
  const viewportRef = useRef(null); // NEW
  const itemRefs = useRef([]); // NEW (rows)
  const [active, setActive] = useState(0); // NEW (index at top)

  // Pause on hover (desktop) / resume on leave (unchanged)
  // useEffect(() => {
  //   const el = scrollerRef.current;
  //   if (!el) return;
  //   const pause = () => (el.style.animationPlayState = "paused");
  //   const resume = () => (el.style.animationPlayState = "running");
  //   el.addEventListener("mouseenter", pause);
  //   el.addEventListener("mouseleave", resume);
  //   return () => {
  //     el.removeEventListener("mouseenter", pause);
  //     el.removeEventListener("mouseleave", resume);
  //   };
  // }, []);

  // Track which row is currently at the very top of the viewport
  useEffect(() => {
    let raf;
    const tick = () => {
      const vp = viewportRef.current;
      if (!vp) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const topY = vp.getBoundingClientRect().top;

      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const dy = Math.abs(el.getBoundingClientRect().top - topY);
        if (dy < bestDist) {
          bestDist = dy;
          bestIdx = i;
        }
      }
      setActive(bestIdx % allTexts.length); // normalize into base list (6)
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="flex flex-col lg:flex-row w-full relative">
      <div className="w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-10 ">
        {/* Top label */}
        <div className="flex flex-col mb-6 lg:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[#cff000] rounded-full" />
            <span className="text-sm sm:text-base font-medium uppercase text-gray-400 tracking-wider">
              Why DSQR Studio
            </span>
          </div>
          <hr className="border-gray-700" />
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 justify-between">
          {/* LEFT */}
<div className="max-w-3xl relative lg:min-h-[460px]">
            <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 lg:mb-6 tracking-tight">
              Creative{" "}
              <em className="font-instrument-italic font-extralight">
                Excellence
              </em>
              ,<br />
              Powered by Precision.
            </h2>
            <p className="text-gray-400 mb-6 lg:mb-8 text-base sm:text-lg lg:text-xl leading-relaxed">
              Trusted by fast-moving brands, we combine expert creatives
              <br /> and smart systems to deliver top-tier content at scale
              without the overhead.
            </p>
</div>
{/* full-left-column falling icons (fills this left column) */}
<div
  className="absolute hidden lg:block inset-0 overflow-hidden pointer-events-none z-0"
>
  {/* omit containerHeight so FallingIcons measures the wrapper height itself */}
  <FallingIcons icons={iconsData} maxBodies={8} dropDelay={140} boundWidth={500} />
</div>



          </div>

          {/* RIGHT – Continuous vertical marquee */}
          <div className="relative">
            {/* Masked viewport: shows ~3 items, tight gap, responsive height via CSS var */}
            <div
              className="relative overflow-hidden rounded-xl"
              style={{ ["--rowH"]: "64px", ["--gap"]: "8px" }}
            >
              {/* gradient masks */}
              {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black to-transparent z-10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black to-transparent z-10" /> */}

              {/* Viewport height = 3 rows + gaps */}
              <div
                ref={viewportRef} // NEW
                className="relative"
                style={{
                  height: `calc((var(--rowH) * 3) + (var(--gap) * 2))`,
                }}
              >
                {/* The scrolling column (duplicated list for seamless loop) */}
                <div
                  ref={scrollerRef}
                  className="flex flex-col pointer-events-none select-none"
                  tabIndex={-1}
                  style={{
                    gap: "var(--gap)",
                    animation: "scrollUp var(--dur) linear infinite",
                    willChange: "transform",
                  }}
                >
                  {[...allTexts, ...allTexts].map((item, i) => {
                    const baseLen = allTexts.length; // 6
                    const logicalIdx = i % baseLen;
                    const isTop = logicalIdx === (active + 1) % baseLen;

                    const titleClass = isTop
                      ? "text-[#cff000]"
                      : "text-gray-400";
                    const subtitleClass = isTop
                      ? "text-gray-300"
                      : "text-gray-500";

                    return (
                      <div
                        key={`${item.title}-${i}`}
                        ref={(el) => (itemRefs.current[i] = el)}
                        className="flex-none"
                        style={{ height: "var(--rowH)" }}
                      >
                        <h3
                          className={`text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold leading-tight ${titleClass}`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`text-sm md:text-base mt-0.5 ${subtitleClass}`}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
<div className="lg:hidden hidden sm:block absolute top-0 right-0 h-full w-1/2 overflow-hidden pointer-events-none z-0">
  <FallingIcons icons={iconsData} maxBodies={6} dropDelay={140} boundWidth={300} />
</div>

            {/* Responsive tuning via styled-jsx variables */}
            <style jsx>{`
              :global(:root) {
                --dur: 14s;
              }

              // @media (prefers-reduced-motion: reduce) {
              //   .flex.flex-col[style*='scrollUp'] {
              //     animation: none !important;
              //   }
              // }

              @keyframes scrollUp {
                0% {
                  transform: translateY(0);
                }
                100% {
                  transform: translateY(-50%);
                }
              }

              @media (min-width: 640px) {
                div[style*="--rowH"] {
                  --rowH: 76px;
                  --gap: 10px;
                }
                :global(:root) {
                  --dur: 16s;
                }
              }
              @media (min-width: 1024px) {
                div[style*="--rowH"] {
                  --rowH: 84px;
                  --gap: 12px;
                }
                :global(:root) {
                  --dur: 18s;
                }
              }
            `}</style>
          </div>
        </div>
       
      </div>
    </section>
  );
}
