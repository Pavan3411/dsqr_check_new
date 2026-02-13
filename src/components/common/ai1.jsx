'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import FreeTrialForm from '@/components/common/FreeTrialForm'
import { Button } from '@/components/ui/button'
import Marquee from 'react-fast-marquee'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

// export default function AI1() {
//   const [open, setOpen] = useState(false)
//   const [paused, setPaused] = useState(false)
//   const router = useRouter()
// const marqueeImages = [
//   {
//     src: "https://dsqrstudio.b-cdn.net/Ai-lab/krix.ai_10904_a_fashion_beautifull_girl_model_wearing_silver__94be5493-65a1-44c3-8cf5-d413e15f937a_1.png?width=800&quality=70&format=webp",
//     alt: "Fashion model wearing silver",
//   },
//   {
//     src: "https://dsqrstudio.b-cdn.net/Ai-lab/krix.ai_10904_a_white_balaclava_ski_mask_adorned_with_colorful__7771e62a-4a55-498d-9a20-2ca45c0e20f1.png?width=800&quality=70&format=webp",
//     alt: "White balaclava ski mask with colors",
//   },
//   {
//     src: "https://dsqrstudio.b-cdn.net/Ai-lab/krix.ai_10904_httpss.mj.runbafG49D2LWM_A_joyful_8-year-old_Kore_41e05f27-278f-4c95-9dd7-121f7b20ca47.png?width=800&quality=70&format=webp",
//     alt: "Joyful Korean child",
//   },
//   {
//     src: "https://dsqrstudio.b-cdn.net/Ai-lab/krix.ai_10904_httpss.mj.runBtNPhh_xojQ_A_humorous_and_hyper-det_c57c3605-7e6f-4727-9a00-67f97b3cb65b.png?width=800&quality=70&format=webp",
//     alt: "Humorous hyper-detailed art",
//   },
//   {
//     src: "https://dsqrstudio.b-cdn.net/Ai-lab/krix.ai_10904_httpss.mj.runKcgTybghK44_A_whimsical_illustration_965c2929-f739-4584-bfc2-fb98a50a1a61.png?width=800&quality=70&format=webp",
//     alt: "Whimsical illustration",
//   },
//   {
//     src: "https://dsqrstudio.b-cdn.net/Ai-lab/krix.ai_10904_httpss.mj.runpgBvQUzu8mA_women_brown_model_as_a_f_e32ef085-f308-4c9e-ad5b-ebb9a432a151.png?width=800&quality=70&format=webp",
//     alt: "Brown model fashion",
//   },
//   {
//     src: "https://dsqrstudio.b-cdn.net/Ai-lab/krix.ai_10904_httpss.mj.runrvGw6wySRrc_fantasy_realistic_art_A__55b6db8a-108c-4632-b274-ae948d4ac418.png?width=800&quality=70&format=webp",
//     alt: "Fantasy realistic art",
//   },
//   {
//     src: "https://dsqrstudio.b-cdn.net/Ai-lab/krix.ai_10904_lookbook_fashion_photography_of_a_woman_in_a_chic_31b13e94-9135-43da-b787-570ae7917743.png?width=800&quality=70&format=webp",
//     alt: "Fashion lookbook",
//   },
//   {
//     src: "https://dsqrstudio.b-cdn.net/Ai-lab/krix.ai_10904_tatting_lace_on_a_nordic_model_writting_in_a_book_bf62191a-5ef3-49b3-9910-86868af97049.png?width=800&quality=70&format=webp",
//     alt: "Nordic model writing in a book",
//   },
//   {
//     src: "https://dsqrstudio.b-cdn.net/Ai-lab/krix.ai_10904_two_red-haired_women_standing_in_a_pink_and_purpl_13212f0c-cdf3-4565-8747-65b91e132e0a.png?width=800&quality=70&format=webp",
//     alt: "Two red-haired women in colorful scene",
//   },
// ];



