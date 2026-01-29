'use client'
import { useState } from 'react'
import CalendarSection from '@/components/common/calendar'
import Design from '@/components/common/design'
import FAQ from '@/components/common/FAQ'
import TrustedBySection from '@/components/common/Logo'
import CreativeSquadMarquee from '@/components/common/squad'
import ComparisonTable from '@/components/common/table'
import TestimonialSection from '@/components/common/Testimonial'
import WhyOurWork from '@/components/common/work'
import { Check, Table } from 'lucide-react'
import FreeTrialForm from '@/components/common/FreeTrialForm'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import ScrollingFooterBanner from '../../components/common/ScrollingFooterBanner'
import Link from 'next/link'

export default function Why_Us() {
  const startShowingBannerRef = useRef(null)
  const stopShowingBannerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handlePlan = () => {
    // If already on a page that has BookCall component
    if (document.getElementById('see-plan')) {
      document
        .getElementById('see-plan')
        ?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Otherwise navigate to /video and scroll after load
      router.push('/video?scroll=see-plan')
    }
  }

  return (
    <div className='font-figtree'>
      <section className="relative bg-primary md:py-16 md:pb-2 py-10 pb-6 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative z-10">
            {/* Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:5xl lg:text-6xl font-semibold tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Your Creative{' '}
              <span className="font-instrument-italic font-extralight">
                Partner
              </span>
              , <br />
              Not Just <span className="ml-2">Service</span>
            </motion.h1>
            {/* Floating Tag - Left */}
            <motion.span
              className="absolute top-10 -left-[0%] lg:-left-[5%] -rotate-12 hidden md:block bg-[#F27247] text-white text-sm md:text-lg px-3 py-1 rounded-full shadow-md"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              @brand
              <span
                className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-0 h-0 
            border-l-[6px] border-l-transparent 
            border-r-[6px] border-r-transparent 
            border-t-[6px] border-t-[#F27247]"
              ></span>
            </motion.span>

            {/* Floating Tag - Right */}
            <motion.span
              className="absolute top-10 -right-[0%] lg:-right-[5%] rotate-12 hidden md:block bg-black text-white text-sm md:text-lg px-3 py-1 rounded-full shadow-md"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 12 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              @Videos
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
            className="text-gray-600 mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            From social media reels to high-concept brand campaigns, explore the
            variety, creativity, and speed that define every project we deliver.
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
              className="border w-52 sm:w-auto text-black px-5 sm:px-6 py-2 rounded-full font-medium hover:bg-black hover:text-white transition text-sm sm:text-base"
            >
              See Plans
            </Link>
          </motion.div>

          {/* Key Points */}
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 font-medium text-sm sm:text-base text-gray-800"
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
      <WhyOurWork />
      <Design />
      <ComparisonTable />
      <CreativeSquadMarquee />
      <TestimonialSection />
      <div ref={stopShowingBannerRef}>
        <FAQ />
      </div>
      <CalendarSection />
      <ScrollingFooterBanner
        triggerRef={startShowingBannerRef}
        endRef={stopShowingBannerRef}
      />
    </div>
  )
}
