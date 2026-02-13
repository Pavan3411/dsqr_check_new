'use client'

import React from 'react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

import { useState, useEffect } from 'react'

export default function TrustedBySection() {
  const [logos, setLogos] = useState([])
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/media-items/category/client_logos`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched logo data:', data)
        if (data && Array.isArray(data.data)) {
          // Only use the src property from each logo object
          const logoSrcs = data.data.map((l) => l.src).filter(Boolean)
          console.log('Logo srcs:', logoSrcs)
          setLogos(logoSrcs)
        } else {
          console.log('Logo data is not an array:', data.data)
        }
      })
      .catch((err) => console.error('Failed to fetch logos:', err))
  }, [])

  return (
    <section className="md:py-12 py-4 overflow-hidden relative">
      <div>
        <h2 className="text-4xl sm:text-5xl font-semibold mb-2 tracking-tight px-4 sm:px-8 max-w-7xl mx-auto">
          Trusted by{' '}
          <span className="font-instrument-italic font-extralight">
            the Best.
          </span>
        </h2>
        <p className="text-gray-400 md:mb-10 mb-4 text-base sm:text-xl px-4 sm:px-8 max-w-7xl mx-auto">
          Global Clients who trusts us
        </p>

        {/* Marquee Section */}
        <Marquee speed={90} direction="left" gradient={false} className="py-6">
          {logos.map((src, i) => (
            <div
              key={src || i}
              className="mx-4 md:mx-10 flex items-center justify-center"
            >
              <Image
                src={src}
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
  )
}
