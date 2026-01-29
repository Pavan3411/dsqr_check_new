'use client'

import FAQ from '@/components/common/FAQ'
import Image from 'next/image'
import Link from 'next/link'
import FallingIcons from '@/components/common/FallingIcons'
import { useState, useEffect } from 'react'
import PromotionModal from '@/components/common/PromotionModal' // 👈 1. Import the modal
import { motion } from 'framer-motion'
import FreeTrialForm from '@/components/common/FreeTrialForm'

const iconsData = [
  {
    id: 1,
    component: <img src="/images/w1.png" alt="w1" className="w-20 h-20" />,
  },
  {
    id: 2,
    component: <img src="/images/w2.png" alt="w2" className="w-20 h-20" />,
  },
  {
    id: 3,
    component: <img src="/images/w3.png" alt="w3" className="w-20 h-20" />,
  },
  {
    id: 4,
    component: <img src="/images/w4.png" alt="w4" className="w-20 h-20" />,
  },
  {
    id: 5,
    component: <img src="/images/w5.png" alt="w5" className="w-20 h-20" />,
  },
  {
    id: 6,
    component: <img src="/images/w6.png" alt="w6" className="w-20 h-20" />,
  },
  {
    id: 7,
    component: <img src="/images/w7.png" alt="w7" className="w-20 h-20" />,
  },
  {
    id: 8,
    component: <img src="/images/w8.png" alt="w8" className="w-20 h-20" />,
  },
]
export const faqData = [
  {
    id: 1,
    question: 'Where do I sign up?',
    answer: `Sign up for our affiliate program at: dsqrstudio.com`,
  },
  {
    id: 2,
    question: 'How does the affiliate program work?',
    answer: `Share your unique referral link and earn a 10% recurring commission for every paying client you refer.`,
  },
  {
    id: 3,
    question: 'Do my referrals get a benefit too?',
    answer: `Yes your referrals get 10% off their first month by signing up with your referral link and applying the coupon code at checkout.`,
  },
  {
    id: 4,
    question: 'Is there a limit to how many people I can refer?',
    answer: `No there's no limit. The more you refer, the more you earn.`,
  },
  {
    id: 5,
    question: 'How do I get paid?',
    answer: `Commissions are paid out monthly through your PayPal account.`,
  },
]

const promoImages = [
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/DSQR%20Linkedin%20Logo.png?width=800&quality=70&format=webp',
    alt: 'DSQR LinkedIn Logo',
    filename: 'DSQR_Promo_Logo_LinkedIn.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/Logo%20Final.png?width=800&quality=70&format=webp',
    alt: 'DSQR Final Logo',
    filename: 'DSQR_Promo_Logo_Final.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/LOGO-BLACK%20(1).png?width=800&quality=70&format=webp',
    alt: 'DSQR Black Logo',
    filename: 'DSQR_Promo_Logo_Black.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/LOGO-GLOW.png?width=800&quality=70&format=webp',
    alt: 'DSQR Glow Logo',
    filename: 'DSQR_Promo_Logo_Glow.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/2%20(2).png?width=800&quality=70&format=webp',
    alt: 'Promo material 1',
    filename: 'DSQR_Promo_1.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/3%20(2).png?width=800&quality=70&format=webp',
    alt: 'Promo material 2',
    filename: 'DSQR_Promo_2.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/6%20(1).png?width=800&quality=70&format=webp',
    alt: 'Promo material 3',
    filename: 'DSQR_Promo_3.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/7.png?width=800&quality=70&format=webp',
    alt: 'Promo material 4',
    filename: 'DSQR_Promo_4.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/imp%20(2).png?width=800&quality=70&format=webp',
    alt: 'Promo material 5',
    filename: 'DSQR_Promo_5.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/imp%20(3).png?width=800&quality=70&format=webp',
    alt: 'Promo material 6',
    filename: 'DSQR_Promo_6.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/imp%20(4).png?width=800&quality=70&format=webp',
    alt: 'Promo material 7',
    filename: 'DSQR_Promo_7.png',
  },
  {
    src: 'https://dsqrstudio.b-cdn.net/Promotional%20Content/imp.png?width=800&quality=70&format=webp',
    alt: 'Promo material 8',
    filename: 'DSQR_Promo_8.png',
  },
]

