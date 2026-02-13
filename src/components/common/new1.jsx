'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import { Check } from 'lucide-react'
import FreeTrialForm from './FreeTrialForm'
import Link from 'next/link'
// --- Helper Hook for Media Queries ------
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    // Set initial value on client-side mount
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])
  return matches
}

const CardWrapper = ({
  card,
  index,
  controls,
  isEntranceComplete,
  scrollYProgress,
  config,
  isSpreadComplete,
  windowWidth,
  isMobile,
  isTablet,
  isSmallDesktop,
  cardStackTop, // <-- Destructure the prop
  showBadges, // <-- ADD THIS
}) => {
  const { cardWidth, spreadValues, diagonalValues, numCards } = config

  const horizontal = spreadValues[index]
  const diagonal = diagonalValues[index]

  const scrollPoints = [0, 0.2, 0.25, 0.55] // --- Animation Center Point --- // The animation targets the center of the right part of the screen. // An offset from the screen's center is added to position the stack.

  const horizontalOffset = useMemo(() => {
    // This is the Tailwind value for `max-w-7xl` (80rem -> 1280px)
    const maxWidth = 1280

    // Determine the actual width of our content container on the screen
    const containerWidth = Math.min(windowWidth, maxWidth)

    // This calculates the correct offset from the screen's center to place the
    // cards in the middle of the right-hand column of your new container.
    return containerWidth / 12
  }, [windowWidth])

  const xKeyframes = [horizontal.x, 0, 0, horizontalOffset + diagonal.x]

  const verticalOffset = isMobile ? diagonal.y + 60 : diagonal.y - 80
  const yKeyframes = [horizontal.y, 0, 0, verticalOffset]

  const rotateKeyframes = [horizontal.rot, -10, -10, 0]

  const x = useTransform(scrollYProgress, scrollPoints, xKeyframes)
  const y = useTransform(scrollYProgress, scrollPoints, yKeyframes)
  const rotate = useTransform(scrollYProgress, scrollPoints, rotateKeyframes)

  const isSecondCard = index === 1
  const isSecondToLastCard = index === numCards - 2

  const initialLabelOpacity = isSpreadComplete ? 1 : 0
  const initialLabelScale = isSpreadComplete ? 1 : 0.5

  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.45],
    [initialLabelOpacity, 0, 0, 1],
  )

  const labelScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.45, 0.5],
    [initialLabelScale, 0.5, 0.5, 1.1, 1],
  )

  const labelY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.45],
    [0, 10, 10, 0],
  )

  return (
    <motion.div
      key={card.id}
      className="absolute rounded-2xl shadow-xl bg-cover bg-center"
      custom={index}
      initial={{ y: '100vh' }}
      animate={controls}
      style={{
        width: `${cardWidth}px`,
        height: `${cardWidth}px`,
        backgroundImage: `url(${card.src})`,
        zIndex: 10 + index,
        top: cardStackTop, // <-- Use the dynamic prop here
        left: `calc(50% - ${cardWidth / 2}px)`,
        ...(isEntranceComplete && { x, y, rotate }),
      }}
    >
           
      {isSecondCard && (
        <motion.div
          className="absolute bg-black text-white text-xs lg:text-sm xl:text-base lg:px-1 py-1 rounded-full 
     -rotate-6 shadow-lg font-medium
    top-[-28%] left-[10px] max-h-10"
          initial="hidden"
          animate={showBadges ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: -24, scale: 0.6 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 120,
                damping: 12,
                mass: 0.6,
                delay: 0.08, // optional tiny stagger
              },
            },
          }}
        >
                    @Videos
          <span className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black"></span>
                 
        </motion.div>
      )}
           
      {isSecondToLastCard && (
        <motion.div
          className="absolute bg-[#988DB8] text-white text-xs lg:text-sm xl:text-base lg:px-1 py-1 rounded-full 
     rotate-6 shadow-lg font-medium
    top-[-28%] left-[10px] hidden sm:block max-h-10"
          initial="hidden"
          animate={showBadges ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: -24, scale: 0.6 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 120,
                damping: 12,
                mass: 0.6,
                delay: 0.08 * index, // <-- same timing as @Videos
              },
            },
          }}
        >
                    @Graphics
          <span className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#988DB8]"></span>
                 
        </motion.div>
      )}
         
    </motion.div>
  )
}

