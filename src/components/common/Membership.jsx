'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCurrency } from '@/components/hooks/useCurrency'
import { PRICES } from '@/components/constants/pricing'
import Link from 'next/link'
export default function Membership() {
  const [activeIdx, setActiveIdx] = useState(null)

  const curHook = useCurrency() // call hook once
  const currency = (curHook && curHook.toUpperCase()) || 'USD'

  // helper to get base price (tier 1) for a plan
  const getBasePrice = (plan) => {
    const p = PRICES?.[plan]?.[1]?.base
    if (!p) return '-'
    const amount = p[currency] || p.USD
return { amount, currency }
  }

  const cards = [
    {
      title: 'Video Editing',
      description:
        'Ideal for creators with daily needs. Hire a full-time editor team for a fraction of the cost.',
      price: getBasePrice('Video'),

      per: 'Per month',
      color: 'bg-primary',
      rotate: -5,
      offsetY: 10,
      leftPercent: 4,
      zIndex: 10,
      href: '/video',
    },
    {
      title: 'AI Lab',
      description:
        'Built for teams with daily needs. Access full-scale AI power for a fraction of the cost.',
      price: getBasePrice('AI'),

      per: 'Per month',
      color: 'bg-[var(--color-primary)]',
      rotate: -2,
      offsetY: 0,
      leftPercent: 25,
      zIndex: 10,
      href: '/ai-lab',
    },
    {
      title: 'Graphic Design',
      description:
        'Perfect for brands with daily needs. Get a full-time designer team for a fraction of the cost.',
      price: getBasePrice('Graphic'),

      per: 'Per month',
      color: 'bg-primary',
      rotate: 3,
      offsetY: 15,
      leftPercent: 50,
      zIndex: 30,
      href: '/graphics',
    },
  ]

  return (
    <section className="py-4 bg-primary px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
            MEMBERSHIP
          </span>
        </div>
        <hr className="text-gray-900 border-gray-300" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:mt-8 mt-2">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <h2 className="md:text-5xl text-3xl mb-0 max-w-md font-semibold tracking-tight">
            Unlimited
            <span className="font-instrument-italic font-light">
              {' '}
              Creativity{' '}
            </span>
            <span className="">One Scalable Subscription</span>
          </h2>
          <p className="text-gray-700 mb-4 max-w-md text-base sm:text-lg">
            One subscription. Unlimited creatives. Zero contracts. Just fast,
            expert content your way.
          </p>
        </div>

        {/* Right Cards */}
        <div className="relative flex justify-center md:justify-start h-[300px] w-full ">
          {cards.map((card, idx) => {
            const isActive = activeIdx === idx

            return (
              <Link href={card.href} passHref>
                <motion.div
                  key={idx}
                  style={{
                    left: `${card.leftPercent}%`,
                    zIndex: isActive ? 60 : card.zIndex,
                  }}
                  initial={{ y: card.offsetY, rotate: card.rotate }}
                  animate={{
                    y: isActive ? card.offsetY - 16 : card.offsetY,
                    rotate: card.rotate,
                  }}
                  whileHover={{ scale: 1.04, zIndex: 70 }} // 👈 bring hovered card to front
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveIdx(isActive ? null : idx)}
                  className={`${card.color} absolute rounded-xl p-4 md:p-6 w-44 sm:w-54 shadow-lg hover:shadow-2xl border-gray-200 border-[1px] cursor-pointer`}
                >
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm sm:mb-12 mb-16">
                    {card.description}
                  </p>
                 {/* <div className="flex flex-col leading-tight">
                  <p className="text-gray-500 text-sm mb-[-2px]">starting from</p>
  <div className="flex items-baseline gap-1">
    <span className="text-2xl font-bold">{card.price?.currency}</span>
    <p className="text-2xl font-bold">{card.price?.amount}</p>
     <span className='flex flex-col items-start justify-center ml-1'>
  <p className="text-gray-500 text-xs">Per</p>
  <p className="text-gray-500 text-xs">month</p></span>
  </div>
</div> */}
                  <p className="text-gray-800 sm:text-sm text-xs">starting from</p>
<div className="flex items-center sm:gap-2 gap-1">
            <span className="sm:text-3xl text-2xl font-bold text-black">{card.price?.currency}</span>
            <p className="sm:text-3xl text-2xl font-bold text-black">
              {card.price?.amount}
            </p>
            <p className="sm:text-xs text-[10px] text-black/90 flex leading-2 ">
              {' '}
              Per <br />
              month
            </p>
          </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