export default function Affiliates() {
  const [boundWidth, setBoundWidth] = useState(300)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // function to recalc on resize
    const handleResize = () => {
      if (window.innerWidth < 640) setBoundWidth(350) // mobile
      else if (window.innerWidth < 1024) setBoundWidth(350) // tablet
      else setBoundWidth(500) // desktop
    }

    handleResize() // run once
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <main className="">
      {/* Section 1 - Hero */}
      <section className="relative bg-primary md:min-h-[40vh] min-h-[34vh] md:py-12 md:pb-12 pt-5 px-6 lg:px-16 mt-10 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative z-10">
            {/* Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-12 md:mb-0 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span> Earn 10% Recurring </span>{' '}
              <span> Commission with Every</span>
              <span className="">
                <span className="font-instrument-italic font-extralight mr-2">
                  {' '}
                  Creative Connection{' '}
                </span>{' '}
                <span className="">“No Caps”</span>
              </span>
            </motion.h1>
            {/* Floating Tag - Left */}
            <motion.span
              className="absolute -top-6 md:top-10 -left-[0%] -rotate-12  bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs md:text-base px-3 py-2 rounded-full shadow-md hidden md:block"
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
              className="absolute -top-6 md:top-10 -right-[0%] rotate-12 bg-black text-white text-xs md:text-base px-3 py-2 rounded-full shadow-md hidden md:block"
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
            className="text-gray-600 md:mt-7 mt-2 text-base sm:text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            At DSQR Studio, we blend creativity, strategy, and technology to
            craft videos, graphics, and AI-driven content that elevate brands
            and engage audiences across every platform.
          </motion.p>
          <motion.div
            className="group mt-8 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              className="relative overflow-hidden bg-[var(--color-primary)] hover:bg-[#cfee04] text-black font-medium px-6 py-2 rounded-full shadow-md cursor-pointer text-sm sm:text-base"
              onClick={() => setOpen(true)}
            >
              <span className="relative z-10">Start Earning</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
            </button>
            <FreeTrialForm open={open} setOpen={setOpen} affiliate />
          </motion.div>
        </div>
      </section>

      {/* Section 2 - Steps Cards */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 md:py-12 py-6 md:pb-6">
        {/* Small Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
            <span className="text-sm sm:text-base uppercase tracking-wider">
              How it works
            </span>
          </div>
          <hr className="border-gray-300" />
        </div>
        <h2 className="max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-5xl md:mt-10 mt-5">
          Simple Steps,{' '}
          <em className="font-instrument-italic font-extralight ml-2">
            Unlimited Potential
          </em>
        </h2>
        <p className="mt-3 text-neutral-700 md:text-xl text-lg">
          Apply, share your link, and earn it’s that easy.
        </p>

        <div className="w-full mt-12">
          <div className="h-full flex flex-col md:flex-row gap-10 md:justify-around items-center md:items-stretch w-full">
            {/* Card 1 */}
            <div className="bg-[#F4F4F4] rounded-xl p-6 shadow-xl w-full md:max-w-xs flex-1 flex flex-col">
              <div className="text-sm text-gray-500 mb-3 rounded-full px-2 py-1 bg-primary inline-flex items-center gap-2 max-w-max">
                <img
                  src="/images/star.png"
                  alt="star"
                  className="w-4 h-4 object-contain"
                />
                <span>Step 1</span>
              </div>

              {/* content container — this grows so all cards are equal height */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">
                  Apply in seconds{' '}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Submit your affiliate application and get unique referral link once qualified.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F4F4F4] rounded-xl p-6 shadow-xl w-full md:max-w-xs flex-1 flex flex-col">
              <div className="text-sm text-gray-500 mb-3 rounded-full px-2 py-1 bg-primary inline-flex items-center gap-2 max-w-max">
                <img
                  src="/images/star.png"
                  alt="star"
                  className="w-4 h-4 object-contain"
                />
                <span>Step 2</span>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">
                  Share with Your Audience
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Promote DSQR Studio through your content website, email, or
                  social media.
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-[#007DCB] flex items-center gap-2 text-xs"
                  >
                    Promotion Material
                    <img
                      src="/images/check.png"
                      alt="check"
                      className="w-3 h-3 object-contain"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F4F4F4] rounded-xl p-6 shadow-xl w-full md:max-w-xs flex-1 flex flex-col">
              <div className="text-sm text-gray-500 mb-3 rounded-full px-2 py-1 bg-primary inline-flex items-center gap-2 max-w-max">
                <img
                  src="/images/star.png"
                  alt="star"
                  className="w-4 h-4 object-contain"
                />
                <span>Step 3</span>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">
                  Earn Recurring Rewards
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Get paid a commission each time your referral subscribes no
                  caps, no complexity.
                </p>
              </div>
            </div>
            <PromotionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              images={promoImages}
            />
          </div>
        </div>
      </section>
      <section className="px-4 md:py-16 py-8 lg:px-8 max-w-7xl mx-auto">
        {/* Small Heading */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
            <span className="text-sm sm:text-base uppercase tracking-wider">
              Why Promote DSQR
            </span>
          </div>
          <hr className="border-gray-300" />
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="max-w-5xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl md:mt-10 mt-5">
            Designed for Earners{' '}
            <em className="font-instrument-italic font-extralight md:ml-2">
              Like You
            </em>
          </h2>
          <p className="mt-3 text-neutral-700 md:text-xl text-lg max-w-3xl">
            From creators to agencies, our subscription model means higher
            potential lifetime commissions in just a few seamless steps.
          </p>

          {/* Image block */}
          <div className="relative md:mt-12 mt-16 rounded-2xl">
            <motion.span
              className="absolute -top-12 md:-top-16 right-1/12 rotate-6 bg-black text-white text-xs md:text-base px-3 py-1 rounded-full shadow-md"
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
            <Image
              src="https://dsqrstudio.b-cdn.net/Extra's/affileats.png"
              alt="Creative workspace"
              width={800}
              height={400}
              className="w-full h-auto rounded-2xl object-contain"
              sizes="(max-width:640px) 90vw, (max-width:1024px) 70vw, 800px"
            />
          </div>
        </div>
      </section>
      {/* Section 3 - Key Benefits */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-8">
        {/* Small Heading */}
        <div className="md:mb-8 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
            <span className="text-sm sm:text-base uppercase tracking-wider">
              Key Benefits
            </span>
          </div>
          <hr className="border-gray-300" />
        </div>

        <h2 className="max-w-5xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl md:mt-10 mt-5">
          Your Earnings,{' '}
          <em className="font-instrument-italic font-extralight">Elevated</em>
        </h2>
        <p className="mt-3 text-neutral-700 md:text-xl text-lg max-w-3xl">
          Earn 10% recurring, track with ease, and scale without limits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 text-2xl px-4">
          <div className="bg-[#F4F4F4] rounded-xl p-4 shadow-xl text-center">
            <h4 className="font-semibold">Flat 10% Recurring Commission</h4>
            <p className="mt-2 text-gray-500 text-base">
              Keep earning every month as long as your referrals stay subscribed
              to DSQR Studio.
            </p>
          </div>
          <div className="bg-[#F4F4F4] rounded-xl p-4 shadow-xl text-center">
            <h4 className="font-semibold">60-Day Cookie Lifespan</h4>
            <p className="mt-2 text-gray-500 text-base">
              Receive commission for sign-ups made as long as 60 days.
            </p>
          </div>
          <div className="bg-[#F4F4F4] rounded-xl p-4 shadow-xl text-center">
            <h4 className="font-semibold">Special Coupons</h4>
            <p className="mt-2 text-gray-500 text-base">
              You get a special coupon to provide 10% off to people you refer
            </p>
          </div>
          <div className="bg-[#F4F4F4] rounded-xl p-4 shadow-xl text-center">
            <h4 className="font-semibold">No Caps, No Limits</h4>
            <p className="mt-2 text-gray-500 text-base">
              Scale your earnings as your audience grows.
            </p>
          </div>
        </div>
      </section>

      <FAQ faqData={faqData} onOpenFreeTrial={() => setOpen(true)} />
      {/* Section 4 - CTA Banner */}
      <section
        className="relative bg-black overflow-hidden md:h-[420px] h-[540px]"
        /* You can change md:h-[640px] / h-[520px] to any height you prefer */
      >
        {/* FallingIcons is absolutely positioned and will be clipped by overflow-hidden */}
        <FallingIcons
          icons={iconsData}
          maxBodies={8}
          dropDelay={140}
          boundWidth={boundWidth}
        />

        <div className="text-white max-w-7xl mx-auto md:p-10 p-4 flex flex-col items-center text-center h-full">
          <h2 className="max-w-5xl text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
            Join DSQR Creators{' '}
            <em className="font-instrument-italic font-extralight">Today</em>
          </h2>
          <p className="mt-3 text-neutral-300 md:text-xl text-lg max-w-3xl">
            Ready to monetize your creativity? Fill out the quick form and start
            earning.
          </p>
          <div className="mt-7">
            <Link
              href="/pricing"
              className="inline-block bg-[#cfff00] text-black px-6 py-3 rounded-full font-medium"
            >
              See Plans &amp; Pricing
            </Link>
          </div>
        </div>
      </section>
      <FreeTrialForm open={open} setOpen={setOpen} affiliate />
    </main>
  )
}