const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function AI1() {
  const [open, setOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const router = useRouter()
  const [marqueeImages, setMarqueeImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Fetching marquee images from API...')
    fetch(
      `${API_BASE_URL}/api/admin/media-items/category/ai_lab?subsection=primary_graphics`,
      { credentials: 'include' }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('API response:', data)
        if (data.success && Array.isArray(data.data)) {
          setMarqueeImages(data.data)
          console.log('Fetched marquee images:', data.data)
        } else {
          setMarqueeImages([])
        }
      })
      .catch(() => setMarqueeImages([]))
      .finally(() => setLoading(false))
  }, [])


  const handlePlan = () => {
    // If already on a page that has BookCall component
    if (document.getElementById('see-pricing')) {
      document
        .getElementById('see-pricing')
        ?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Otherwise navigate to /video and scroll after load
      router.push('/ai-lab?scroll=see-pricing')
    }
  }

  return (
    <section className="px-6 md:px-12 lg:px-20 md:py-16 md:pb-8 py-8 relative overflow-hidden">
      {/* Title */}
      <div className="relative z-10">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold tracking-tight text-gray-900 relative z-10 mt-4 md:mt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Unlimited{' '}
          <em className="font-instrument-italic font-extralight">AI Content</em>
          <br /> At Flat Monthly Fees.
        </motion.h1>

        {/* @Aipower Badge */}
        <motion.span
          className="
    absolute bg-black text-white text-xs sm:text-sm xl:text-lg px-3 py-2 
    rounded-full md:rotate-6 rotate-3 shadow-lg font-medium
    top-20 sm:top-6 md:top-10 right-2 sm:right-[0%] xl:right-[20%] hidden md:block
  "
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 12 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          @Aipower
          <span
            className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 
    border-l-[6px] border-l-transparent 
    border-r-[6px] border-r-transparent 
    border-t-[8px] border-t-black"
          ></span>
        </motion.span>

        {/* @Unlimited Badge */}
        <motion.span
          className="
    absolute bg-gradient-to-r from-orange-500 to-orange-600 text-white 
   text-xs sm:text-sm xl:text-lg px-3 py-2 rounded-full shadow-lg font-medium
    md:-rotate-6 rotate-3
    top-20 sm:top-6 md:top-10 left-2 sm:left-6 md:left-[0%] xl:left-[20%] hidden md:block
  "
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          @Unlimited
          <span
            className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 
      border-l-[6px] border-l-transparent 
      border-r-[6px] border-r-transparent 
      border-t-[8px] border-t-orange-500"
          ></span>
        </motion.span>
      </div>
      <div className="hidden md:block">
        {/* Subtitle */}
        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center px-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Create smarter, faster, and limitless with AI-powered content that scales with your brand.
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
            className="border text-black px-5 sm:px-6 py-2  rounded-full font-semibold hover:bg-black hover:text-white transition text-sm sm:text-base cursor-pointer"
          >
            See Plans
          </button>
        </motion.div>

        {/* Checkmarks */}
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

      {/* Infinite Marquee */}
      <motion.div
        className="mt-8 md:mt-12 relative z-10 w-screen -translate-x-1/2 left-1/2"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Marquee
          speed={50}
          direction="left"
          gradient={false}
          className="overflow-hidden"
        >
          <div className="inline-flex items-center gap-5">
            {' '}
            {/* no extra gap */}
            {marqueeImages.map((img, idx) => (
              <div key={`${img.src || img._id || idx}`} className={`flex-shrink-0 ${idx === marqueeImages.length - 1 ? 'mr-5' : ''}`}>
                <img
                  src={img.src}
                  alt={img.alt || 'AI Graphic'}
                  className="h-48 sm:h-60 md:h-96 w-auto object-cover rounded-2xl transition-shadow duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </motion.div>

      <div className="block md:hidden mt-8 text-center">
        {/* Subtitle */}
        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center px-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Create smarter, faster, and limitless with AI-powered content that scales with your brand.
        </motion.p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
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
        </div>

        {/* Checkmarks */}
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
    </section>
  )
}
