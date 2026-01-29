"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const logos = [
  "/images/L2.png",
  "/images/L3.png",
  "/images/L4.png",
  "/images/L5.png",
  "/images/L6.png",
  "/images/L7.png",
  "/images/L8.png",
  "/images/L9.png",
  "/images/L10.png",
  "/images/L11.png",
  "/images/L12.png",
  "/images/L13.png",
  "/images/L14.png",
  "/images/L15.png",
  "/images/L16.png",
  "/images/L17.png",
  "/images/L18.png",
  "/images/L19.png",
  "/images/L20.png",
];

export default function TrustedBySection() {
  return (
    <section className="md:py-12 py-4 overflow-hidden relative">
      <div>
        <h2 className="text-4xl sm:text-5xl font-semibold mb-2 tracking-tight px-4 sm:px-8 max-w-7xl mx-auto">
          Trusted by{" "}
          <span className="font-instrument-italic font-extralight">
            the Best.
          </span>
        </h2>
        <p className="text-gray-400 md:mb-10 mb-4 text-base sm:text-xl px-4 sm:px-8 max-w-7xl mx-auto">
          Global Clients who trusts us
        </p>

        {/* Marquee Section */}
        <Marquee
          speed={90}
          // pauseOnHover={true}
          // pauseOnClick={true}
          direction="left"
          gradient={false}
          className="py-6"
        >
          {logos.map((img, i) => (
            <div key={i} className="mx-4 md:mx-10 flex items-center justify-center">
              <Image
                src={img}
                alt={`Logo ${i}`}
                width={180}
                height={120}
                className="h-24 w-36 sm:h-32 sm:w-48 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
