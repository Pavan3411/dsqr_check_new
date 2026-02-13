'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Portfolio() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.3 })
  const [isPlaying, setIsPlaying] = useState(false)

  // Dynamic video state
  const [portfolioVideo, setPortfolioVideo] = useState(null)
  const libraryId = '588182' // Your Bunny.net library ID

  function getBunnyIframeUrl(hlsUrl, libraryId) {
    // Correct extraction: get the last path segment before /playlist.m3u8
    if (!hlsUrl) return null
    const match = hlsUrl.match(/\/([a-f0-9-]+)\/playlist\.m3u8/)
    if (!match) return null
    const videoId = match[1]
    const url = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=true&muted=true&loop=true&playsinline=true&preload=true`
    console.log('Generated Bunny.net iframe URL:', url)
    return url
  }

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/media-items/category/home_portfolio_video?subsection=home-portfolio`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          setPortfolioVideo(data.data[0])
        }
      })
      .catch((err) => console.error('Portfolio video fetch error:', err))
  }, [])

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  const toggleVideo = () => {
    const video = document.getElementById('portfolio-video')
    if (video) {
      if (isPlaying) {
        video.pause()
        setIsPlaying(false)
      } else {
        video.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <section className="px-4 lg:px-8 py-12 max-w-7xl mx-auto">
      {/* Section Label */}
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Brief Overview
          </span>
        </div>
        <span>
          <hr className="text-gray-900 border-gray-300" />
        </span>
      </div>
      <motion.h2
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.3 } },
        }}
        className="text-3xl md:text-5xl mt-2 flex flex-wrap max-w-2xl"
      >
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
          className=""
        >
          <span className="font-instrument-italic font-extralight whitespace-nowrap">
            Editing magic
          </span>
        </motion.span>

        <motion.span
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
          className="font-semibold ml-2 tracking-tight"
        >
          that Brings
        </motion.span>

        <motion.span
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
          className="font-semibold tracking-tight"
        >
          your Vision to Life
        </motion.span>
      </motion.h2>

      <p className="text-gray-400 mt-4 max-w-96 text-base sm:text-lg">
        Explore your dream world, where you can <br /> make your dreams come
        true
      </p>

      {/* Video Section (no animation) */}
      <div className="relative mt-16 md:mt-10 flex flex-col md:flex-row md:items-start gap-6 max-w-7xl">
        {/* Video Label */}
        <span className="absolute md:-top-[15%] -top-[30%] right-[3%] rotate-15 bg-black text-white text-sm px-3 py-1 rounded-full">
          @Video
          <span
            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-0 h-0 
    border-l-[6px] border-l-transparent 
    border-r-[6px] border-r-transparent 
    border-t-[6px] border-t-black"
          ></span>
        </span>

        {/* Video */}
        <motion.div
          className="relative w-full max-w-6xl mx-auto mt-6 overflow-hidden rounded-xl aspect-video shadow-2xl"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {portfolioVideo &&
          getBunnyIframeUrl(portfolioVideo.src, libraryId) ? (
            <iframe
              src={getBunnyIframeUrl(portfolioVideo.src, libraryId)}
              loading="lazy"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
              className="w-full h-full border-0"
              title={portfolioVideo.title || 'DSQR Studio autoplay'}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
              Loading portfolio video...
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