export default function StackedCardAnimation() {
  const targetRef = useRef(null)
  const cardControls = useAnimation()
  const topContentControls = useAnimation()
  const bottomContentControls = useAnimation()
  const [isEntranceComplete, setIsEntranceComplete] = useState(false)
  const [isSpreadComplete, setIsSpreadComplete] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const topContentRef = useRef(null) // <-- Add this ref
  const [cardStackTop, setCardStackTop] = useState('28%') // <-- Add this state
  const [open, setOpen] = useState(false)
  const [showBadges, setShowBadges] = useState(false)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isSmallDesktop = useMediaQuery(
    '(min-width: 1025px) and (max-width: 1280px)',
  )

  const config = useMemo(() => {
    if (isMobile) {
      // If the screen is very small (<500px)
      const isVerySmall = windowWidth < 500
      const cardWidth = isVerySmall ? 120 : 150 // smaller size for very small screens
      const spacing = cardWidth / 1.8

      return {
        numCards: 4,
        cardWidth,
        spreadValues: [
          { x: -spacing * 1.5, y: 10, rot: -10 },
          { x: -spacing * 0.5, y: 0, rot: -5 },
          { x: spacing * 0.5, y: 0, rot: 5 },
          { x: spacing * 1.5, y: 10, rot: 10 },
        ],
        diagonalValues: [
          { x: 0, y: 0 },
          { x: cardWidth * 0.6, y: cardWidth * 0.3 },
          { x: cardWidth * 1.2, y: cardWidth * 0.6 },
          { x: cardWidth * 1.8, y: cardWidth * 0.9 },
        ],
      }
    }
    if (isTablet) {
      const cardWidth = 170
      const spacing = cardWidth / 2
      return {
        numCards: 5,
        cardWidth,
        spreadValues: [
          { x: -spacing * 2.6, y: 20, rot: -10 },
          { x: -spacing * 1.3, y: 5, rot: -5 },
          { x: 0, y: 0, rot: 0 },
          { x: spacing * 1.3, y: 5, rot: 5 },
          { x: spacing * 2.6, y: 20, rot: 10 },
        ], // --- Defines the final diagonal stack layout ---
        diagonalValues: [
          { x: 0, y: 0 },
          { x: cardWidth * 0.5, y: cardWidth * 0.2 },
          { x: cardWidth * 1.0, y: cardWidth * 0.4 },
          { x: cardWidth * 1.5, y: cardWidth * 0.6 },
          { x: cardWidth * 2.0, y: cardWidth * 0.8 },
        ],
      }
    }
    if (isSmallDesktop) {
      const cardWidth = 180
      const spacing = cardWidth / 2
      return {
        numCards: 6,
        cardWidth,
        spreadValues: [
          { x: -spacing * 3, y: 25, rot: -12 },
          { x: -spacing * 1.8, y: 10, rot: -7 },
          { x: -spacing * 0.6, y: 5, rot: -3 },
          { x: spacing * 0.6, y: 5, rot: 3 },
          { x: spacing * 1.8, y: 10, rot: 7 },
          { x: spacing * 3, y: 25, rot: 12 },
        ], // --- Defines the final diagonal stack layout ---
        diagonalValues: [
          { x: 0, y: 0 },
          { x: cardWidth * 0.5, y: cardWidth * 0.25 },
          { x: cardWidth * 1.0, y: cardWidth * 0.5 },
          { x: cardWidth * 1.5, y: cardWidth * 0.75 },
          { x: cardWidth * 2.0, y: cardWidth * 1.0 },
          { x: cardWidth * 2.5, y: cardWidth * 1.25 },
        ],
      }
    } // Default to large desktop
    const cardWidth = 180
    const spacing = cardWidth / 2
    return {
      numCards: 7,
      cardWidth,
      spreadValues: [
        { x: -spacing * 3.6, y: 30, rot: -12 },
        { x: -spacing * 2.4, y: 15, rot: -6 },
        { x: -spacing * 1.3, y: 5, rot: -4 },
        { x: 0, y: 0, rot: 0 },
        { x: spacing * 1.3, y: 5, rot: 4 },
        { x: spacing * 2.4, y: 15, rot: 8 },
        { x: spacing * 3.6, y: 30, rot: 12 },
      ], // --- Defines the final diagonal stack layout ---
      diagonalValues: [
        { x: 0, y: 0 },
        { x: cardWidth * 0.4, y: cardWidth * 0.2 },
        { x: cardWidth * 0.8, y: cardWidth * 0.4 },
        { x: cardWidth * 1.2, y: cardWidth * 0.6 },
        { x: cardWidth * 1.6, y: cardWidth * 0.8 },
        { x: cardWidth * 2.0, y: cardWidth * 1.0 },
        { x: cardWidth * 2.4, y: cardWidth * 1.2 },
      ],
    }
  }, [isMobile, isTablet, isSmallDesktop])

  const { numCards, spreadValues } = config

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  // const cardData = [
  //   { id: 1, src: "https://placehold.co/200x200/E4DFFD/333?text=Card+1" },
  //   { id: 2, src: "https://placehold.co/200x200/D6F2E3/333?text=Card+2" },
  //   { id: 3, src: "https://placehold.co/200x200/FDECC8/333?text=Card+3" },
  //   { id: 4, src: "https://placehold.co/200x200/FFDADC/333?text=Card+4" },
  //   { id: 5, src: "https://placehold.co/200x200/D4E4F7/333?text=Card+5" },
  //   { id: 6, src: "https://placehold.co/200x200/F0D9E7/333?text=Card+6" },
  //   { id: 7, src: "https://placehold.co/200x200/E0E0E0/333?text=Card+7" },
  // ];
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    const fetchHeroSectionImages = async () => {
      try {
        const backendBaseUrl =
          process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(
          `${backendBaseUrl}/api/admin/media-items/category/home-page?subsection=hero-section`,
        )
        const data = await res.json()
        // Use data.data and correct keys (_id, src)
        const cards = Array.isArray(data.data)
          ? data.data.map((item) => ({ id: item._id, src: item.src }))
          : []
        setCardData(cards)
        console.log('Fetched hero-section images:', cards)
      } catch (error) {
        console.error('Error fetching hero-section images:', error)
      }
    }
    fetchHeroSectionImages()
  }, [])

  const visibleCards = useMemo(() => {
    // safety
    if (!Array.isArray(cardData) || numCards <= 0) return []

    // filter out any undefined or invalid card objects
    const validCards = cardData.filter((card) => card && card.id && card.src)
    if (validCards.length === 0) return []

    // ensure we don't try to take more than available
    const take = Math.min(numCards, validCards.length)

    // if we only show one card, make it the last valid card
    if (take === 1) return [validCards[validCards.length - 1]]

    // take the first (take - 1) cards, then force the last slot to be the last valid card
    const head = validCards.slice(0, take - 1)
    const last = validCards[validCards.length - 1]
    return [...head, last]
  }, [numCards, cardData])

  useEffect(() => {
    const entranceSequence = async () => {
      setIsEntranceComplete(false)
      setIsSpreadComplete(false)

      topContentControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
      })

      cardControls.set({
        y: '100vh',
        x: 0,
        rotate: -10,
      })

      await cardControls.start({
        y: 0,
        transition: { duration: 1.2, ease: 'easeOut' },
      })

      const spreadAnimation = cardControls.start((i) => ({
        x: spreadValues[i].x,
        y: spreadValues[i].y,
        rotate: spreadValues[i].rot,
        transition: { duration: 1.6, ease: [0.4, 0, 0.2, 1] },
      }))

      await new Promise((resolve) => setTimeout(resolve, 200))
      bottomContentControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
      })

      await spreadAnimation

      setIsSpreadComplete(true)
      setIsEntranceComplete(true)
      setShowBadges(true)
    }
    if (windowWidth > 0) {
      entranceSequence()
    }
  }, [
    cardControls,
    topContentControls,
    bottomContentControls,
    spreadValues,
    windowWidth,
  ])
  // FAST-FORWARD ANIMATION WHEN USER SCROLLS PAST A SMALL THRESHOLD
  useEffect(() => {
    // threshold (tweakable): when scroll progress passes this, we snap to final state
    const SNAP_THRESHOLD = 0.08

    // subscribe to scroll progress changes
    const unsubscribe = scrollYProgress.onChange((v) => {
      // only act if user scrolled beyond threshold and entrance hasn't been completed
      if (v > SNAP_THRESHOLD && !isEntranceComplete) {
        // stop any running animations
        cardControls.stop()
        topContentControls.stop()
        bottomContentControls.stop()

        // immediately set cards to their spread/entrance-final positions
        // using start with zero-duration to ensure Framer applies per-index
        cardControls.start((i) => ({
          x: spreadValues[i]?.x ?? 0,
          y: spreadValues[i]?.y ?? 0,
          rotate: spreadValues[i]?.rot ?? 0,
          transition: { duration: 0 },
        }))

        // ensure content states are shown
        bottomContentControls.start({
          opacity: 1,
          transition: { duration: 0 },
        })
        topContentControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0 },
        })

        // mark entrance/spread done so future scroll doesn't re-run
        setIsSpreadComplete(true)
        setIsEntranceComplete(true)
      }
    })

    return () => unsubscribe && unsubscribe()
  }, [
    scrollYProgress,
    isEntranceComplete,
    cardControls,
    topContentControls,
    bottomContentControls,
    spreadValues,
  ])
  useEffect(() => {
    const SECOND_SCREEN_START = 0.18 // when second screen begins
    const SECOND_SCREEN_SHOW_AT = 0.45 // when to show badges again (near end)

    const unsubscribe = scrollYProgress.onChange((v) => {
      // If still on first screen region and spread completed -> ensure visible
      if (v < SECOND_SCREEN_START) {
        if (isSpreadComplete && !showBadges) setShowBadges(true)
        return
      }

      // When entering second screen — hide badges
      if (v >= SECOND_SCREEN_START && v < SECOND_SCREEN_SHOW_AT) {
        if (showBadges) setShowBadges(false)
        return
      }

      // Near the end of second-screen animation -> show badges again
      if (v >= SECOND_SCREEN_SHOW_AT) {
        if (!showBadges) setShowBadges(true)
        return
      }
    })

    return () => unsubscribe && unsubscribe()
  }, [scrollYProgress, isSpreadComplete, showBadges])

  const firstScreenY = useTransform(scrollYProgress, [0, 0.15], ['0%', '-100%'])

  const secondScreenOpacity = useTransform(scrollYProgress, [0.18, 0.3], [0, 1])
  const line1Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const line2Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1])
  const line3Opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1])
  const paragraphOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])
  const buttonsOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  const line1Y = useTransform(scrollYProgress, [0.2, 0.3], [40, 0])
  const paragraphY = useTransform(scrollYProgress, [0.35, 0.45], [40, 0])

  // In your StackedCardAnimation component

  useEffect(() => {
    const calculatePosition = () => {
      if (topContentRef.current) {
        const topContentHeight = topContentRef.current.offsetHeight

        // --- REFINED LOGIC ---
        // Get the space the label needs above the card.
        // The label has `top-[-28%]` and the card height is `config.cardWidth`.
        const labelOffset = config.cardWidth * 0.28

        // A safe margin below the title. Feel free to adjust this value.
        const margin = 30

        // The new position now accounts for the title, the label, and a margin.
        setCardStackTop(`${topContentHeight + labelOffset + margin}px`)
      }
    }

    calculatePosition()
  }, [windowWidth, config]) // <-- IMPORTANT: Add 'config' here
  return (
    <div ref={targetRef} className="relative h-[160vh] w-full">
           
      <div className="sticky top-0 h-screen overflow-hidden">
               
        <motion.div
          className="absolute inset-0 flex flex-col items-center"
          style={{ y: firstScreenY, zIndex: 20 }}
        >
                   
          <div className="flex items-end justify-center w-full">
            <motion.div
              ref={topContentRef} // <-- Attach the ref here
              className="text-center sm:px-4 px-2 pb-5 mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={topContentControls}
            >
              <h1 className="fade-up text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight mb-10 md:mb-6 relative">
                Unlimited{' '}
                {/* Reserve fixed width using the longest word to avoid layout shift */}
                <span
                  className="relative inline-block align-baseline"
                  style={{
                    width: '8ch',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    minWidth: '8ch',
                  }}
                >
                  <span className="invisible inline-block select-none">
                    Graphics
                  </span>
                  <span className="absolute left-0 top-0 inline-block font-instrument-italic font-light">
                    <Typewriter
                      words={['Graphic Designs', 'Video Edits', 'AI Content']}
                      loop={0}
                      cursor
                      cursorStyle="|"
                      typeSpeed={80}
                      deleteSpeed={50}
                      delaySpeed={1200}
                    />
                  </span>
                </span>
                <br />
                <span className="font-semibold">
                  One Scalable Subscription.
                </span>
              </h1>
            </motion.div>
          </div>
                   
          <div
            className="flex-shrink-0"
            style={{ height: `${config.cardWidth * 1.2}px`, width: '100%' }}
          />
                   
          <div className="flex-1 flex items-start justify-center w-full">
                       
            <motion.div
              className="text-center px-4 pt-5"
              initial={{ opacity: 0, y: 30 }}
              animate={bottomContentControls}
            >
              <p className="max-w-xl mx-auto text-gray-600 md:text-lg">
                Tired of unreliable freelancers or slow in-house teams? Skip the
                delays & Get a creative team that delivers, fast…
              </p>
                           
              <motion.div
                className="mt-2 flex flex-wrap items-center justify-center gap-4"
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
                  className="border w-52 sm:w-auto text-black px-5 sm:px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition text-sm sm:text-base cursor-pointer"
                >
                  See Plans
                </Link>
              </motion.div>
                           
              <motion.div
                className="mt-6 flex flex-wrap justify-center hidden md:flex gap-4 sm:gap-6 font-medium text-sm sm:text-base md:text-lg text-gray-800"
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
              <div className="flex justify-center items-center gap-y-2 text-gray-700 font-medium md:text-lg flex-wrap md:hidden">
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
                         
            </motion.div>
                     
          </div>
                 
        </motion.div>
               
        <div className="absolute inset-0">
          {/* This container constrains the content to 7xl and centers it */}
          <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-3 items-start pt-24 gap-4 px-4 lg:px-8 py-12">
            {' '}
            {/* Left Column for text content */}
            <motion.div
              style={{ opacity: secondScreenOpacity }}
              className="md:col-span-1" // <-- Add this class
            >
              <div className="space-y-2">
                <motion.h2
                  style={{
                    opacity: line1Opacity,
                    y: line1Y, // 👈 add this
                    lineHeight: '0.9',
                  }}
                  className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold tracking-tighter max-w-lg text-gray-900"
                >
                  See what our
                  <span className="font-instrument-italic font-light">
                    {' '}
                    Team Creates{' '}
                  </span>
                  for Brands Like Yours.
                </motion.h2>
                <motion.p
                  style={{
                    opacity: paragraphOpacity,
                    y: paragraphY, // 👈 add this
                  }}
                  className="text-sm sm:text-base md:text-xl text-gray-700 max-w-sm"
                >
                  Explore the creative world that turns your ordinary content
                  into extraordinary visuals.
                </motion.p>
              </div>
            </motion.div>
            {/* Right Column: An empty placeholder for the card animation area */}
            <div className="md:col-span-2" />
          </div>
        </div>
               
        {visibleCards.map((card, i) => (
          <CardWrapper
            key={card.id}
            card={card}
            index={i}
            controls={cardControls}
            isEntranceComplete={isEntranceComplete}
            isSpreadComplete={isSpreadComplete}
            scrollYProgress={scrollYProgress}
            config={config}
            windowWidth={windowWidth}
            isMobile={isMobile}
            isTablet={isTablet}
            isSmallDesktop={isSmallDesktop}
            cardStackTop={cardStackTop} // <-- Pass the new prop here
            showBadges={showBadges} // <-- ADD THIS
          />
        ))}
             
      </div>
         
    </div>
  )
}
