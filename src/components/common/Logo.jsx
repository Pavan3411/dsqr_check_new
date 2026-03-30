'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { useQuery } from '@tanstack/react-query' // Added this

export default function TrustedBySection() {

  const { data: logos = [], isLoading } = useQuery({
    queryKey: ['client-logos'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/media-items/category/client_logos`
      )
      const data = await res.json()
      if (data && Array.isArray(data.data)) {
        return data.data.map((l) => l.src).filter(Boolean)
      }
      return []
    },
    staleTime: 60 * 60 * 1000, // Logos stay fresh in cache for 1 hour
  })

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
          Global Clients who trust us
        </p>

        {/* Container with a fixed height to prevent layout shift.
          We show the skeleton while isLoading is true.
        */}
        <div className="min-h-[120px] sm:min-h-[160px] flex items-center">
          {isLoading ? (
            /* Skeleton Loader */
            <div className="flex gap-8 px-8 w-full animate-pulse justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className="h-24 w-36 sm:h-32 sm:w-48 bg-gray-50 rounded-xl"
                />
              ))}
            </div>
          ) : logos.length > 0 ? (
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
                    // Important: No 'unoptimized' here for better caching
                  />
                </div>
              ))}
            </Marquee>
          ) : (
            /* Safe fallback if no logos exist in DB */
            <div className="h-24 sm:h-32" /> 
          )}
        </div>
      </div>
    </section>
  )
}