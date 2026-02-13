'use client'
import { useState, useRef, useMemo, useEffect } from 'react'
import CalendarSection from '@/components/common/calendar'
import Card from '@/components/common/Card' // ⬅️ Your Card component
import FAQ from '@/components/common/FAQ'
import FeaturesSection from '@/components/common/plan'
import TestimonialSection from '@/components/common/Testimonial'
import WhyOurWork from '@/components/common/work'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { Switch } from '@/components/ui/switch'
import { SwitchWithLabel } from '@/components/common/LabeledSwitch'
import { Info } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMotionValue, useSpring } from 'framer-motion'
import { useCurrency } from '@/components/hooks/useCurrency'
import {
  mapApiPricingToStructure,
  buildCheckoutLink,
} from '@/components/constants/pricing'

export const pricingFaqData = [
  {
    id: 'pricing-1',
    question: 'How do the plans work now?',
    answer: (
      <>
        <p>
          Our plans are fully flexible and built around your needs. You can
          choose:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>
            <strong> Video only –</strong>For creators and businesses focused
            purely on video editing.
          </li>
          <li>
            <strong>Graphics only –</strong> For those who need consistent
            design support.
          </li>
          <li>
            <strong>Video + Graphics –</strong> For clients who want both
            services under one subscription.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'pricing-2',
    question: 'Can I request both videos and graphics under the same plan?',
    answer:
      'Yes! If you select the combined plan, you’ll be able to request both video and graphic projects at the same time. If you choose video-only or graphics-only, you’ll only be able to request that service type.',
  },
  {
    id: 'pricing-3',
    question: 'How many projects can I request in a month?',
    answer:
      'Unlimited. You can queue as many requests as you like, and we’ll complete them based on your chosen active request limit and delivery speed.',
  },
  {
    id: 'pricing-4',
    question: 'How many active requests can I have at once?',
    answer:
      'That’s up to you. You can decide the number of active requests (1, 2, 3, etc.) based on your workload. We’ll work on that many projects simultaneously and move on to the next ones as soon as they’re completed.',
  },
  {
    id: 'pricing-5',
    question:
      'What’s the difference between Standard Delivery and Lightning Fast Delivery?',
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Standard Delivery</strong> – Projects are delivered quickly
          and reliably based on style, length, and complexity.
        </li>
        <li>
          <strong>Lightning Fast Delivery</strong> – Your requests are
          prioritized in the queue, so you receive them much faster ideal for
          high-volume or time-sensitive content.
        </li>
      </ul>
    ),
  },
  {
    id: 'pricing-6',
    question: 'Are there any hidden fees?',
    answer: 'No. You only pay a flat monthly rate for the service you choose.',
  },
  {
    id: 'pricing-7',
    question: 'Can I change my subscription later?',
    answer:
      'Yes you can upgrade, downgrade, or switch between video, graphics, or combined services at any time, depending on your evolving needs.',
  },
  {
    id: 'pricing-8',
    question: 'Do you offer refunds?',
    answer:
      'Since this is a subscription-based service, we don’t offer refunds. However, you have full flexibility to cancel anytime if your needs change.',
  },
]

