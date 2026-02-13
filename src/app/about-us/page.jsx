'use client'

import { Check } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import TrustedBySection from '@/components/common/Logo'
import TestimonialSection from '@/components/common/Testimonial'
import FAQ from '@/components/common/FAQ'
import CalendarSection from '@/components/common/calendar'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import ScrollingFooterBanner from '../../components/common/ScrollingFooterBanner'
import { useAnimatedBackground } from '../../components/hooks/useAnimatedBackground'
import VideoHLS from '@/components/common/VideoHLS'
import '../embla.css'
import EmblaCarousel from '@/components/common/EmblaCarousel'
/** Helper: pad number to 6 digits */
const pad6 = (n) => String(n).padStart(6, '0')
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

function DigitBox({ value }) {
  return (
    <div className="h-18 sm:h-24 md:h-28 lg:h-32 w-12 sm:w-16 md:w-20 lg:w-24 rounded-lg sm:rounded-xl bg-gray-300/80 flex items-center justify-center shadow-sm">
      <div className="relative overflow-hidden leading-none">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="block text-3xl sm:text-4xl md:text-5xl lg:text-8xl tabular-nums font-bold md:font-black md:[--tw-text-opacity:1] md:text-black [-webkit-text-stroke:2px_black]"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

/** Counter row of 6 digits */
function CounterRow({ target = 7239, duration = 2500 }) {
  const [current, setCurrent] = useState(0)
  const raf = useRef(null)
  const startTs = useRef(null)

  useEffect(() => {
    const tick = (ts) => {
      if (startTs.current === null) startTs.current = ts
      const t = Math.min(1, (ts - startTs.current) / duration)
      const eased = easeOutCubic(t)
      setCurrent(Math.round(Number(target) * eased))
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, duration])

  const digits = useMemo(() => pad6(current).split(''), [current])

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center">
      {digits.map((d, idx) => (
        <div key={`${idx}-${d}`} className="flex items-center">
          <DigitBox value={d} />
          {idx === 2 && (
            <span className="inline-block translate-y-3 mx-1 sm:mx-2 font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-8xl leading-none">
              ,
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default function About_Us() {
  const containerRef = useRef(null) // Ref for the whole page container
  const blackSectionStartRef = useRef(null) // Ref for the start of the black section
  const blackSectionEndRef = useRef(null) // Ref for the end of the black section
  const { scrollYProgress } = useScroll()
  const startShowingBannerRef = useRef(null)
  const stopShowingBannerRef = useRef(null)
  const [imgError, setImgError] = useState(false)
  const [aboutUsImg, setAboutUsImg] = useState(null)
  const [imageList, setImageList] = useState([])

  useEffect(() => {
    async function fetchAboutUsImg() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/media-items/category/extras?subsection=about_us`,
          { credentials: 'include' },
        )
        const data = await res.json()
        // Expecting data.data to be an array of media items
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          // Use the first item's src property
          setAboutUsImg(data.data[0].src)
        }
      } catch (err) {
        console.error('Failed to fetch about_us image:', err)
      }
    }
    fetchAboutUsImg()
  }, [])
  const counterRef = useRef(null)
  const inView = useInView(counterRef, { once: true, margin: '-100px' })

  // Dynamic imageList fetch
  useEffect(() => {
    const API_CATEGORY = 'team_photos'
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/media-items/category/${API_CATEGORY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched team photos:', data)
        // Use data.data as the array of media items
        const images = Array.isArray(data.data)
          ? data.data.map((item) => item.src)
          : []
        setImageList(images)
      })
      .catch(() => setImageList([]))
  }, [])
  useEffect(() => {
    console.log('imageList:', imageList)
  }, [imageList])

  // Example data (you can add as many as you like)
  const items = [
    { id: 1, before: '/images/1.png', after: '/images/1.png' },
    { id: 2, before: '/images/2.png', after: '/images/2.png' },
    { id: 3, before: '/images/3.png', after: '/images/3.png' },
    { id: 4, before: '/images/4.png', after: '/images/4.png' },
  ]

  // Duplicate the array so loop looks infinite
  const loopItems = [
    {
      id: 1,
      before:
        'https://vz-0822fa3c-02f.b-cdn.net/71116b1f-a151-4e5a-be49-64896496420c/playlist.m3u8',
      beforePoster:
        'https://vz-0822fa3c-02f.b-cdn.net/71116b1f-a151-4e5a-be49-64896496420c/thumbnail.jpg',
      after:
        'https://vz-0822fa3c-02f.b-cdn.net/b8e80cd5-629d-4879-9eec-a1f1b37f7a0d/playlist.m3u8',
      afterPoster:
        'https://vz-0822fa3c-02f.b-cdn.net/b8e80cd5-629d-4879-9eec-a1f1b37f7a0d/thumbnail.jpg',
    },
    {
      id: 2,
      before:
        'https://vz-0822fa3c-02f.b-cdn.net/870edf38-a755-4af7-9a22-21ca2edf732e/playlist.m3u8',
      beforePoster:
        'https://vz-0822fa3c-02f.b-cdn.net/870edf38-a755-4af7-9a22-21ca2edf732e/thumbnail.jpg',
      after:
        'https://vz-0822fa3c-02f.b-cdn.net/3cc0224c-3031-49e8-b8f6-1c70c6f831f2/playlist.m3u8',
      afterPoster:
        'https://vz-0822fa3c-02f.b-cdn.net/3cc0224c-3031-49e8-b8f6-1c70c6f831f2/thumbnail.jpg',
    },
    {
      id: 3,
      before:
        'https://vz-0822fa3c-02f.b-cdn.net/d40562ff-dd7e-4e41-af5e-3c038c5d5eb9/playlist.m3u8',
      beforePoster:
        'https://vz-0822fa3c-02f.b-cdn.net/d40562ff-dd7e-4e41-af5e-3c038c5d5eb9/thumbnail.jpg',
      after:
        'https://vz-0822fa3c-02f.b-cdn.net/68a5ea5d-5d34-42dd-ac17-32557c0225a6/playlist.m3u8',
      afterPoster:
        'https://vz-0822fa3c-02f.b-cdn.net/68a5ea5d-5d34-42dd-ac17-32557c0225a6/thumbnail.jpg',
    },
    {
      id: 4,
      before:
        'https://vz-0822fa3c-02f.b-cdn.net/59a7ded6-de38-44b8-b753-410df6bac927/playlist.m3u8',
      beforePoster:
        'https://vz-0822fa3c-02f.b-cdn.net/59a7ded6-de38-44b8-b753-410df6bac927/thumbnail.jpg',
      after:
        'https://vz-0822fa3c-02f.b-cdn.net/ed068864-5043-4851-94a1-79f50096a619/playlist.m3u8',
      afterPoster:
        'https://vz-0822fa3c-02f.b-cdn.net/ed068864-5043-4851-94a1-79f50096a619/thumbnail.jpg',
    },
    {
      id: 5,
      before:
        'https://vz-0822fa3c-02f.b-cdn.net/d0a14536-069c-4a47-b05b-6472188862b5/playlist.m3u8',
      beforePoster:
        'https://vz-0822fa3c-02f.b-cdn.net/d0a14536-069c-4a47-b05b-6472188862b5/thumbnail.jpg',
      after:
        'https://vz-0822fa3c-02f.b-cdn.net/c22de45a-4dc7-40e7-b88a-f2d6611c4351/playlist.m3u8',
      afterPoster:
        'https://vz-0822fa3c-02f.b-cdn.net/c22de45a-4dc7-40e7-b88a-f2d6611c4351/thumbnail.jpg',
    },
    {
      id: 1,
      before:
        'https://vz-0822fa3c-02f.b-cdn.net/71116b1f-a151-4e5a-be49-64896496420c/playlist.m3u8',
      beforePoster:
        'https://vz-0822fa3c-02f.b-cdn.net/71116b1f-a151-4e5a-be49-64896496420c/thumbnail.jpg',
      after:
        'https://vz-0822fa3c-02f.b-cdn.net/b8e80cd5-629d-4879-9eec-a1f1b37f7a0d/playlist.m3u8',
      afterPoster:
        'https://vz-0822fa3c-02f.b-cdn.net/b8e80cd5-629d-4879-9eec-a1f1b37f7a0d/thumbnail.jpg',
    },
    {
      id: 2,
      before:
        'https://vz-0822fa3c-02f.b-cdn.net/870edf38-a755-4af7-9a22-21ca2edf732e/playlist.m3u8',
      beforePoster:
        'https://vz-0822fa3c-02f.b-cdn.net/870edf38-a755-4af7-9a22-21ca2edf732e/thumbnail.jpg',
      after:
        'https://vz-0822fa3c-02f.b-cdn.net/3cc0224c-3031-49e8-b8f6-1c70c6f831f2/playlist.m3u8',
      afterPoster:
        'https://vz-0822fa3c-02f.b-cdn.net/3cc0224c-3031-49e8-b8f6-1c70c6f831f2/thumbnail.jpg',
    },
    {
      id: 3,
      before:
        'https://vz-0822fa3c-02f.b-cdn.net/d40562ff-dd7e-4e41-af5e-3c038c5d5eb9/playlist.m3u8',
      beforePoster:
        'https://vz-0822fa3c-02f.b-cdn.net/d40562ff-dd7e-4e41-af5e-3c038c5d5eb9/thumbnail.jpg',
      after:
        'https://vz-0822fa3c-02f.b-cdn.net/68a5ea5d-5d34-42dd-ac17-32557c0225a6/playlist.m3u8',
      afterPoster:
        'https://vz-0822fa3c-02f.b-cdn.net/68a5ea5d-5d34-42dd-ac17-32557c0225a6/thumbnail.jpg',
    },
    {
      id: 4,
      before:
        'https://vz-0822fa3c-02f.b-cdn.net/59a7ded6-de38-44b8-b753-410df6bac927/playlist.m3u8',
      beforePoster:
        'https://vz-0822fa3c-02f.b-cdn.net/59a7ded6-de38-44b8-b753-410df6bac927/thumbnail.jpg',
      after:
        'https://vz-0822fa3c-02f.b-cdn.net/ed068864-5043-4851-94a1-79f50096a619/playlist.m3u8',
      afterPoster:
        'https://vz-0822fa3c-02f.b-cdn.net/ed068864-5043-4851-94a1-79f50096a619/thumbnail.jpg',
    },
    {
      id: 5,
      before:
        'https://vz-0822fa3c-02f.b-cdn.net/d0a14536-069c-4a47-b05b-6472188862b5/playlist.m3u8',
      beforePoster:
        'https://vz-0822fa3c-02f.b-cdn.net/d0a14536-069c-4a47-b05b-6472188862b5/thumbnail.jpg',
      after:
        'https://vz-0822fa3c-02f.b-cdn.net/c22de45a-4dc7-40e7-b88a-f2d6611c4351/playlist.m3u8',
      afterPoster:
        'https://vz-0822fa3c-02f.b-cdn.net/c22de45a-4dc7-40e7-b88a-f2d6611c4351/thumbnail.jpg',
    },
  ]

  const { backgroundColor, textColor } = useAnimatedBackground({
    startRef: blackSectionStartRef,
    endRef: blackSectionEndRef,
  })

  return (
    <div ref={containerRef} className="relative bg-primary">
      {/* B. Add the fixed background element that will change color */}
      <motion.div
        style={{ backgroundColor }}
        className="fixed inset-0 w-full h-full z-0"
      />
      <motion.div style={{ color: textColor }} className="relative z-10">
        <section className="relative md:min-h-[40vh] min-h-[34vh] md:py-16 py-8 pt-2 px-6 lg:px-16 mt-10 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative z-10">
              {/* Heading */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-12 md:mb-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Turning{' '}
                <span className="font-instrument-italic font-extralight mr-2">
                  Ideas
                </span>
                into <br /> <span className="">Visuals that Inspire</span>
              </motion.h1>
              {/* Floating Tag - Left */}
              <motion.span
                className="absolute -top-6 md:top-10 -left-[5%] md:-left-[0%] -rotate-12  bg-gradient-to-r from-orange-500 to-orange-600 text-white md:block hidden text-base px-3 py-2 rounded-full shadow-md"
                initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ delay: 0, duration: 0.5 }}
              >
                @Join us
                <span
                  className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-0 h-0 
                border-l-[6px] border-l-transparent 
                border-r-[6px] border-r-transparent 
                border-t-[6px] border-t-[#F27247]"
                ></span>
              </motion.span>

              {/* Floating Tag - Right */}
              <motion.span
                className="absolute -top-6 md:top-10 -right-[5%] md:-right-[0%] rotate-12 bg-black text-white text-base md:block hidden px-3 py-2 rounded-full shadow-md"
                initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{ delay: 0, duration: 0.5 }}
              >
                @workus
                <span
                  className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-0 h-0 
                border-l-[6px] border-l-transparent 
                border-r-[6px] border-r-transparent 
                border-t-[6px] border-t-black"
                ></span>
              </motion.span>
            </div>
            {/* Subtext */}
            <motion.p
              className="text-gray-600 md:mt-4 mt-0 text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              At DSQR Studio, we blend creativity, strategy, and technology to
              craft videos, graphics, and AI-driven content that elevate brands
              and engage audiences across every platform.
            </motion.p>
          </div>
        </section>
        <div ref={startShowingBannerRef}>
          <TrustedBySection />
        </div>
        <section className="px-4 py-6 md:py-2 lg:px-8 max-w-7xl mx-auto">
          {/* Small Heading */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#cff000] rounded-full"></div>
              <span className="text-sm sm:text-base uppercase tracking-wider">
                Our Story
              </span>
            </div>
            <hr className="border-gray-300" />
          </div>
          <div className="max-w-7xl mx-auto py-5 md:py-8">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold max-w-lg lg:max-w-[500px] tracking-tight">
              "Turning a Passion for{' '}
              <span className="font-instrument-italic font-extralight">
                Creativity
              </span>{' '}
              into Endless Opportunities for{' '}
              <span className="font-instrument-italic font-extralight">
                Creative Minds."
              </span>
            </h2>

            {/* Image & Signature */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative mt-20 sm:mt-10">
              {/* Left text (intro) */}
              <div className="md:max-w-[250px] md:text-xl text-base order-2 sm:order-1 mt-2 sm:mt-0">
                <p>
                  What started as a small idea helping brands stand out with
                  scroll-stopping edits has grown into DSQR Studio: a creative
                  partner trusted worldwide shaping stories, designs, and
                  experiences that connect.
                </p>
              </div>

              {/* Green background + founder image + signature */}
              <div className="relative w-full max-w-4xl order-1 sm:order-2 mt-24 md:mt-0">
                {/* Green div (half height) */}
                <div className="bg-[var(--color-primary)] rounded-b-xl h-32 sm:h-40 md:h-44 lg:h-64 w-full mx-auto"></div>

                {/* Signature image */}
                <div className="w-20 sm:w-32 lg:w-40 sm:h-28 h-28 z-10 md:-top-[22%] sm:top-[-32%] top-[-26%] left-[4%] -rotate-12 absolute">
                  <Image
                    src="/images/dsign.png"
                    alt="Signature"
                    width={200}
                    height={70}
                    className="object-contain"
                  />
                </div>

                {/* Founder image */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
                  <Image
                    src="/images/di.png"
                    alt="Founder"
                    width={650}
                    height={560}
                    className="object-contain w-[420px] xs:w-[300px] sm:w-[350px] md:w-[420px] lg:w-[640px] h-auto mx-auto"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 space-y-4 md:max-w-xl md:text-xl text-base order-3">
              <p>
                We’ve always believed great storytelling isn’t just about visual
                it’s about creating impact. From our very first project to the
                thousands of edits we deliver today.
              </p>
            </div>

            {/* Description */}
            {/* <div className="mt-4 space-y-4 max-w-xl md:text-xl text-base">
            <p>
           We’ve always believed great storytelling isn’t just about visual-it’s about creating impact. From our very first project to the thousands of edits we deliver today.
            </p>
          </div> */}
          </div>
        </section>
        <section className="px-4 py-6 md:py-10 lg:px-8 max-w-7xl mx-auto">
          {/* Small Heading */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-primary)]" />
            <span className="uppercase tracking-wider text-base">
              Our Mission &amp; Vision
            </span>
          </div>
          <hr className="mt-2 border-neutral-200" />
          <div className="mx-auto max-w-7xl py-2 flex flex-col gap-4">
            {/* Title */}
            <h2 className="md:mt-8 mt-5 text-center text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              On A Mission To Shape The <br className="hidden sm:block" />
              Future Of{' '}
              <span className="font-instrument-italic font-extralight">
                Storytelling
              </span>
            </h2>

            {/* Counter */}
            <div className="md:mt-20 mt-16 relative">
              <motion.div ref={counterRef}>
                {inView && <CounterRow target={'011239'} />}
              </motion.div>
              <motion.span
                className="absolute -top-16 md:left-[20%] left-[10%] -rotate-6  bg-[#F27247] text-white text-xs md:text-base px-3 py-1 rounded-full shadow-md"
                initial={{ opacity: 0, y: -30, scale: 0.7, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: -6 }}
                transition={{
                  type: 'spring', // 👈 makes it bouncy
                  stiffness: 120, // controls the "spring" tightness
                  damping: 10, // lower = more bounce
                  duration: 0.6,
                }}
                viewport={{ once: true, amount: 0.7 }}
              >
                @Creativities delivered
                <span
                  className="absolute left-1/4 -bottom-[5px] -translate-x-1/2 w-0 h-0 
                border-l-[6px] border-l-transparent 
                border-r-[6px] border-r-transparent 
                border-t-[6px] border-t-[#F27247]"
                ></span>
              </motion.span>
            </div>

            {/* Tagline */}
            <p className="mt-6 text-center sm:max-w-xl mx-auto text-xl md:text-lg lg:text-3xl font-medium">
              It’s not about us it’s about{' '}
              <span className="">
                Empowering <br /> Brands to Stand Out.
              </span>
            </p>

            {/* Grid */}
            <div className="md:mt-12 mt-7 grid grid-cols-1 lg:grid-cols-2 md:gap-10 gap-6 items-start max-w-5xl mx-auto">
              {/* Left text */}
              <div className="md:space-y-10 space-y-6 justify-self-start">
                <div>
                  <h3 className="text-2xl md:text-4xl font-semibold">
                    Our Mission
                  </h3>
                  <p className="mt-3 text-lg sm:text-xl max-w-prose">
                    Our mission is simple: craft content that captures
                    attention, builds trust, and drives growth.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl md:text-4xl font-semibold">
                    Our Vision
                  </h3>
                  <p className="mt-3 text-lg sm:text-xl max-w-prose">
                    We harness creativity and AI to redefine how stories are
                    told in the digital age.
                  </p>
                </div>
              </div>

              {/* Right image */}
              <div className="relative justify-self-end">
                <Image
                  src="https://dsqrstudio.b-cdn.net/Extra's/TV%20Web%20Final-PS%20Good%20Size.png?w=800&format=webp&quality=75"
                  alt="Creative workspace"
                  width={800}
                  height={650}
                  className="rounded-2xl w-80% h-80% object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <div ref={blackSectionStartRef}>
          <section className="overflow-x-hidden">
            {/* Section Header */}
            <div className="md:py-16 py-5 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="mb-10 text-left">
                <div className="my-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                      What we create
                    </span>
                  </div>
                  <hr className="border-gray-700" />
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold mb-4">
                  From Raw to{' '}
                  <span className="font-light font-instrument-italic">
                    Remarkable
                  </span>
                </h2>
                <p className="text-gray-400 text-base md:text-lg max-w-xl">
                  Raw inputs, refined outputs. That’s the DSQR touch.
                </p>
              </div>

              {/* React Marquee */}
              {/* Original wrapper from your first request for full width centering */}
              <div className="relative w-screen left-1/2 -translate-x-1/2">
                {/* Pass your actual data (loopItems) to the component */}
                <EmblaCarousel
                  slidesData={loopItems} // Renamed to clearly hold the video data
                  options={{ loop: true }} // Pass your Embla options
                />
              </div>
            </div>
          </section>
        </div>

        <div ref={blackSectionEndRef}></div>
        <section className="px-4 md:py-10 py-6 lg:px-8 max-w-7xl mx-auto">
          {/* Small Heading */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
              <span className="text-sm sm:text-base uppercase tracking-wider">
                OUR VALUES
              </span>
            </div>
            <hr className="border-gray-300" />
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* Title */}
              <h2 className="max-w-4xl text-3xl font-semibold sm:text-4xl md:text-5xl tracking-tight">
                Creativity. Authenticity. Innovation.
              </h2>

              {/* Description */}
              <p className="md:mt-4 mt-7 max-w-3xl text-base leading-relaxed sm:text-base md:text-lg">
                We believe in creating with honesty, designing with intent, and
                embracing innovation at every step. These values define how we
                work, collaborate, and deliver impact.
              </p>
              {/* Floating label */}

              <motion.span
                className="absolute top-14 md:top-10 right-1/12 rotate-12 bg-black text-white text-xs md:text-base px-3 py-1 rounded-full shadow-md"
                initial={{ opacity: 0, y: -30, scale: 0.8, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 12 }}
                transition={{
                  type: 'spring', // 👈 makes it bouncy
                  stiffness: 120, // controls the "spring" tightness
                  damping: 10, // lower = more bounce
                  duration: 0.6,
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                @Values
                <span
                  className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-0 h-0 
                border-l-[6px] border-l-transparent 
                border-r-[6px] border-r-transparent 
                border-t-[6px] border-t-black"
                ></span>
              </motion.span>
            </div>
            {/* Image block */}
            <div className="relative mt-5 rounded-2xl">
              <Image
                src={aboutUsImg}
                alt="Creative workspace"
                width={1200}
                height={800}
                className="h-auto w-full object-cover rounded-2xl"
                onError={() => setImgError(true)}
              />
            </div>
          </div>
        </section>
        <section className="px-4 md:py-8 py-6 lg:px-8 max-w-7xl mx-auto">
          {/* Heading */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
              <span className="text-sm sm:text-base uppercase tracking-wider">
                DSQR TEAM
              </span>
            </div>
            <hr className="border-gray-300" />
          </div>

          <h2 className="max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-5xl mt-6">
            The Faces Behind the{' '}
            <em className="font-instrument-italic font-extralight">Magic</em>
          </h2>
          <p className="mt-3 text-neutral-800 md:text-xl text-lg">
            Real people. Real passion
          </p>

          {/* Grid */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 lg:gap-5 max-w-7xl mx-auto"
          >
            {Array.from({ length: 50 }, (_, i) => {
              const filledArray = [
                0, 1, 3, 6, 9, 11, 12, 15, 19, 22, 25, 26, 28, 29, 31, 34, 36,
                38, 41, 42, 44, 46, 47, 48,
              ]
              const filled = filledArray.includes(i)

              // const imageList = [

              const imgSrc =
                filled && filledArray.indexOf(i) < imageList.length
                  ? imageList[filledArray.indexOf(i)]
                  : null

              // child animation
              const itemVariants = {
                hidden: { y: 30, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: 'easeOut' },
                },
              }

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={
                    filled
                      ? {
                          scale: 1.1,
                          y: -4,
                          transition: {
                            type: 'spring',
                            stiffness: 280,
                            damping: 20,
                          },
                        }
                      : {}
                  }
                  className={`relative aspect-square md:rounded-2xl rounded-lg overflow-hidden ${
                    filled ? 'bg-gray-100' : 'bg-gray-100'
                  }`}
                >
                  {filled && imgSrc && (
                    <motion.img
                      src={imgSrc}
                      alt={`Team member ${filledArray.indexOf(i) + 1}`}
                      className="h-full w-full object-cover"
                    />
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        <TestimonialSection />
        <div ref={stopShowingBannerRef}>
          <FAQ />
        </div>
        <CalendarSection />
        <ScrollingFooterBanner
          triggerRef={startShowingBannerRef}
          endRef={stopShowingBannerRef}
        />
      </motion.div>
    </div>
  )
}
