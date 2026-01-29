'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import FreeTrialForm from '@/components/common/FreeTrialForm'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GraphicSection() {
 const images = [
  "https://dsqrstudio.b-cdn.net/Graphics/graphic-header/9aed5621570c63dbe9a6255a386d146f82729055.png?width=800&quality=70&format=webp",
  "https://dsqrstudio.b-cdn.net/Graphics/graphic-header/943eb6689c3acbb92c2323f31f8d7fc470658000.png?width=800&quality=70&format=webp",
  "https://dsqrstudio.b-cdn.net/Graphics/graphic-header/165e621e3efc9521dccceebf7abb7957b0a291f2.png?width=800&quality=70&format=webp",
  "https://dsqrstudio.b-cdn.net/Graphics/graphic-header/c9516044ba93b195bed30437a462460761dfe6a3.png?width=800&quality=70&format=webp",
  "https://dsqrstudio.b-cdn.net/Graphics/graphic-header/2733ba736a8070ca0289d8b3692e8d240fa05d98.png?width=800&quality=70&format=webp",
  "https://dsqrstudio.b-cdn.net/Graphics/graphic-header/eb1ff97fa09df547fab2f6db9e247168ce8e4296.png?width=800&quality=70&format=webp",
  "https://dsqrstudio.b-cdn.net/Graphics/graphic-header/c73a133bfef8e852a189178b54e2d3417619da91.png?width=800&quality=70&format=webp",
];

  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handlePlan = () => {
    // If already on a page that has BookCall component
    if (document.getElementById('see-price')) {
      document
        .getElementById('see-price')
        ?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Otherwise navigate to /video and scroll after load
      router.push('/graphics?scroll=see-price')
    }
  }

  return (
    <section className="px-6 md:px-12 lg:px-20 md:py-16 py-8 max-w-7xl mx-auto ">
      <div className="relative">
        {/* Headline */}
        <div className="relative text-center z-10">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold tracking-tight text-gray-900 relative z-10 mt-4 md:mt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Unlimited{' '}
            <span className="font-instrument-italic font-light">
              Graphic Design
            </span>{' '}
            <br /> At Flat Monthly Fees.
          </motion.h1>

          {/* @Graphics Badge */}
          <motion.span
            className="
    absolute bg-black text-white text-xs sm:text-sm xl:text-lg px-3 py-2 rounded-full 
    rotate-3 md:rotate-6 shadow-lg font-medium
    top-10 right-2 sm:right-[0%] xl:right-[10%] hidden md:block
  "
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            @Graphics
            <span className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black"></span>
          </motion.span>

          {/* @Unlimited Badge */}
          <motion.span
            className="
    absolute bg-gradient-to-r from-orange-500 to-orange-600 text-white 
    text-xs sm:text-sm xl:text-lg px-3 py-2 rounded-full shadow-lg font-medium
    rotate-3 md:-rotate-6
    top-10 left-4 md:left-[0%] xl:left-[10%] hidden md:block
  "
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            @Unlimited
            <span className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-orange-500"></span>
          </motion.span>

          <div className="hidden md:block">
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center px-4 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
             Supercharge your brand visuals without limits. No contracts, no delays, just pure design power.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="group inline-block">
                <button
                  className="relative overflow-hidden bg-[var(--color-primary)] hover:bg-[#cfee04] text-black font-medium px-6 py-2 rounded-full shadow-md cursor-pointer text-sm sm:text-base"
                  onClick={() => setOpen(true)}
                >
                  <span className="relative z-10">Start Your Free Trial</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <FreeTrialForm open={open} setOpen={setOpen} />
              </div>
              <button
                onClick={() => handlePlan()}
                className="border text-black px-5 sm:px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition text-sm sm:text-base cursor-pointer"
              >
                See Plans
              </button>
            </motion.div>

            {/* Features */}
            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 font-medium text-sm sm:text-base md:text-lg text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                'Start in minutes',
                'Pause, cancel, or scale anytime.',
                'No contract',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={16} className="text-black" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ✅ Gallery Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:mt-12 mt-8 flex flex-col gap-4"
        >
          {/* ✅ BENTO GRID with 5 cols on desktop */}
          <div
            className="
          grid gap-2 md:gap-4
          grid-cols-3 lg:grid-cols-5
          auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[270px]
        "
          >
            {/* Row 1 order: 1, 2, 4, 3 */}
            <div className="relative rounded-2xl overflow-hidden col-span-1">
              <Image
                src={images[0]}
                alt="g1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden col-span-2">
              <Image
                src={images[1]}
                alt="g2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                unoptimized
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden col-span-1">
              <Image
                src={images[2]}
                alt="g4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden col-span-1">
              <Image
                src={images[3]}
                alt="g3"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>

            {/* Row 2 order: 5, 6, 7 */}
            <div className="relative rounded-2xl overflow-hidden col-span-1 lg:col-span-2">
              <Image
                src={images[4]}
                alt="g5"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden col-span-1">
              <Image
                src={images[5]}
                alt="g6"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden col-span-2">
              <Image
                src={images[6]}
                alt="g7"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                unoptimized
              />
            </div>
          </div>
        </motion.div>
        <div className="block md:hidden mt-8 text-center">
          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center px-4 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {' '}
           Supercharge your brand visuals without limits. No contracts, no delays, just pure design power.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
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
            <button
              onClick={() => handlePlan()}
              className="border w-52 sm:w-auto px-5 sm:px-6 py-2 rounded-full font-semibold hover:text-white transition text-sm sm:text-base cursor-pointer"
            >
              See Plans
            </button>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 font-medium text-sm sm:text-base"
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
                <Check size={16} className="" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
