'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EmblaTestimonials from '@/components/common/EmblaTestimonials'

// ✅ Constant data (images reused 1..5 in a loop)
const testimonials = [
  {
    id: 1,
    name: 'Jack',
    company: 'Ex-CEO, AllThingsAl',
    image: '/images/Jack.jpeg',
    text: "We've worked with 4 other editing agencies before and [[DSQR Studio and Div's team are THE BEST.]] They were easy to start with, easy to scale up video with, and very diligent and concise when it comes to editing.",
    highlights: ["DSQR Studio and Div's team are THE BEST."],
    stats: [
      { value: '100%', label: 'Editing time saved' },
      { value: '$3.7k+', label: 'Cost Saving' },
      { value: '20+', label: 'Videos Delivered' },
    ],
  },
  {
    id: 2,
    name: 'KRIS',
    company: 'The Posh Lofts',
    image: '/images/kris.png',
    text: 'As a creative marketing agency, we cater to a diverse range of creative needs for our clients, with video editing being a critical component of our offerings. Working with DSQR Studio has been an incredible experience that has significantly [[elevated the quality of our content, helping us stand out in a competitive market]]! Their expertise has allowed us to focus on other aspects of our projects, knowing that the video editing is in capable hands.\n\nTheir editing skills have truly transformed our projects. Their attention to detail, creativity, and technical proficiency have brought our ideas to life in ways we could only imagine! The final products are consistently high-quality, engaging, and perfectly aligned with our vision. This level of excellence has not only satisfied our clients but also enhanced our reputation in the industry.\n\nThe best part of working with DSQR Studio is work ethic. They are incredibly patient, hard-working, and, most importantly, respectful and kind. Their dedication to understanding our needs and their unwavering commitment to delivering outstanding results make them an invaluable partner! We genuinely value everything they have done for us so far and eagerly anticipate our ongoing collaboration.\n\nAll in all, DSQR Studio has been a game-changer for us. Their video editing services are unparalleled, and their team is a pleasure to work with! We highly recommend DSQR Studio to anyone seeking to elevate their content and achieve remarkable results!',
    highlights: ["elevated the quality of our content, helping us stand out in a competitive market"],
    stats: [
      { value: '4k+hrs', label: 'Editing time saved' },
      { value: '$80k+', label: 'Cost Saving' },
      { value: '500+', label: 'Videos Delivered' },
    ],
  },
  {
    id: 3,
    name: 'Joshua J',
    company: 'Home Health',
    image: '/images/Joshua.jpg',
    text: "Fantastic service. Deliver on what they say they will.[[First video knocked it out]]. I've had other companies and the review is always a pain.\n\nGREAT JOB",
    highlights: ["First video knocked it out"],
    stats: [
      { value: '80+hrs', label: 'Editing time saved' },
      { value: '$1K+', label: 'Cost Saving' },
      { value: '20+', label: 'Videos Delivered' },
    ],
  },
  {
    id: 4,
    name: 'Terry Manzi',
    company: 'Three Entertainment Group',
    image: '/images/Terry.png',
    text: '[[Fantastic service]]. Deliver on what they say they will.',
    highlights: ['Fantastic service'],
    stats: [
      { value: '150+hrs', label: 'Editing time saved' },
      { value: '$2.7k+', label: 'Cost Saving' },
      { value: '25+', label: 'Videos Delivered' },
    ],
  },
  {
    id: 5,
    name: 'JORGE',
    company: 'Offbeat podcast',
    image: '/images/Jorge.png',
    text: 'DSQR Studio is an exceptional video editing company. [[Their attention to detail, creativity, and professionalism set them apart]]. They consistently deliver stunning results that exceed expectations. I highly recommend DSQR Studio for anyone seeking top-notch video editing services. They have truly allowed me to focus more on my podcast and creating content.',
    highlights: ['Their attention to detail, creativity, and professionalism set them apart'],
    stats: [
      { value: '500+hrs', label: 'Editing time saved' },
      { value: '$8k+', label: 'Cost Saving' },
      { value: '100+', label: 'Videos Delivered' },
    ],
  },
  {
    id: 6,
    name: 'Christian',
    company: 'Finsult',
    image: '/images/Christian.png',
    text: 'Dsqr really are the [[ultimate content team]]. They assist me in designing, editing and creating videos for my personal brand. They’ve taken my content to a whole new level! The best part is being able to edit so much in a fast turnaround and get that continuous service.',
    highlights: ['ultimate content team'],
    stats: [
      { value: '700+hrs', label: 'Editing time saved' },
      { value: '$14k+', label: 'Cost Saving' },
      { value: '120+', label: 'Videos Delivered' },
    ],
  },
  {
    id: 7,
    name: 'SAMIN',
    company: 'Bookedin AI',
    image: '/images/Samin.jpg',
    text: 'Been great working with these guys, [[always super fast]] and does what I want quickly.',
    highlights: ['always super fast'],
    stats: [
      { value: '1.9k+ hrs', label: 'Editing time saved' },
      { value: '$35k+', label: 'Cost Saving' },
      { value: '150+', label: 'Videos Delivered' },
    ],
  },
  {
    id: 8,
    name: 'Stephen Guy',
    company: 'Lead Agent Unlimited',
    image: '/images/Stephen.jpg',
    text: 'DSQR STUDIOS has lived up and exceeded what they say they offer. [[The quality and communication is top-notch]]. Quit wasting your time a hire them asap!!',
    highlights: ['The quality and communication is top-notch'],
    stats: [
      { value: '3k+hrs', label: 'Editing time saved' },
      { value: '$60k+', label: 'Cost Saving' },
      { value: '380+', label: 'Videos Delivered' },
    ],
  },
  {
    id: 9,
    name: 'PAVEL',
    company: 'The Forbidden Fruit',
    image: '/images/Pavel.jpg',
    text: 'Great experience working with the team. [[Love the edits and attention to detail]]. Quality was top-notch, would recommend.',
    highlights: ['Love the edits and attention to detail'],
    stats: [
      { value: '130+hrs', label: 'Editing time saved' },
      { value: '$2.5k+', label: 'Cost Saving' },
      { value: '610k+', label: 'Views generated' },
    ],
  },
]

