"use client";

import React, { useEffect, useRef, useState } from "react";

export default function FallingIcons({
  icons = [],
  dropDelay = 150,
  maxBodies = 12,
  gravity = 1,
  boundWidth = 300, // <--- new prop for horizontal bound
}) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const worldRef = useRef(null);
  const bodiesRef = useRef([]);
  const [iconPositions, setIconPositions] = useState([]);
  const [inView, setInView] = useState(false);

  // observe visibility
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

 function IconBubble({ x, y, angle, children, size = 96 }) {
  const inner = size * 0.77; // inner circle relative
  const style = {
    position: "absolute",
    left: 0,
    top: 0,
    transform: `translate(${Math.round(x - size / 2)}px, ${Math.round(
      y - size / 2
    )}px) rotate(${(angle || 0) * (180 / Math.PI)}deg)`,
    width: size,
    height: size,
    pointerEvents: "none",
    display: x === undefined ? "none" : "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={style} className="rounded-full" aria-hidden>
      <div
        style={{ width: inner, height: inner, borderRadius: "9999px" }}
        className="bg-neutral-900 flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  );
}

  useEffect(() => {
    let cancel = false;
    let rafId = null;

    async function init() {
      if (!inView || !containerRef.current) return;
      const Matter = await import("matter-js");
      if (cancel) return;

      const engine = Matter.Engine.create();
      engine.gravity.y = gravity;
      engineRef.current = engine;
      const world = engine.world;
      worldRef.current = world;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width || 800;
      const height = rect.height || 400;

      // ⚡ bound area = 300px wide centered horizontally
      const boundX = width / 2; // center
      const halfBound = boundWidth / 2;

      // ground at bottom of section
      const ground = Matter.Bodies.rectangle(
        boundX,
        height + 10,
        boundWidth,
        20,
        { isStatic: true }
      );

      // vertical walls at left/right of 300px column
      const leftWall = Matter.Bodies.rectangle(
        boundX - halfBound,
        height / 2,
        20,
        height * 2,
        { isStatic: true }
      );
      const rightWall = Matter.Bodies.rectangle(
        boundX + halfBound,
        height / 2,
        20,
        height * 2,
        { isStatic: true }
      );

      Matter.World.add(world, [ground, leftWall, rightWall]);

      const bodies = [];
      bodiesRef.current = bodies;

      // drop icons inside the bound area
      const timeouts = [];
      icons.slice(0, maxBodies).forEach((icon, i) => {
        const t = setTimeout(() => {
          if (cancel || !worldRef.current) return;

          const x =
            boundX - halfBound + 40 + Math.random() * (boundWidth - 80); // safe margin
          const y = -50 - Math.random() * 150;
          const radius = 48;

          const body = Matter.Bodies.circle(x, y, radius, {
            restitution: 0.5,
            friction: 0.3,
            density: 0.01,
          });

          Matter.Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 3,
            y: 0,
          });
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);

          Matter.World.add(world, body);
          bodies.push(body);
        }, i * dropDelay);
        timeouts.push(t);
      });

      // animation loop
      const loop = () => {
        Matter.Engine.update(engine, 1000 / 60);
        const newPositions = bodiesRef.current.map((b, i) => {
          const iconIndex = i % icons.length;
          return {
            id: icons[iconIndex]?.id ?? i,
            component: icons[iconIndex]?.component ?? null,
            x: b.position.x,
            y: b.position.y,
            angle: b.angle,
          };
        });
        setIconPositions(newPositions);
        rafId = requestAnimationFrame(loop);
      };
      loop();

      return () => {
        cancel = true;
        timeouts.forEach((t) => clearTimeout(t));
        if (rafId) cancelAnimationFrame(rafId);
        if (engineRef.current) {
          Matter.World.clear(worldRef.current, false);
          Matter.Engine.clear(engineRef.current);
          engineRef.current = null;
          worldRef.current = null;
          bodiesRef.current = [];
        }
      };
    }

    let cleanupFn = null;
    (async () => {
      cleanupFn = await init();
    })();

    return () => {
      if (typeof cleanupFn === "function") cleanupFn();
    };
  }, [inView, icons, dropDelay, maxBodies, gravity, boundWidth]);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden
    >
      {iconPositions.map((icon) => (
       <IconBubble key={icon.id} x={icon.x} y={icon.y} angle={icon.angle} size={window.innerWidth < 640 ? 96 : 96}>
  {icon.component}
</IconBubble>

      ))}
    </div>
  );
}