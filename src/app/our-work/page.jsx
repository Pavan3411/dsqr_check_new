'use client'
import { useState, useEffect } from 'react'
import CalendarSection from '@/components/common/calendar'
import FAQ from '@/components/common/FAQ'
import TrustedBySection from '@/components/common/Logo'
import FeaturedProjects from '@/components/common/ourWork2'
import TestimonialSection from '@/components/common/Testimonial'
import WhyOurWork from '@/components/common/work'
import { motion } from 'framer-motion'
import FreeTrialForm from '@/components/common/FreeTrialForm'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { useRef, Suspense } from 'react'
import ScrollingFooterBanner from '../../components/common/ScrollingFooterBanner'
import { Check } from 'lucide-react'
import { useAnimatedBackground } from '../../components/hooks/useAnimatedBackground'
import VideoHLS from '@/components/common/VideoHLS'
import Link from 'next/link'
import '../embla.css'
import EmblaCarousel from '@/components/common/EmblaCarousel'
export default function OurWork() {
  const startShowingBannerRef = useRef(null)
  const stopShowingBannerRef = useRef(null)
  const featuredRef = useRef(null)
  const containerRef = useRef(null) // Ref for the whole page container
  const blackSectionStartRef = useRef(null) // Ref for the start of the black section
  const blackSectionEndRef = useRef(null) // Ref for the end of the black section
  const { backgroundColor, textColor } = useAnimatedBackground({
    startRef: blackSectionStartRef,
    endRef: blackSectionEndRef,
  })
  // Example data (you can add as many as you like)
  const items = [
    { id: 1, before: '/images/1.png', after: '/images/1.png' },
    { id: 2, before: '/images/2.png', after: '/images/2.png' },
    { id: 3, before: '/images/3.png', after: '/images/3.png' },
    { id: 4, before: '/images/4.png', after: '/images/4.png' },
  ]
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handlePlan = () => {
    // If already on a page that has BookCall componentfhn
    if (document.getElementById('see-plan')) {
      document
        .getElementById('see-plan')
        ?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Otherwise navigate to /video and scroll after load
      router.push('/video?scroll=see-plan')
    }
  }
  // ...existing code...
  // Commented out static loopItems
  // const loopItems = [...];

  const [loopItems, setLoopItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAndFormat() {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(
          `${API_BASE_URL}/api/admin/media-items/category/test?subsection=Before/After Video`,
          { credentials: 'include' },
        )
        const data = await res.json()
        if (data && Array.isArray(data.data)) {
          // Group by pairId
          const grouped = {}
          for (const item of data.data) {
            if (!item.pairId) continue
            if (!grouped[item.pairId]) grouped[item.pairId] = {}
            if (item.role === 'before') {
              grouped[item.pairId].before = item.src
              grouped[item.pairId].beforePoster =
                item.poster || item.beforePoster || ''
            } else if (item.role === 'after') {
              grouped[item.pairId].after = item.src
              grouped[item.pairId].afterPoster =
                item.poster || item.afterPoster || ''
            }
            grouped[item.pairId].id = item.pairId
          }
          // Only include pairs with both before and after
          let pairs = Object.values(grouped).filter(
            (pair) => pair.before && pair.after,
          )
          // Duplicate the array
          pairs = [...pairs, ...pairs]
          setLoopItems(pairs)
        }
      } catch (err) {
        console.error('Failed to fetch loopItems:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAndFormat()
  }, [])

  return (
    <div ref={containerRef} className="relative bg-primary">
      {/* B. Add the fixed background element that will change color */}
      <motion.div
        style={{ backgroundColor }}
        className="fixed inset-0 w-full h-full z-0"
      />
      <motion.div
        style={{
          color: textColor,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10"
      >
        {' '}
        <section className="relative px-6 md:px-20 md:py-20 md:pb-8 py-12 pb-8 text-center overflow-hidden">
          {/* Content */}
          <div className="max-w-3xl mx-auto relative z-10">
            <div>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Your Brand’s Next Big{' '}
                <span className="block">
                  Moment{' '}
                  <em className="font-instrument-italic font-extralight">
                    {' '}
                    Starts Here{' '}
                  </em>
                </span>
              </motion.h1>
              {/* @Graphics Badge */}
              <motion.span
                className="absolute bg-black top-8 -right-[5%] lg:-right-[5%] text-white hidden md:block text-sm sm:text-base px-3 py-2 rounded-full rotate-12 shadow-lg font-medium"
                // style={{ top: '-2%', right: '-20%' }}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                @Videos
                <span className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black"></span>
              </motion.span>

              {/* @Unlimited Badge */}
              <motion.span
                className="absolute hidden md:block bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm sm:text-base px-3 py-2 rounded-full top-8 -left-[5%] lg:-left-[5%] -rotate-12 shadow-lg font-medium"
                // style={{ top: '-2%', left: '-20%' }}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                @Unlimited
                <span className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-orange-500"></span>
              </motion.span>
            </div>
            <motion.p
              className="mt-6 text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              From social media reels to high-concept brand campaigns, explore
              the variety, creativity, and speed that define every project we
              deliver.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center px-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="group inline-block">
                <button
                  className="relative w-52 sm:w-auto overflow-hidden bg-[var(--color-primary)] hover:bg-[#cfee04] text-black font-medium px-6 py-2 rounded-full shadow-md cursor-pointer text-sm sm:text-base"
                  onClick={() => setOpen(true)}
                >
                  <span className="relative z-10">Start Your Free Trial</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <FreeTrialForm open={open} setOpen={setOpen} />
              </div>
              <Link
                href="/pricing"
                className="border w-52 sm:w-auto px-5 sm:px-6 py-2  rounded-full font-semibold hover:text-white hover:bg-black transition text-sm sm:text-base"
              >
                See Plans
              </Link>
            </motion.div>

            {/* Features */}
            {/* visible only ≥ sm */}
            <motion.div
              className="mt-10 flex items-center justify-center gap-6 text-sm md:text-lg hidden sm:flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="flex items-center gap-2">✔ Start in minutes</p>
              <p className="flex items-center gap-2">
                ✔ Pause, cancel, or scale anytime.
              </p>
              <p className="flex items-center gap-2">✔ No contract</p>
            </motion.div>

            {/* visible only < sm */}
            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-4 font-medium text-sm block sm:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                'Start in minutes',
                'No contract',
                'Pause, cancel, or scale anytime.',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={16} className="text-black" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </section>
        <div ref={startShowingBannerRef}>
          <TrustedBySection />
        </div>
        <div ref={featuredRef}>
          <div ref={blackSectionStartRef} />
          <Suspense fallback={<div aria-hidden="true" />}>
            <FeaturedProjects scrollRef={featuredRef} />
          </Suspense>
        </div>
        <div ref={blackSectionEndRef}>
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
        <WhyOurWork />
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