const PLANS = {
  Graphics: [
    { id: '1', text: 'Social Media Graphics' },
    { id: '2', text: 'Carousels' },
    { id: '3', text: 'Ad Creatives (Static)' },
    { id: '4', text: 'Ad Creatives (Animated)' },
    { id: '5', text: 'Brand Kits & Assets' },
    { id: '6', text: 'Website Graphics' },
    { id: '7', text: 'App Graphics' },
    { id: '8', text: 'Thumbnails' },
    { id: '9', text: 'Slide Decks' },
    { id: '10', text: 'Presentations' },
    { id: '11', text: 'eBooks' },
    { id: '12', text: 'Whitepapers' },
    { id: '13', text: 'PDFs' },
    { id: '14', text: 'Infographics' },
    { id: '15', text: 'Brochures' },
    { id: '16', text: 'Flyers' },
    { id: '17', text: 'Posters' },
    { id: '18', text: 'Merchandise Design' },
    { id: '19', text: 'Packaging Design' },
    { id: '20', text: 'Custom Icons' },
  ],
  Videos: [
    { id: '1', text: 'YouTube Editing' },
    { id: '2', text: 'Reels' },
    { id: '3', text: 'Shorts' },
    { id: '4', text: 'TikToks' },
    { id: '5', text: 'Explainer Video' },
    { id: '6', text: 'Product Video' },
    { id: '7', text: 'Demo Videos' },
    { id: '8', text: 'Motion Graphics' },
    { id: '9', text: 'Animation' },
    { id: '10', text: 'Video Ads (Performance & Social)' },
    { id: '11', text: 'Subtitles, Captions, Titling & Transitions' },
    { id: '12', text: 'Voice-over Integration' },
    { id: '13', text: 'Longform Edits' },
    { id: '14', text: 'Intro/Outro Creation' },
    { id: '15', text: 'Podcast Edits' },
    { id: '16', text: 'Webinar Edits' },
    { id: '17', text: 'Digital Course Editing' },
    { id: '18', text: 'Multilingual Edits' },
    { id: '19', text: 'Montage Edits' },
    { id: '20', text: 'Training Videos' },
    { id: '21', text: 'Travel Vlogs' },
    { id: '22', text: 'House Showcase Videos' },
    { id: '23', text: 'Gym & Fitness Edits' },
    { id: '24', text: 'Car Edits' },
  ],
  'AI Lab': [
    { id: '1', text: 'AI Video Generation' },
    { id: '2', text: 'AI Image Generation' },
    { id: '3', text: 'AI-Generated Video Scripting' },
    { id: '4', text: 'AI Narration' },
    { id: '5', text: 'AI Voiceovers' },
    { id: '6', text: 'AI Dubbing' },
    { id: '7', text: 'AI Clone Creation' },
    { id: '8', text: 'AI-Powered Thumbnails' },
    { id: '9', text: 'Thumbnail Variants & A/B Testing' },
    { id: '10', text: 'AI-Driven B-Rolls' },
    { id: '11', text: 'AI-Generated Assets' },
    { id: '12', text: 'Content Strategy with AI' },
    { id: '13', text: 'Creative Ideation using AI' },
    { id: '14', text: 'AI-Driven Design Enhancements' },
    { id: '15', text: 'Automated Video Workflows' },
    { id: '16', text: 'Product placement' },
    { id: '17', text: 'Video Ad creation' },
    { id: '18', text: 'Ultra-realistic UGC ad creation' },
  ],
}
function useSectionProgress(ref, margin = 0) {
  const { scrollY } = useScroll() // global scroll
  const [bounds, setBounds] = useState({ start: 0, end: 1 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const pageY = window.scrollY || window.pageYOffset
      const start = pageY + rect.top - margin
      // section is "done" when its bottom passes viewport bottom
      const end = pageY + rect.bottom - window.innerHeight + margin

      setBounds({ start, end })
    }

    measure()
    // re-measure on resize and images/fonts load
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    const ro = new ResizeObserver(measure)
    ro.observe(el)

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      ro.disconnect()
    }
  }, [ref, margin])

  // 0 → 1 across the section’s scroll span
  return useTransform(scrollY, [bounds.start, bounds.end], [0, 1])
}
function AnimatedNumber({ value, formatter }) {
  const motionValue = useMotionValue(value)
  const springValue = useSpring(motionValue, { stiffness: 200, damping: 20 })
  const displayValue = useTransform(springValue, (latest) =>
    formatter(Math.round(latest)),
  )

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  return <motion.span>{displayValue}</motion.span>
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('Graphics')
  const [active, setActive] = useState(2) // 0: Graphic, 1: Video, 2: Both (front by default)
  const currency = useCurrency()

  // smoother: pick by label; default "Both" on top
  const [activeKey, setActiveKey] = useState('Both')
  const prefersReduced = useReducedMotion()

  const [compareOpen, setCompareOpen] = useState(false)
  const selectRefs = useRef([])

  // simple tooltip function inside same file
  function TooltipIcon({ content }) {
    const [open, setOpen] = useState(false)

    return (
      <span className="relative inline-flex items-center">
        <button
          type="button"
          className="peer inline-flex h-4 w-4 items-center justify-center rounded-full text-xs"
          aria-label="Info"
          onClick={() => setOpen((o) => !o)}
          onBlur={() => setOpen(false)}
        >
          <Info />{' '}
        </button>

        <div
          className={`absolute right-1 top-full z-20 mt-1 w-36 rounded-md border bg-primary p-2 text-[11px] shadow
            ${open ? 'block' : 'hidden'} peer-hover:block peer-focus:block`}
          role="tooltip"
        >
          {content}
        </div>
      </span>
    )
  }
  const [pricing, setPricing] = useState(null)
  const [pricesObj, setPricesObj] = useState({})
  // depth: 0 = front, 1 = middle, 2 = back (based on active index)
  const cards = [
    {
      key: 'Graphic',
      prices: pricesObj.Graphic,
      title: 'Graphic Design',
      description:
        'Perfect for agencies, marketers & startups with ongoing design needs, from ads and carousels to social posts & more.',
      firstFeature: 'Unlimited Graphic Requests',
    },
    {
      key: 'Video',
      prices: pricesObj.Video,
      title: 'Video Editing',
      description:
        'Tailored for agencies, creators & brands who outsource video editing, from reels and long-form edits to ads, promos & more.',
      firstFeature: 'Unlimited Video Requests',
    },
    {
      key: 'Both',
      prices: pricesObj.Both,
      title: 'Graphic + Video',
      description:
        'All-in-One for agencies, creators & brands unlimited videos and graphics, from ads and posts to long-form edits & more.',
      firstFeature: 'Unlimited Graphic + Video Requests',
    },
  ]
  const activeIndex = cards.findIndex((c) => c.key === activeKey)

  // depth: 0=front, 1=mid, 2=back
  const getDepth = (i) => (i - activeIndex + cards.length) % cards.length

  const poses = {
    0: { y: 0, scale: 1, opacity: 1, z: 30, blur: 'blur(0px)' },
    1: { y: -36, scale: 0.975, opacity: 0.99, z: 20, blur: 'blur(0px)' },
    2: { y: -72, scale: 0.95, opacity: 0.97, z: 10, blur: 'blur(0px)' },
  }

  // silky spring
  const spring = prefersReduced
    ? { duration: 0.25, ease: 'easeOut' }
    : { type: 'spring', stiffness: 180, damping: 26, mass: 0.7 }

  // click triggers from the right selector
  const selector = ['Video', 'Both', 'Graphics'] // your UI labels
  const labelToKey = (label) => (label === 'Graphics' ? 'Graphic' : label) // normalize

  const handleSelect = (label) => {
    setActiveKey(labelToKey(label))
    setActive(selector.indexOf(label))
  }

  // (optional) keyboard support
  const handleKey = (e) => {
    if (e.key === 'ArrowRight') setActive((a) => (a + 1) % cards.length)
    if (e.key === 'ArrowLeft')
      setActive((a) => (a - 1 + cards.length) % cards.length)
  }

  // default 3 cards
  const [compareCards, setCompareCards] = useState([
    { plan: 'Graphic', requests: '3', fast: false },
    { plan: 'Video', requests: '3', fast: false },
    { plan: 'Both', requests: '3', fast: false },
  ])

  // helpers
  const updateCard = (i, patch) =>
    setCompareCards((prev) =>
      prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)),
    )

  // format the numeric part only (no $). currency is shown separately in JSX
  const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(n)

  const container = useRef(null)
  const horizWrapRef = useRef(null) // pinned viewport (desktop)
  const horizTrackRef = useRef(null) // wide row we translate
  // normalize currency and fallback to 'USD'
  const cur = (currency && currency.toUpperCase()) || 'USD'

  // returns a number price or null (for "3+" or missing data)
  const getTotalSimple = (plan, requests, fast) => {
    if (requests === '3+') return null
    const p = pricesObj?.[plan]?.[requests]
    if (!p) return null
    const chosen = fast ? p.fast : p.base
    return chosen?.[cur] ?? chosen?.USD ?? null
  }

  // returns checkout URL using your buildCheckoutLink helper
  const getLinkSimple = (plan, requests, fast) => {
    try {
      return buildCheckoutLink(plan, requests, fast) || '#'
    } catch {
      return '#'
    }
  }

  // Pricing state

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/pricing`)
      .then((res) => res.json())
      .then((data) => {
        let mapped = {}
        if (
          data &&
          data.data &&
          typeof data.data === 'object' &&
          !Array.isArray(data.data)
        ) {
          mapped = data.data
        } else if (data && Array.isArray(data.data)) {
          mapped = mapApiPricingToStructure(data.data)
        }
        // Convert all keys to valid JS identifiers or numbers
        function convertKeysToJS(obj) {
          if (typeof obj !== 'object' || obj === null) return obj
          if (Array.isArray(obj)) return obj.map(convertKeysToJS)
          const newObj = {}
          for (const key in obj) {
            const value = obj[key]
            let newKey = key
            if (!isNaN(key) && key.trim() !== '') {
              newKey = Number(key)
            } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) {
              newKey = key
            }
            newObj[newKey] = convertKeysToJS(value)
          }
          return newObj
        }
        if (Object.keys(mapped).length) {
          setPricesObj(convertKeysToJS(mapped))
        }
        setPricing(data)
      })
      .catch((err) => console.error(err))
  }, [])

  // Render
  return (
    <>
      {/* Optionally show raw API response for debugging */}
      {/* {pricing && (
        <div style={{marginBottom:24}}>
          <h4>Raw API Response:</h4>
          <pre style={{fontSize:12, background:'#f6f6f6', padding:8}}>{JSON.stringify(pricing, null, 2)}</pre>
        </div>
      )} */}
      <section
        className="py-12 px-4 md:px-8 lg:px-16"
        onKeyDown={handleKey}
        tabIndex={0}
      >
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-4 mt-2"
            style={{ lineHeight: '0.9' }} // 1.1 = 110%
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-instrument-italic font-light">
              Unlimited Creatives!
            </span>
            <br />
            <span>One Subscription.</span>
          </motion.h1>

          {/* fun badges */}
          <motion.span
            className="absolute md:block hidden bg-[#CC7BFF] text-white text-sm sm:text-base px-3 py-2 rounded-full rotate-3 shadow-lg font-medium top-[15%] lg:right-[10%] right-[0%]"
            // style={{ top: '15%', right: '10%' }}
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            @Connect
            <span className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-[#CC7BFF]" />
          </motion.span>

          <motion.span
            className="absolute md:block hidden bg-[#55AAFF] text-white text-sm sm:text-base px-3 py-2 rounded-full -rotate-3 shadow-lg font-medium top-[15%] lg:left-[10%] left-[0%]"
            // style={{ top: '15%', left: '10%' }}
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            @Subscribe
            <span className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-[#55AAFF]" />
          </motion.span>

          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            From social media posts to full-scale video campaigns, choose the
            plan that matches your creative needs and watch your brand grow.
          </motion.p>
        </div>

        {/* ✅ Replaced vertical selector with pill-style tab above cards */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center bg-gray-100 rounded-full shadow-inner p-1">
            {selector.map((label) => {
              const key = labelToKey(label)
              const isActive = activeKey === key
              return (
                <button
                  key={label}
                  onClick={() => setActiveKey(key)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-black'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col items-center justify-center gap-6">
          {/* ✅ Interactive Card Stack */}
          <div className="relative w-full max-w-xl">
            <div className="relative w-full h-[680px] md:h-[470px] lg:h-[480px]">
              {cards.map((c, i) => {
                const depth = getDepth(i)
                const pose = poses[depth]
                return (
                  <motion.div
                    key={c.key}
                    // layout // smoothens reflow between states
                    className="absolute left-0 top-28 right-0 mx-auto w-full cursor-pointer"
                    style={{ zIndex: pose.z, transformOrigin: '50% 0%' }}
                    initial={false}
                    animate={{
                      y: pose.y,
                      scale: pose.scale,
                      opacity: pose.opacity,
                      filter: pose.blur,
                      rotate: 0,
                      boxShadow:
                        depth === 0
                          ? '0 18px 50px rgba(0,0,0,0.14)'
                          : '0 10px 28px rgba(0,0,0,0.10)',
                    }}
                    transition={spring}
                    onClick={() => setActiveKey(c.key)}
                    onTap={() => setActiveKey(c.key)}
                    whileHover={depth === 0 ? { scale: 1.01 } : { scale: 1 }}
                  >
                    <div
                      className="transition-transform duration-200 will-change-transform transform-gpu"
                      style={{ transformOrigin: '50% 50%' }}
                    >
                      <Card
                        className={`transition duration-200 rounded-xl ${
                          depth === 0 ? 'ring-2 ring-indigo-100' : ''
                        }`}
                        key={c.key}
                        prices={c.prices}
                        currency={currency}
                        title={c.title}
                        description={c.description}
                        firstFeature={c.firstFeature}
                        getCheckoutLink={(activeRequest, fastDelivery) =>
                          buildCheckoutLink(c.key, activeRequest, fastDelivery)
                        }
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-6 pt-12 mt-24 md:mt-0 max-w-7xl mx-auto">
        {/* Toggle */}
        <div className="flex justify-center">
          <button
            onClick={() => setCompareOpen((v) => !v)}
            className="relative overflow-hidden rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold shadow hover:shadow-md transition group cursor-pointer"
          >
            {compareOpen ? 'Hide Comparison ↑' : 'Compare Plans ↓'}

            {/* Shiny effect */}
            <span
              className="absolute inset-0 translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent
                 skew-x-[-20deg] transition-transform duration-700 ease-in-out group-hover:translate-x-full"
            />
          </button>
        </div>

        {/* Compare – animated mount/unmount */}
        <AnimatePresence initial={false}>
          {compareOpen && (
            <>
              {/* Heading + Subtitle (only when open) */}
              <motion.div
                key="compare-heading"
                className="text-center mb-6 mt-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <h2 className="text-3xl md:text-5xl font-semibold">
                  Choose What Fits
                  <em className="font-instrument-italic font-light ml-2">
                    You Best
                  </em>
                </h2>
                <p className="mt-2 text-gray-800 text-base md:text-lg">
                  Compare our plans side by side and find the perfect match for
                  your creative needs.
                </p>
              </motion.div>
              <motion.div
                key="compare-grid"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Mobile: horizontal scroll with snap + peek */}
                <div className="mt-10 md:hidden px-4 py-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-none">
                  <div className="flex gap-4 pr-6">
                    {compareCards.slice(0, 2).map((c, i) => {
                      const total = getTotalSimple(c.plan, c.requests, c.fast)
                      const link = getLinkSimple(c.plan, c.requests, c.fast)

                      return (
                        <div
                          key={`m-${i}`}
                          className="snap-start shrink-0 w-[85%] rounded-2xl bg-[var(--color-primary)] p-5 shadow-lg flex flex-col gap-4"
                        >
                          {/* Plan (shadcn Select) */}
                          <Select
                            value={c.plan}
                            onValueChange={(v) => updateCard(i, { plan: v })}
                          >
                            <SelectTrigger className="w-full rounded-full bg-primary text-sm h-9 px-3 border">
                              <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Graphic">Graphic</SelectItem>
                              <SelectItem value="Video">Video</SelectItem>
                              <SelectItem value="Both">Both</SelectItem>
                            </SelectContent>
                          </Select>

                          {/* Active Request */}
                          <div className="flex items-center gap-2">
                            {/** give each select a unique id */}
                            <select
                              id={`req-${i}`}
                              ref={(el) => (selectRefs.current[i] = el)}
                              value={c.requests}
                              onChange={(e) =>
                                updateCard(i, { requests: e.target.value })
                              }
                              className="w-12 rounded bg-primary text-xs h-6 px-1 border border-black"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="3+">3+</option>
                            </select>

                            {/** replace <span> with <label htmlFor="..."> */}
                            <label
                              htmlFor={`req-${i}`}
                              className="text-sm font-semibold cursor-pointer select-none"
                              onTouchEnd={() => {
                                // iOS fallback: ensure focus after tap
                                setTimeout(
                                  () => selectRefs.current[i]?.focus(),
                                  0,
                                )
                              }}
                            >
                              Active Request
                            </label>
                          </div>
                          {/* Fast Delivery */}
                          {c.requests !== '3+' && (
                            <SwitchWithLabel
                              label="Get Lightning Fast Delivery"
                              checked={c.fast}
                              onCheckedChange={(v) =>
                                updateCard(i, { fast: v })
                              }
                            />
                          )}

                          {/* Price */}
                          {c.requests === '3+' ? (
                            <p className="text-2xl font-bold">Custom</p>
                          ) : (
                            <div className="mt-3 flex leading-tight">
                              <div className="flex items-center gap-1">
                                <span className="text-3xl font-bold">
                                  {currency}
                                </span>
                                <p className="text-3xl font-bold">
                                  <AnimatedNumber
                                    value={total}
                                    formatter={fmt}
                                  />
                                </p>
                                <p className="text-xs text-black/90 flex leading-3 ">
                                  {' '}
                                  Per <br />
                                  month
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Subscribe */}
                          {c.requests === '3+' ? (
                            <a
                              href="/contact-us"
                              className="mt-2 block rounded-full bg-black py-2 text-center text-sm font-semibold text-[var(--color-primary)] hover:bg-black/90"
                            >
                              Contact Us
                            </a>
                          ) : (
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 block rounded-full bg-black py-2 text-center text-sm font-semibold text-[var(--color-primary)] hover:bg-black/90"
                            >
                              Subscribe
                            </a>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Desktop: 3-column grid */}
                <div className="mt-10 hidden md:grid gap-6 md:grid-cols-3">
                  {compareCards.map((c, i) => {
                    const total = getTotalSimple(c.plan, c.requests, c.fast)
                    const link = getLinkSimple(c.plan, c.requests, c.fast)

                    return (
                      <div
                        key={`d-${i}`}
                        className="rounded-2xl bg-[var(--color-primary)] p-5 shadow-xl flex flex-col gap-4 max-w-[400px]"
                      >
                        {/* Plan (shadcn Select) */}
                        <Select
                          value={c.plan}
                          onValueChange={(v) => updateCard(i, { plan: v })}
                        >
                          <SelectTrigger className="w-full rounded-full bg-primary text-sm h-[32px_!important]  px-3 border">
                            <SelectValue placeholder="Select a plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Graphic">Graphic</SelectItem>
                            <SelectItem value="Video">Video</SelectItem>
                            <SelectItem value="Both">Both</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Active Request */}
                        <div className="flex items-center gap-2">
                          <select
                            ref={(el) => (selectRefs.current[i] = el)}
                            value={c.requests}
                            onChange={(e) =>
                              updateCard(i, { requests: e.target.value })
                            }
                            className="w-12 rounded bg-primary text-xs h-6 px-1 border border-black"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="3+">3+</option>
                          </select>
                          <span
                            className="text-sm font-semibold cursor-pointer select-none"
                            onClick={() => selectRefs.current[i]?.focus()}
                          >
                            Active Request
                          </span>
                          <TooltipIcon content="We handle a set number of tasks at a time. Backlog tasks begin once an active task is submitted for review." />
                        </div>

                        {/* Fast Delivery */}
                        {c.requests !== '3+' && (
                          <div className="flex items-center gap-2">
                            <SwitchWithLabel
                              label="Get Lightning Fast Delivery"
                              checked={c.fast}
                              onCheckedChange={(v) =>
                                updateCard(i, { fast: v })
                              }
                            />
                            <TooltipIcon content="Get your tasks delivered lightning fast." />
                          </div>
                        )}

                        {/* Price */}
                        {c.requests === '3+' ? (
                          <p className="text-2xl font-bold">Custom</p>
                        ) : (
                          <div className="mt-3 flex items-center gap-1">
                            <span className="text-3xl font-bold">
                              {currency}
                            </span>
                            <span className="text-3xl font-bold">
                              <AnimatedNumber value={total} formatter={fmt} />
                            </span>
                            <p className="text-xs flex flex-col leading-3">
                              Per <br /> month
                            </p>
                          </div>
                        )}

                        {/* Subscribe */}
                        {c.requests === '3+' ? (
                          <a
                            href="/contact-us"
                            className="mt-2 block rounded-full bg-black py-2 text-center text-sm font-semibold text-[var(--color-primary)] hover:bg-black/90"
                          >
                            Contact Us
                          </a>
                        ) : (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 block rounded-full bg-black py-2 text-center text-sm font-semibold text-[var(--color-primary)] hover:bg-black/90"
                          >
                            Subscribe
                          </a>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      <div className="bg-primary py-6 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold">
            AI{' '}
            <em className="font-instrument-italic font-extralight">Creative</em>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-800 mt-2">
            Automate, innovate, and scale your content with AI all for one
            predictable monthly fee.
          </p>
          <div className="mt-10">
            <Card
              title="AI Lab"
              button={false}
              prices={pricesObj.AI} // ✅ uses AI pricing
              getCheckoutLink={
                (activeRequest, fastDelivery) =>
                  buildCheckoutLink('AI', activeRequest, fastDelivery) // ✅ AI plan
              }
              firstFeature="Unlimited AI Creative Requests"
              description="Ideal for entrepreneurs and businesses to outsource all content needs with AI-generated solutions."
              defaultLink="https://buy.stripe.com/6oU28r6wA07WaHlbXh08g1j"
            />
          </div>
        </div>
      </div>
      {/* <FeaturesSection
        title1="Every Plan. Every Benefit"
        title2="Every Time"
        subtitle="No matter which plan you choose, you get our full creative commitment."
        includedFeaturesTitle=" • Included Features"
      /> */}
      <section className="relative px-4 lg:px-8 md:py-8 py-6  max-w-7xl mx-auto">
        {/* floating badge (md+) */}
        <motion.span
          className="absolute md:block hidden bg-black text-white text-xs sm:text-sm px-3 py-2 rounded-full rotate-3 shadow-lg font-medium"
          style={{ top: '6%', right: '15%' }}
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
          @features
          <span
            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-0 h-0 
      border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent 
      border-t-[8px] border-t-black"
          ></span>
        </motion.span>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="flex gap-2 sm:gap-3 bg-gray-100 rounded-full p-1 py-2">
            {Object.keys(PLANS).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)} // Sets the active tab to the correct string key
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition
    ${
      activeTab === tabKey // Correctly compares the active tab string
        ? 'bg-[var(--color-primary)] text-black'
        : 'text-gray-700'
    }`}
              >
                {tabKey}{' '}
                {/* Displays the key ('Graphics', 'Videos', etc.) as the button text */}
              </button>
            ))}
          </div>
        </div>

        {/* Feature box */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-6 md:mt-8 rounded-2xl bg-primary border shadow-sm p-5 md:p-8"
        >
          <h3 className="font-semibold text-base md:text-xl mb-4">
            • List of services
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10">
            {PLANS[activeTab].map((feature, i) => (
              <div key={feature.id} className="flex items-center gap-2">
                {/* lime check dot */}
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 fill-[var(--color-primary)]"
                  >
                    <path d="M8.143 13.314 4.83 10l1.18-1.172 2.133 2.133 5.847-5.847L15.17 6.29 8.143 13.314z" />
                  </svg>
                </span>
                <span className="text-gray-800 text-sm md:text-base">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <WhyOurWork />
      {/* <FeaturesSection
        includedFeaturesTitle=" • Most Popular Plan"
        showHeader={false}
      /> */}
      <TestimonialSection />
      <FAQ faqData={pricingFaqData} />
      <CalendarSection />
    </>
  )
}