export default function TestimonialSection() {
  const [isPaused, setIsPaused] = useState(false)
  const [expanded, setExpanded] = useState(new Set())
  const [overflowMap, setOverflowMap] = useState({})

  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const rafRef = useRef(null)
  const pausedRef = useRef(false)
  const speedPxPerSec = 60

  const loopWidthRef = useRef(0)
  const xRef = useRef(0)
  const lastTsRef = useRef(0)

  // smooth scroll values
  const nudgeRef = useRef(0) // current offset
  const targetNudgeRef = useRef(0) // where we want to scroll to
  const cardWidthRef = useRef(0)

  const textRefs = useRef({})

  // sync pause state
  useEffect(() => {
    pausedRef.current = isPaused
  }, [isPaused])

  // autoplay + smooth button scroll
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2

      const firstCard = track.querySelector('div')
      if (firstCard) {
        // include gap (Tailwind gap-6 ≈ 24px)
        cardWidthRef.current = firstCard.offsetWidth + 24
      }
    }
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(track)

    const step = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts

      if (!pausedRef.current) {
        xRef.current -= speedPxPerSec * dt
        if (-xRef.current >= loopWidthRef.current) {
          xRef.current += loopWidthRef.current
        }
      }

      // Smooth lerp toward button target
      nudgeRef.current += (targetNudgeRef.current - nudgeRef.current) * 0.1

      // ✅ Clamp: don’t let scroll go further right than start
      if (xRef.current + nudgeRef.current > 0) {
        nudgeRef.current = -xRef.current
      }

      const x = xRef.current + nudgeRef.current
      trackRef.current.style.transform = `translate3d(${x}px,0,0)`

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTsRef.current = 0
    }
  }, [])

  // expand/collapse
  const toggleMore = (key) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // smooth button scroll (1 card per click)
  const scrollLeft = () => {
    if (xRef.current + nudgeRef.current < 0) {
      targetNudgeRef.current += cardWidthRef.current
    }
  }
  const scrollRight = () => {
    targetNudgeRef.current -= cardWidthRef.current
  }
  // detect overflow text
  useEffect(() => {
    const map = {}
    Object.entries(textRefs.current).forEach(([key, el]) => {
      if (el) {
        const isOverflowing = el.scrollHeight > el.clientHeight
        if (isOverflowing) map[key] = true
      }
    })
    setOverflowMap(map)
  }, [testimonials]) // re-run when testimonials change

  return (
    <section className="xl:pt-12 py-6 xl:px-16 px-4 relative group overflow-hidden">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-7xl mx-auto lg:px-8">
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full" />
              <span className="text-sm font-medium text-[#1D1F1E] uppercase tracking-wider">
                TESTIMONIAL
              </span>
            </div>
            <span>
              <hr className="text-gray-900 border-gray-300" />
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-[#0D0F11] my-5 tracking-tight">
            Success Stories
            <br />
            from the{' '}
            <em className="font-instrument-italic font-extralight">
              Creative Frontline
            </em>
            .
          </h2>

          <p className="text-base xl:text-[17px] text-[#4B4B4B] max-w-xl leading-relaxed">
            From startups to global teams, our creative process fuels success
            stories built on strategy, design, and seamless execution.
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative w-screen left-1/2 -translate-x-1/2">
          <EmblaTestimonials
            slidesData={testimonials}
            options={{ loop: true }}
          />
        </div>
      </div>
    </section>
  )
}
